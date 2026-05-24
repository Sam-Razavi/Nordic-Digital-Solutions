"""Tests for Notification Service with SQLite storage."""

import os
import tempfile
import pytest
from unittest.mock import patch

os.environ["NOTIFICATION_SQLITE_DB"] = os.path.join(
    tempfile.mkdtemp(), "test_notification.db"
)

from fastapi.testclient import TestClient
from fastapi import FastAPI

import services.notification.db as db
from services.notification.routes import router
from services.notification.service import (
    get_subscribers,
    send_notification,
    subscribe,
    trigger_for_location,
)

_app = FastAPI()
_app.include_router(router)
client = TestClient(_app)

_OK_SMS = {"success": True, "channel": "sms", "detail": {}}
_OK_EMAIL = {"success": True, "channel": "email", "detail": {}}


@pytest.fixture(autouse=True)
def _fresh_db():
    """Re-create the SQLite tables before every test."""
    conn = db._connect()
    with conn:
        conn.execute("DELETE FROM sent_log")
        conn.execute("DELETE FROM subscriber_sites")
        conn.execute("DELETE FROM subscribers")
    conn.close()

def test_db_init_creates_tables():
    conn = db._connect()
    cur = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    )
    tables = [r["name"] for r in cur.fetchall()]
    conn.close()
    assert "subscribers" in tables
    assert "subscriber_sites" in tables
    assert "sent_log" in tables


@patch("services.notification.service.sms_provider")
def test_sms_provider_called(mock_sms):
    mock_sms.send.return_value = _OK_SMS
    result = send_notification("sms", "+46701234567", "Hej!")
    assert result["success"] is True
    mock_sms.send.assert_called_once()


@patch("services.notification.service.email_provider")
def test_email_provider_called(mock_email):
    mock_email.send.return_value = _OK_EMAIL
    result = send_notification("email", "test@example.com", "Hej!", subject="Test")
    assert result["success"] is True
    mock_email.send.assert_called_once()


@patch("services.notification.service.sms_provider")
@patch("services.notification.service.email_provider")
def test_subscribe_stores_in_sqlite(mock_email, mock_sms):
    mock_sms.send.return_value = _OK_SMS
    mock_email.send.return_value = _OK_EMAIL
    result = subscribe(
        "user_1",
        phone="+46701234567",
        email="test@example.com",
        sites=["site_1"],
    )

    assert result["success"] is True
    subs = get_subscribers()
    assert subs["user_1"]["phone"] == "+46701234567"
    assert subs["user_1"]["email"] == "test@example.com"
    assert subs["user_1"]["sites"] == ["site_1"]


@patch("services.notification.service.sms_provider")
@patch("services.notification.service.email_provider")
def test_trigger_for_location(mock_email, mock_sms):
    mock_sms.send.return_value = _OK_SMS
    mock_email.send.return_value = _OK_EMAIL
    subscribe("user_1", phone="+46701234567", email="test@example.com", sites=["site_1"])

    results = trigger_for_location("user_1", "site_1", "Drottningholm")

    assert len(results) == 2
    assert all(r["success"] for r in results)


@patch("services.notification.service.sms_provider")
@patch("services.notification.service.email_provider")
def test_subscribe_route(mock_email, mock_sms):
    mock_sms.send.return_value = _OK_SMS
    mock_email.send.return_value = _OK_EMAIL
    response = client.post(
        "/api/notification/subscribe",
        json={
            "user_id": "route_user",
            "phone": "+46701234567",
            "sites": ["site_1"],
        },
    )

    assert response.status_code == 200
    assert response.json()["success"] is True
