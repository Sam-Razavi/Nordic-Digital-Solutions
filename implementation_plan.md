# Database Implementation Plan (Railway)

## The Problem
You currently have `alembic_version` and `users` because those are managed by the Auth service (which uses SQLAlchemy and Alembic migrations, relying on the `DATABASE_URL` Railway provides).

The missing tables belong to the Notification service:
- `subscribers`
- `subscriber_sites`
- `sent_log`

**Why are they missing on Railway?**
1. The Notification service uses its own connection variables (`NOTIFICATION_PG_HOST`, `NOTIFICATION_PG_PORT`, etc.) instead of the standard `DATABASE_URL` that Railway provides.
2. In `services/notification/config.py`, if you don't have HelloSMS or SMTP2GO credentials set up, it activates `NOTIFICATION_MOCK_MODE`.
3. When `NOTIFICATION_MOCK_MODE` is active, the database connection is entirely skipped, and subscriptions are saved in server memory (which resets every time Railway deploys or goes to sleep).

## Proposed Changes

To fix this so it works perfectly on Railway, we need to:
1. **Use `DATABASE_URL`**: Update the notification database logic to use the same connection string (`DATABASE_URL`) that the rest of the application uses.
2. **Decouple DB from Mock Mode**: Ensure that the database *always* connects to PostgreSQL if the URL is provided, even if you are using Mock Mode for sending SMS/emails. This ensures subscriptions are permanently saved even if you don't have real SMS credentials configured.
3. **Auto-creation**: Ensure the `init_db()` function runs successfully on Railway and auto-creates the tables.

### 1. Update `services/notification/config.py`
We will fetch `DATABASE_URL` to be used by the notification DB.
#### [MODIFY] [config.py](file:///C:/Users/Min%20Dator/OneDrive%20-%20IT-Högskolan%20Sverige%20AB/Documents/Dalarna/Utveckling%20av%20digitala%20tjänster/Project/Nordic-Digital-Solutions/services/notification/config.py)
Add `DATABASE_URL` parsing alongside the existing Postgres variables.

### 2. Update `services/notification/db.py`
We will change `_connect()` to use `DATABASE_URL` if it's available, and separate `_use_mock_storage` so it only activates if `DATABASE_URL` is entirely missing or the connection fails.

#### [MODIFY] [db.py](file:///C:/Users/Min%20Dator/OneDrive%20-%20IT-Högskolan%20Sverige%20AB/Documents/Dalarna/Utveckling%20av%20digitala%20tjänster/Project/Nordic-Digital-Solutions/services/notification/db.py)
Change the logic so that the database is always initialized when the server starts if there is a `DATABASE_URL`.

## What you need to do on Railway
Once we make these code changes and push them to Railway:
1. Railway already injects a `DATABASE_URL` environment variable automatically if you provisioned a PostgreSQL database.
2. When the app starts, it will see `DATABASE_URL`, connect to PostgreSQL, and run `CREATE TABLE IF NOT EXISTS` for the three missing notification tables.
3. Your subscribers will now be saved permanently in the database!

## User Review Required
Does this approach sound good? If you approve, I will write the code to fix `config.py` and `db.py` to seamlessly use the Railway database connection.
