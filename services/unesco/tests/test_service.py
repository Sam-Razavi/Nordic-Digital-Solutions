# Tests for UNESCO data and map service.

from unittest.mock import MagicMock

import services.unesco.service as service_module
from services.unesco.service import chat_about_unesco, get_sites, get_sites_near

SAMPLE_SITES = [
    {
        "id_no": 1,
        "name_en": "Cultural Site",
        "short_description_en": "A test cultural site.",
        "category": "Cultural",
        "states_names": "Sweden",
        "coordinates": {"lat": 60.49, "lon": 15.44},
    },
    {
        "id_no": 2,
        "name_en": "Far Natural Site",
        "short_description_en": "A test natural site.",
        "category": "Natural",
        "states_names": "Sweden",
        "coordinates": {"lat": 59.33, "lon": 18.07},
    },
]


def _mock_unesco_response(mocker, sites=None):
    response = MagicMock()
    response.json.return_value = {"results": sites or SAMPLE_SITES}
    response.raise_for_status.return_value = None
    return mocker.patch("services.unesco.service.requests.get", return_value=response)


def _reset_site_cache():
    service_module._sites_cache["data"] = []
    service_module._sites_cache["fetched_at"] = 0


def test_get_sites_returns_list(mocker):
    _mock_unesco_response(mocker)

    sites = get_sites(limit=5)

    assert isinstance(sites, list)
    assert len(sites) > 0


def test_get_sites_has_required_fields(mocker):
    _mock_unesco_response(mocker)

    sites = get_sites(limit=1)
    site = sites[0]

    assert "name_en" in site
    assert "coordinates" in site


def test_get_sites_near_returns_list(mocker):
    _reset_site_cache()
    mocker.patch("services.unesco.service.get_sites", return_value=SAMPLE_SITES)

    sites = get_sites_near()

    assert isinstance(sites, list)


def test_get_sites_near_sorted_by_distance(mocker):
    _reset_site_cache()
    mocker.patch("services.unesco.service.get_sites", return_value=SAMPLE_SITES)

    sites = get_sites_near()
    distances = [s["distance_km"] for s in sites]

    assert distances == sorted(distances)


def test_chat_returns_string(mocker, monkeypatch):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    mock_response = MagicMock()
    mock_response.content = [
        MagicMock(text="Gammelstaden ar ett medeltida stadscentrum.")
    ]
    mocker.patch(
        "services.unesco.service.anthropic.Anthropic"
    ).return_value.messages.create.return_value = mock_response

    result = chat_about_unesco("Beratta om Gammelstaden", [])

    assert isinstance(result, str)
    assert len(result) > 0


def test_chat_system_prompt_restricts_off_topic(mocker, monkeypatch):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    captured = {}

    def fake_create(**kwargs):
        captured["system"] = kwargs.get("system", [])
        mock_response = MagicMock()
        mock_response.content = [
            MagicMock(text="Jag kan bara hjalpa till med fragor om UNESCO:s varldsarv.")
        ]
        return mock_response

    mocker.patch(
        "services.unesco.service.anthropic.Anthropic"
    ).return_value.messages.create.side_effect = fake_create

    chat_about_unesco("En fraga utanfor UNESCO", [])

    system_text = " ".join(block["text"] for block in captured["system"])
    assert "endast" in system_text.lower() or "bara" in system_text.lower()


def test_chat_returns_fallback_without_anthropic_key(monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)

    result = chat_about_unesco("Beratta om UNESCO", [])

    assert "ANTHROPIC_API_KEY" in result


# Records as the UNESCO API returns them today: "coordinates" is GeoJSON
# ([lon, lat] pairs) and the centre point is in "geo_point_2d".
API_RECORDS = [
    {
        "id_no": "569",
        "name_en": "Historic Centres of Berat and Gjirokastra",
        "coordinates": {
            "type": "Feature",
            "geometry": {
                "coordinates": [[20.1408333333, 40.0741666667], [19.9469444444, 40.7022222222]],
                "type": "MultiPoint",
            },
            "properties": {},
        },
        "geo_point_2d": {"lon": 20.0439, "lat": 40.3882},
    },
    {
        "id_no": "211",
        "name_en": "Minaret and Archaeological Remains of Jam",
        "coordinates": {
            "type": "Feature",
            "geometry": {"coordinates": [[64.5158888889, 34.3964166667]], "type": "MultiPoint"},
            "properties": {},
        },
    },
    {"id_no": "1", "name_en": "Legacy format", "coordinates": {"lat": 60.49, "lon": 15.44}},
    {"id_no": "2", "name_en": "No position"},
    {"id_no": "3", "name_en": "Broken position", "coordinates": {"type": "Feature", "geometry": None}},
]


def test_get_sites_normalises_coordinates_to_lat_lon(mocker):
    _mock_unesco_response(mocker, sites=[dict(r) for r in API_RECORDS])

    sites = {s["id_no"]: s for s in get_sites()}

    # geo_point_2d (the centre point) wins when present
    assert sites["569"]["coordinates"] == {"lat": 40.3882, "lon": 20.0439}
    # otherwise the first GeoJSON point, with [lon, lat] swapped into lat/lon
    assert sites["211"]["coordinates"] == {"lat": 34.3964166667, "lon": 64.5158888889}
    # the old {lat, lon} shape still works
    assert sites["1"]["coordinates"] == {"lat": 60.49, "lon": 15.44}
    assert sites["2"]["coordinates"] is None
    assert sites["3"]["coordinates"] is None
    assert all("geo_point_2d" not in s for s in sites.values())


def test_get_sites_requests_geo_point(mocker):
    get = _mock_unesco_response(mocker)

    get_sites(limit=1)

    assert "geo_point_2d" in get.call_args.kwargs["params"]["select"]


def test_get_sites_near_skips_sites_without_position(mocker):
    _reset_site_cache()
    _mock_unesco_response(mocker, sites=[dict(r) for r in API_RECORDS])

    # Berat (Albania) is ~40 km from this point; the rest are far away or unplaceable
    sites = get_sites_near(lat=40.39, lon=19.6, radius_km=100)

    assert [s["id_no"] for s in sites] == ["569"]
    assert sites[0]["coordinates"] == {"lat": 40.3882, "lon": 20.0439}
