<img width="104" height="90" alt="image" src="https://github.com/user-attachments/assets/9d8df629-4934-4d71-ade4-c5dfb32d80af" />

# Nordic Digital Solutions

> **Kursproject — Utveckling av digitala tjänster · Högskolan Dalarna**

A Swedish UNESCO World Heritage discovery platform delivered as an embeddable newspaper widget. Users find nearby heritage sites via geolocation, authenticate with email/password or Swedish BankID, subscribe for premium access, and unlock AI-powered chat, multi-language translation, and SMS/email notifications.

---

![CI](https://github.com/Sam-Razavi/Nordic-Digital-Solutions/actions/workflows/ci.yml/badge.svg)
![Python](https://img.shields.io/badge/python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## Table of Contents

- [About the Project](#about-the-project)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Team & Contributions](#team--contributions)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## About the Project

**Nordic Digital Solutions** presents as a Swedish newspaper widget called **DAGSTIDNINGEN**. Embedded on any web page, it surfaces UNESCO World Heritage sites within 150 km of the user's location on an interactive map. Authenticated premium members can:

- Chat with an AI guide (Anthropic Claude) about any listed site
- Translate site descriptions into 100+ languages
- Receive SMS and email notifications when they are near a site they have not yet visited

Authentication supports both classic email/password with optional TOTP two-factor authentication, and **Swedish BankID** — the national e-ID used by millions of Swedes.

The project was built as a five-person university assignment demonstrating a realistic, service-oriented full-stack architecture with real third-party integrations.

---

## Screenshots

> **To add screenshots:** run the app locally (`python -m uvicorn app:app --reload`), take screenshots of each view, and save them in `docs/screenshots/` with the filenames below. All placeholder paths will automatically become live images once the files exist.

---

### 1 — Newspaper Landing Page
<img width="2507" height="1173" alt="image" src="https://github.com/user-attachments/assets/411d3238-9b0a-4d0b-9642-e780f243c613" />

> *The DAGSTIDNINGEN newspaper widget as it appears embedded on a web page. A mock Swedish newspaper article fills the page; the UNESCO "WORLD HERITAGE SERVICE" banner ad in the article body is the entry point to the entire service.*

---

### 2 — UNESCO Site Discovery Map (Visitor View)
<img width="2491" height="1170" alt="image" src="https://github.com/user-attachments/assets/13896cc2-568b-42ba-a8a0-7dd465353a1c" />

> *After clicking the banner ad, the visitor modal opens showing an interactive Leaflet.js map with markers for all UNESCO World Heritage sites within 150 km of the user's current location. The distance and site count are shown in the summary card above the map.*

---

### 3 — Site List with Distances
<img width="802" height="459" alt="image" src="https://github.com/user-attachments/assets/6c6ac241-d1f2-479b-b791-4ca3be0ad05f" />


> *Below the map, a scrollable list of heritage sites sorted by distance from the user. Each row shows the site name, country, category (cultural/natural/mixed), and distance in kilometres. Clicking a row opens the site detail view.*

---

### 4 — Site Detail with Language Selector
<img width="772" height="438" alt="image" src="https://github.com/user-attachments/assets/828437a9-4a35-4154-87ef-3effc8d4fcb6" />

> *The detail panel for a selected UNESCO site. Shows the full site description in English by default. The language dropdown (powered by Google Cloud Translate, 100+ languages) lets visitors instantly translate the description into Swedish, Arabic, Japanese, or any other supported language.*

---

### 5 — Subscription & Registration Form
<img width="773" height="845" alt="image" src="https://github.com/user-attachments/assets/afdd772d-13d6-4482-82c4-46ea7c617a28" />

> *The premium sign-up form at the bottom of the visitor widget. Collects phone number (for SMS notifications), name, email, and password. The payment method selector offers "Faktura demo" (invoice mock) or "Kort" (Stripe card checkout). BankID is available as an alternative to password-based registration.*

---

### 6 — BankID Authentication — Method Selection
![BankID method selection](docs/screenshots/06-bankid-choice.png)
> *When the user clicks "Bekräfta med BankID", a choice panel appears: "BankID på den här enheten" opens the BankID app directly on the same device; "Mobilt BankID (QR-kod)" displays an animated QR code for scanning with a mobile device.*

---

### 7 — BankID Mobile QR Code Flow
<img width="776" height="271" alt="image" src="https://github.com/user-attachments/assets/6ebeb8f7-fe20-4fa8-9c83-e4a4df49a3e5" />

> *The animated QR code panel for mobile BankID. The code refreshes every second (HMAC-SHA256 animation per the BankID specification). The user opens the BankID app on their phone and scans the code to authenticate. Status polling happens automatically every 2 seconds in the background.*

---

### 8 — Invoice Payment Form (Fakturauppgifter)
<img width="817" height="1047" alt="image" src="https://github.com/user-attachments/assets/bef3db06-275f-47d4-9c31-de7858ced920" />

> *The invoice billing form modal. Collects full name, street address, postcode, city, email for the invoice, and an optional reference/cost-centre field. The invoice mock provider stores the submission in memory and immediately activates the subscription.*

---

### 9 — Member Login — "Mina Sidor"
<img width="530" height="1139" alt="image" src="https://github.com/user-attachments/assets/568c1cbe-67fd-4ec6-9ccb-6ce1611e14d2" />

> *The "Mina Sidor" (My Pages) modal for returning premium members. Supports email/password login and BankID login side by side. After a successful BankID login, the user is recognised by their Swedish personal number and the JWT token is issued automatically.*

---

### 10 — Two-Factor Authentication — Code Entry
<img width="789" height="901" alt="image" src="https://github.com/user-attachments/assets/997bb6ea-9560-4c0c-94b9-c33a3fb92471" />


> *The TOTP challenge screen that appears after a correct email/password login when 2FA is enabled. The user enters the 6-digit code from their authenticator app (Google Authenticator, Authy, etc.) to complete sign-in.*

---

### 11 — Two-Factor Authentication — Setup & QR Code
<img width="764" height="828" alt="image" src="https://github.com/user-attachments/assets/67d9d309-41d0-416c-8667-c6075718d1f9" />

> *The 2FA setup panel inside "Mina Sidor". Shows a QR code provisioning URI that the user scans with an authenticator app to link their account. After scanning, the user enters a code from the app to confirm and enable 2FA.*

---

### 12 — Premium Member Dashboard
<img width="510" height="1134" alt="image" src="https://github.com/user-attachments/assets/055ed702-0b5d-44c1-b24c-c82ba4a438c8" />

> *The logged-in premium member view. Shows the user's name, email, logout button, and the option to permanently delete the account and cancel the subscription. Below the user card, the nearest UNESCO site card appears with a "Jag har besökt denna plats" (I have visited this site) checkbox that suppresses future notifications for that site.*

---

### 13 — Premium Interactive Map
<img width="769" height="459" alt="image" src="https://github.com/user-attachments/assets/6fffb5f5-ba0c-4007-8521-b992d7774c0c" />

> *The full-size interactive Leaflet.js map available only to premium members. Compared to the visitor map, this view includes richer site data, member-specific overlays, and is tied to the user's stored home coordinates for personalised distance calculations.*

---

### 14 — AI Guide Chatbot (Premium)
<img width="773" height="481" alt="image" src="https://github.com/user-attachments/assets/7f5921a2-0740-4e9b-bad1-54893a52bc5e" />

> *The "AI-Guide (Premium)" chatbot panel powered by Anthropic Claude Haiku. Members can ask questions about any UNESCO World Heritage site shown on the map — history, significance, visiting tips, and more. The chatbot responds in the user's own language and politely declines questions unrelated to UNESCO heritage.*

---

### 15 — Account Deletion Confirmation
<img width="753" height="169" alt="image" src="https://github.com/user-attachments/assets/a2759485-7256-4d93-9249-f8d3f0adc3ae" />
<img width="769" height="388" alt="image" src="https://github.com/user-attachments/assets/080dc4a9-a0ce-42f0-9f3c-b1aa18377381" />


> *The inline confirmation prompt that appears when a member clicks "Avsluta prenumeration och radera konto" (Cancel subscription and delete account). Requires explicit confirmation before permanently deleting the user record and cancelling the subscription.*

---

## Features

### Authentication
- Email and password registration and login
- Swedish BankID e-ID (device and mobile QR-code flows)
- Time-based One-Time Password (TOTP) two-factor authentication
- JWT access tokens with configurable expiry
- User profile management (name, home address, coordinates)
- Account deletion

### Heritage Site Discovery
- Geolocation-based UNESCO World Heritage site lookup
- Haversine distance filtering (default 150 km radius)
- Interactive map with site markers (Leaflet.js)
- 1-hour server-side site cache

### Premium Features (requires subscription)
- AI chatbot powered by Anthropic Claude Haiku
- Multi-language site translation (100+ languages via Google Cloud Translate)
- Premium member dashboard ("Mina Sidor")

### Notifications
- SMS notifications via HelloSMS REST API
- Email notifications via SMTP2GO REST API
- Location-based trigger (auto-send when user is near a subscribed site)
- Anti-spam cooldowns: 30 days (SMS), 7 days (email)
- Subscribe / unsubscribe per site
- Mark site as visited (suppresses future notifications)
- GDPR-compliant Swedish message templates

### Payments
- Stripe card checkout (test mode)
- Invoice mock provider (in-memory)
- Subscription management (create, cancel, status)

### Developer Ergonomics
- Mock mode for BankID, notifications, payments — no real credentials needed for local development
- SQLite fallback for tests; PostgreSQL for production
- GitHub Actions CI (Python 3.12, pytest)
- Heroku / Railway deployment via `Procfile`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend framework** | FastAPI (Python 3.12) |
| **ASGI server** | Uvicorn |
| **ORM** | SQLAlchemy + Alembic migrations |
| **Database** | PostgreSQL (production), SQLite (tests) |
| **Authentication** | bcrypt, python-jose (JWT), pyotp (TOTP) |
| **Frontend** | Vanilla JavaScript, CSS Grid, Leaflet.js, qrcode.js |
| **AI** | Anthropic Claude Haiku (`claude-haiku-4-5-20251001`) |
| **Translation** | Google Cloud Translate v2 |
| **Payments** | Stripe (test mode) |
| **SMS** | HelloSMS REST API |
| **Email** | SMTP2GO REST API |
| **E-ID** | Swedish BankID (test environment) |
| **CI/CD** | GitHub Actions + Heroku/Railway |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Widget)                     │
│   index.html · style.css · script.js · Leaflet.js       │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / REST
┌──────────────────────────▼──────────────────────────────┐
│                   FastAPI  (app.py)                      │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐ │
│  │   auth/  │ │ unesco/  │ │notification│ │translation│ │
│  │  (Sam)   │ │ (Sonia)  │ │  (Riyaaq) │ │  (Nina)  │ │
│  └────┬─────┘ └────┬─────┘ └─────┬──────┘ └────┬─────┘ │
│       │            │             │              │       │
│       │        ┌───┴──────────────┴──────────────┘       │
│  ┌────┴─────┐  │                             ┌──────────┐ │
│  │ payment/ │  │   PostgreSQL / SQLite        │  core/  │ │
│  │  (Nina)  │  │   (SQLAlchemy + Alembic)     │ config  │ │
│  └──────────┘  └─────────────────────────────┴──────────┘ │
└─────────────────────────────────────────────────────────┘
         │           │          │           │
    BankID      UNESCO API  HelloSMS /   Stripe /
    (e-ID)      (open data) SMTP2GO     Google
                             (notif.)  Translate /
                                        Anthropic
```

Each of the five services is a self-contained module with its own `models.py`, `schemas.py`, `service.py`, `routes.py`, and `providers.py`. The shared `core/` package provides database sessions, Pydantic settings, and error helpers.

---

## Team & Contributions

| # | Name | Service / Role | Key Responsibilities | Commits |
|---|------|----------------|----------------------|---------|
| 1 | **Sam Sahbaei Razavi** | `services/auth/` · Backend lead | Email/password auth, JWT tokens, Swedish BankID integration (device + mobile QR), TOTP two-factor auth, user model and profile management, FastAPI app wiring (`app.py`) | 77 |
| 2 | **Riyaaq Ali** | `services/notification/` | SMS/email notification engine, HelloSMS & SMTP2GO provider integrations, anti-spam cooldown logic, subscriber management, location-based notification triggers, PostgreSQL notification tables | 55 |
| 3 | **Sonia Tolouifar** | `services/unesco/` | UNESCO Open Data API integration, Haversine distance filtering, 1-hour site cache, Anthropic Claude Haiku AI chatbot for premium users | 31 |
| 4 | **Nina Bentmosse** | `services/translation/` + `services/payment/` | Google Cloud Translate v2 (100+ languages, 3-tier OAuth fallback), Stripe card checkout, invoice mock provider, subscription management | 22 |
| 5 | **Amanda Bejeryd** | Frontend | Newspaper widget UI/UX, Swedish newspaper theme (DAGSTIDNINGEN), CSS Grid responsive layout, modal system, Leaflet.js map integration, JavaScript client-side logic | 10 |

---

## Getting Started

### Prerequisites

- Python 3.12+
- PostgreSQL (or use SQLite for local testing)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sam-Razavi/Nordic-Digital-Solutions.git
cd Nordic-Digital-Solutions

# 2. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables below)

# 5. Run database migrations
alembic upgrade head

# 6. Start the development server
python -m uvicorn app:app --reload
```

Open [http://localhost:8000](http://localhost:8000) in your browser — the newspaper widget loads immediately.

### Quick start with mock mode (no API keys required)

Set these values in `.env` to run without any real external credentials:

```env
BANKID_MOCK_MODE=true
NOTIFICATION_MOCK_MODE=true
NOTIFICATION_STORAGE_MOCK_MODE=true
# Leave STRIPE_SECRET_KEY, ANTHROPIC_API_KEY, GOOGLE_APPLICATION_CREDENTIALS empty
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values. Variables marked **required** must be set for that feature to work. All others fall back to mock/in-memory mode automatically.

### Database

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string, e.g. `postgresql://user:pass@localhost:5432/nordic` |

### JWT / Security

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SECRET_KEY` | Yes | — | Long random string used to sign JWT tokens |
| `ALGORITHM` | No | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `60` | JWT token lifetime in minutes |

### BankID (Swedish e-ID)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BANKID_MOCK_MODE` | No | `false` | Set `true` to skip real BankID and auto-complete all logins |
| `BANKID_BASE_URL` | No | `https://appapi2.test.bankid.com` | BankID API base URL |
| `BANKID_CERT_FILE` | Yes (real mode) | — | Path to `.pem` client certificate |
| `BANKID_CERT_PASSWORD` | Yes (real mode) | — | Certificate password |
| `BANKID_CA_FILE` | Yes (real mode) | — | Path to BankID CA certificate |
| `BANKID_END_USER_IP` | No | `127.0.0.1` | IP passed to BankID API (use real user IP in production) |

> Test certificates are available at [bankid.com/en/utvecklare](https://www.bankid.com/en/utvecklare).

### Payments (Stripe)

| Variable | Required | Description |
|----------|----------|-------------|
| `STRIPE_SECRET_KEY` | No | Stripe secret key. Must start with `sk_test_`. Leave empty to use invoice mock. |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key for client-side checkout |
| `PAYMENT_PROVIDER` | No | `stripe` or `invoice` (defaults to `invoice` if `STRIPE_SECRET_KEY` is missing) |

### Google Cloud Translate

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_APPLICATION_CREDENTIALS` | No | Path to service account JSON file |
| `GOOGLE_CLIENT_SECRET_FILE` | No | Path to OAuth client secret JSON (browser flow fallback) |

> Leave both empty to use the built-in mock translation provider.

### Anthropic AI (chatbot)

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | No | Anthropic API key for Claude Haiku. Leave empty to disable AI chat. |

### Notifications (SMS / Email)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NOTIFICATION_MOCK_MODE` | No | `true` | Set `false` to send real SMS/email |
| `HELLOSMS_API_URL` | No | `https://api.hellosms.se/v1/` | HelloSMS endpoint |
| `HELLOSMS_USERNAME` | No | — | HelloSMS account username |
| `HELLOSMS_PASSWORD` | No | — | HelloSMS account password |
| `SMTP2GO_API_URL` | No | `https://api.smtp2go.com/v3/` | SMTP2GO endpoint |
| `SMTP2GO_API_KEY` | No | — | SMTP2GO API key |
| `SMTP2GO_SENDER` | No | `noreply@nordicdigitalsolutions.se` | From address for outbound emails |
| `NOTIFICATION_ADMIN_TOKEN` | No | `changeme` | Bearer token for admin notification endpoints |
| `NOTIFICATION_COOLDOWN_SMS_HOURS` | No | `720` (30 days) | Minimum hours between SMS to the same user about the same site |
| `NOTIFICATION_COOLDOWN_EMAIL_HOURS` | No | `168` (7 days) | Minimum hours between email to the same user about the same site |
| `SEND_WELCOME_NOTIFICATIONS` | No | `false` | Set `true` to send a real welcome message on new subscriptions |
| `NOTIFICATION_STORAGE_MOCK_MODE` | No | `false` | Force in-memory notification storage (no DB required) |

### CORS

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CORS_ORIGINS` | No | `http://localhost:8000,http://127.0.0.1:8000` | Comma-separated list of allowed origins. Use `*` for open access (disables credentials). |

---

## API Reference

All endpoints are served by the FastAPI app. Interactive documentation is available at `/docs` (Swagger UI) and `/redoc` when the server is running.

### General

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Serves the newspaper widget (HTML) |
| `GET` | `/widget` | Alias for the widget |
| `GET` | `/health` | Health check — returns `{"status": "ok"}` |

### Auth (`/auth`) — Sam Sahbaei Razavi

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth/register` | — | Register with email and password |
| `POST` | `/auth/login` | — | Login with email and password; returns JWT or 2FA temp token |
| `POST` | `/auth/login/2fa` | temp token | Complete login with TOTP code |
| `GET` | `/auth/me` | JWT | Get current user profile |
| `PATCH` | `/auth/me/profile` | JWT | Update name, address, or coordinates |
| `DELETE` | `/auth/account` | JWT | Delete account permanently |
| `POST` | `/auth/subscription/activate` | JWT | Mark user as premium subscriber |
| `POST` | `/auth/2fa/setup` | JWT | Generate TOTP secret and provisioning QR URI |
| `POST` | `/auth/2fa/enable` | JWT | Enable 2FA by verifying a TOTP code |
| `POST` | `/auth/2fa/disable` | JWT | Disable 2FA by verifying a TOTP code |
| `GET` | `/auth/2fa/status` | JWT | Check whether 2FA is currently enabled |
| `POST` | `/auth/bankid/initiate` | — | Start a BankID auth session; returns `orderRef` and initial QR data |
| `GET` | `/auth/bankid/qr/{order_ref}` | — | Fetch the latest animated QR code data for polling |
| `GET` | `/auth/bankid/status/{order_ref}` | — | Poll BankID completion status; returns JWT on success |

### UNESCO & AI Chat (`/unesco`) — Sonia Tolouifar

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/unesco/sites` | — | List UNESCO World Heritage sites within `radius_km` of `lat`/`lon` |
| `POST` | `/unesco/chat` | JWT (premium) | Send a message to the Claude AI chatbot about UNESCO sites |

### Notifications (`/api/notification`) — Riyaaq Ali

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/notification/send` | Admin token | Manually send SMS or email to a subscriber |
| `GET` | `/api/notification/trigger` | — | Trigger location-based notifications for a user position |
| `POST` | `/api/notification/subscribe` | JWT | Subscribe to notifications for a specific site |
| `POST` | `/api/notification/unsubscribe` | JWT | Unsubscribe from a specific site |
| `POST` | `/api/notification/mark-visited` | JWT | Mark a site as visited (suppresses future notifications) |
| `GET` | `/api/notification/admin/list` | Admin token | List all subscribers (admin only) |

### Translation (`/translation`) — Nina Bentmosse

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/translation/languages` | — | List all supported languages (ISO-639-1 codes + display names) |
| `POST` | `/translation/translate` | — | Translate text into a target language |
| `POST` | `/v3beta1/projects/{project_id}:translateText` | — | Google Cloud Translate v3beta1-compatible endpoint |

### Payments (`/payment`) — Nina Bentmosse

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/payment/create` | JWT | Create a Stripe checkout session or invoice subscription |
| `POST` | `/payment/cancel` | JWT | Cancel the current subscription |
| `GET` | `/payment/subscription/{id}` | — | Get subscription status by ID |
| `GET` | `/payment/lyckades` | — | Stripe success redirect page (Swedish: "succeeded") |
| `GET` | `/payment/avbruten` | — | Stripe cancellation redirect page (Swedish: "cancelled") |

---

## Testing

Tests use **pytest** with a SQLite in-memory database and mock providers for BankID and notifications.

```bash
# Run all tests
pytest -q

# Run a specific service's tests
pytest services/auth/
pytest services/notification/
pytest services/translation/
pytest services/payment/
```

### CI

GitHub Actions runs the full test suite on every push and pull request to `main`. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for the pipeline configuration.

The CI pipeline:
- Uses Python 3.12 on Ubuntu
- Sets `BANKID_MOCK_MODE=true` and `NOTIFICATION_MOCK_MODE=true`
- Uses a SQLite test database (no PostgreSQL required)

---

## Deployment

### Heroku / Railway

The `Procfile` contains the production start command:

```
web: alembic upgrade head && uvicorn app:app --host 0.0.0.0 --port $PORT
```

This runs pending Alembic database migrations on every deploy before starting the server.

#### Steps

1. Create a new app on Heroku or Railway
2. Add a PostgreSQL add-on and copy the `DATABASE_URL`
3. Set all required environment variables in the platform dashboard
4. Push the repository — the `Procfile` handles the rest

#### Required production environment variables

```
DATABASE_URL          # PostgreSQL connection string
SECRET_KEY            # Long random string
BANKID_MOCK_MODE      # true unless you have real BankID test certs
ANTHROPIC_API_KEY     # Required for AI chat
STRIPE_SECRET_KEY     # Required for card payments
GOOGLE_APPLICATION_CREDENTIALS  # Required for translation
NOTIFICATION_MOCK_MODE           # false for real SMS/email
```

### Local Docker (optional)

> A `docker-compose.yml` is not included in this repository. To containerise the app, you would need to provide a PostgreSQL service and mount a `.env` file.

---

## License

This project was created for educational purposes at **Högskolan Dalarna** as part of the course *Utveckling av digitala tjänster*.

---

*Built with FastAPI, BankID, Stripe, Google Cloud Translate, Anthropic Claude, HelloSMS, and SMTP2GO.*
