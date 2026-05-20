# Tests for UNESCO routes.

from fastapi import FastAPI
from fastapi.testclient import TestClient

from services.unesco.routes import router

_app = FastAPI()
_app.include_router(router)
client = TestClient(_app)

AUTH_HEADERS = {"Authorization": "Bearer test-token"}

SAMPLE_SITES = [
    {
        "id_no": 1,
        "name_en": "Cultural Site",
        "category": "Cultural",
        "states_names": "Sweden",
        "coordinates": {"lat": 59.3293, "lon": 18.0686},
        "distance_km": 20,
    },
    {
        "id_no": 2,
        "name_en": "Natural Site",
        "category": "Natural",
        "states_names": "Sweden",
        "coordinates": {"lat": 60.4858, "lon": 15.4358},
        "distance_km": 120,
    },
]


def _sites_for_radius(*, lat=60.4858, lon=15.4358, radius_km=150):
    return [site.copy() for site in SAMPLE_SITES if site["distance_km"] <= radius_km]


def test_sites_endpoint_returns_200(mocker):
    mocker.patch("services.unesco.routes.get_sites_near", side_effect=_sites_for_radius)

    response = client.get("/unesco/sites")

    assert response.status_code == 200


def test_sites_endpoint_returns_list(mocker):
    mocker.patch("services.unesco.routes.get_sites_near", side_effect=_sites_for_radius)

    response = client.get("/unesco/sites")
    data = response.json()

    assert isinstance(data, list)


def test_sites_radius_filter(mocker):
    mocker.patch("services.unesco.routes.get_sites_near", side_effect=_sites_for_radius)

    response_small = client.get("/unesco/sites?radius=50")
    response_large = client.get("/unesco/sites?radius=150")

    assert len(response_small.json()) <= len(response_large.json())


def test_sites_category_filter(mocker):
    mocker.patch("services.unesco.routes.get_sites_near", side_effect=_sites_for_radius)

    response = client.get("/unesco/sites?category=Cultural")
    data = response.json()

    assert all(s["category"] == "Cultural" for s in data)


def test_sites_category_filter_case_insensitive(mocker):
    mocker.patch("services.unesco.routes.get_sites_near", side_effect=_sites_for_radius)

    response = client.get("/unesco/sites?category=cultural")
    data = response.json()

    assert all(s["category"] == "Cultural" for s in data)


def test_sites_lat_lon_params(mocker):
    mocker.patch("services.unesco.routes.get_sites_near", side_effect=_sites_for_radius)

    response = client.get("/unesco/sites?lat=59.3293&lon=18.0686&radius=50")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_chat_endpoint_requires_login():
    response = client.post(
        "/unesco/chat",
        json={"message": "Tell me about Gammelstaden"},
    )

    assert response.status_code == 401


def test_chat_endpoint_returns_200(mocker):
    mocker.patch(
        "services.unesco.routes.chat_about_unesco",
        return_value="Gammelstaden is a well-preserved church town.",
    )

    response = client.post(
        "/unesco/chat",
        headers=AUTH_HEADERS,
        json={"message": "Tell me about Gammelstaden"},
    )

    assert response.status_code == 200


def test_chat_endpoint_returns_answer_field(mocker):
    mocker.patch(
        "services.unesco.routes.chat_about_unesco",
        return_value="Gammelstaden is a well-preserved church town.",
    )

    response = client.post(
        "/unesco/chat",
        headers=AUTH_HEADERS,
        json={"message": "Tell me about Gammelstaden"},
    )
    data = response.json()

    assert "answer" in data
    assert isinstance(data["answer"], str)


def test_chat_endpoint_with_custom_position(mocker):
    mocker.patch(
        "services.unesco.routes.chat_about_unesco",
        return_value="Drottningholm Palace is a World Heritage Site near Stockholm.",
    )

    response = client.post(
        "/unesco/chat",
        headers=AUTH_HEADERS,
        json={
            "message": "What is near me?",
            "lat": 59.3293,
            "lon": 18.0686,
            "radius": 100,
        },
    )

    assert response.status_code == 200
    assert response.json()["answer"] != ""


def test_chat_refuses_off_topic(mocker):
    mocker.patch(
        "services.unesco.routes.chat_about_unesco",
        return_value="I can only help with questions about UNESCO World Heritage Sites.",
    )

    response = client.post(
        "/unesco/chat",
        headers=AUTH_HEADERS,
        json={"message": "Who is the US president?"},
    )

    assert response.status_code == 200
    assert "world heritage" in response.json()["answer"].lower()
