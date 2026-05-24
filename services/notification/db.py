"""
SQLite storage for notification subscribers and sent notifications.
"""

import os
import time
import sqlite3
import logging

from services.notification.config import SQLITE_DB_PATH

logger = logging.getLogger("notification")


def _connect():
    conn = sqlite3.connect(SQLITE_DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    """Create tables if they do not already exist."""
    conn = _connect()
    with conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS subscribers (
                user_id TEXT PRIMARY KEY,
                phone TEXT,
                email TEXT
            );
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS subscriber_sites (
                user_id TEXT NOT NULL,
                site_id TEXT NOT NULL,
                visited INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY (user_id, site_id),
                FOREIGN KEY (user_id) REFERENCES subscribers(user_id) ON DELETE CASCADE
            );
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS sent_log (
                user_id TEXT NOT NULL,
                site_id TEXT NOT NULL,
                channel TEXT NOT NULL,
                sent_at REAL NOT NULL,
                PRIMARY KEY (user_id, site_id, channel)
            );
        """)
    conn.close()
    logger.info("Notification SQLite database ready at %s", SQLITE_DB_PATH)


def get_last_sent(user_id, site_id, channel):
    """Return the latest sent timestamp, or 0."""
    conn = _connect()
    cur = conn.execute(
        "SELECT sent_at FROM sent_log WHERE user_id=? AND site_id=? AND channel=?",
        (user_id, site_id, channel),
    )
    row = cur.fetchone()
    conn.close()
    return row["sent_at"] if row else 0


def mark_sent(user_id, site_id, channel):
    """Record that a notification was sent."""
    conn = _connect()
    with conn:
        conn.execute(
            """
            INSERT INTO sent_log (user_id, site_id, channel, sent_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT (user_id, site_id, channel)
            DO UPDATE SET sent_at = excluded.sent_at
            """,
            (user_id, site_id, channel, time.time()),
        )
    conn.close()


def is_visited(user_id, site_id):
    """Return True when the user has marked the site as visited."""
    conn = _connect()
    cur = conn.execute(
        "SELECT visited FROM subscriber_sites WHERE user_id=? AND site_id=?",
        (user_id, site_id),
    )
    row = cur.fetchone()
    conn.close()
    return bool(row["visited"]) if row else False


def mark_visited(user_id, site_id):
    """Mark a subscribed site as visited. Returns True if updated."""
    conn = _connect()
    with conn:
        cur = conn.execute(
            "UPDATE subscriber_sites SET visited=1 WHERE user_id=? AND site_id=?",
            (user_id, site_id),
        )
        updated = cur.rowcount
    conn.close()
    return updated > 0


def add_subscriber(user_id, phone=None, email=None, sites=None):
    """Add or update a subscriber."""
    conn = _connect()
    with conn:
        cur = conn.execute("SELECT * FROM subscribers WHERE user_id=?", (user_id,))
        existing = cur.fetchone()

        if existing:
            if phone:
                conn.execute(
                    "UPDATE subscribers SET phone=? WHERE user_id=?",
                    (phone, user_id),
                )
            if email:
                conn.execute(
                    "UPDATE subscribers SET email=? WHERE user_id=?",
                    (email, user_id),
                )
        else:
            conn.execute(
                "INSERT INTO subscribers (user_id, phone, email) VALUES (?, ?, ?)",
                (user_id, phone, email),
            )

        if sites:
            for site_id in sites:
                conn.execute(
                    """
                    INSERT INTO subscriber_sites (user_id, site_id)
                    VALUES (?, ?)
                    ON CONFLICT (user_id, site_id) DO NOTHING
                    """,
                    (user_id, site_id),
                )

    sub = _get_subscriber(conn, user_id)
    conn.close()
    return sub


def remove_subscriber(user_id, sites=None):
    """Remove a subscriber or selected subscribed sites."""
    conn = _connect()
    with conn:
        if sites:
            for site_id in sites:
                conn.execute(
                    "DELETE FROM subscriber_sites WHERE user_id=? AND site_id=?",
                    (user_id, site_id),
                )
        else:
            conn.execute("DELETE FROM subscriber_sites WHERE user_id=?", (user_id,))
            conn.execute("DELETE FROM subscribers WHERE user_id=?", (user_id,))
    conn.close()


def get_subscriber(user_id):
    """Fetch one subscriber."""
    conn = _connect()
    sub = _get_subscriber(conn, user_id)
    conn.close()
    return sub


def get_all_subscribers():
    """Fetch all subscribers as a dict."""
    conn = _connect()
    result = {}
    cur = conn.execute("SELECT * FROM subscribers")
    rows = cur.fetchall()
    for row in rows:
        uid = row["user_id"]
        site_cur = conn.execute(
            "SELECT site_id FROM subscriber_sites WHERE user_id=?", (uid,)
        )
        sites = [r["site_id"] for r in site_cur.fetchall()]
        result[uid] = {"phone": row["phone"], "email": row["email"], "sites": sites}
    conn.close()
    return result


def subscriber_exists(user_id):
    conn = _connect()
    cur = conn.execute("SELECT 1 FROM subscribers WHERE user_id=?", (user_id,))
    row = cur.fetchone()
    conn.close()
    return row is not None


def _get_subscriber(conn, user_id):
    """Internal helper."""
    cur = conn.execute("SELECT * FROM subscribers WHERE user_id=?", (user_id,))
    row = cur.fetchone()
    if not row:
        return None
    site_cur = conn.execute(
        "SELECT site_id FROM subscriber_sites WHERE user_id=?", (user_id,)
    )
    sites = [r["site_id"] for r in site_cur.fetchall()]
    return {"phone": row["phone"], "email": row["email"], "sites": sites}
