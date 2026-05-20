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
