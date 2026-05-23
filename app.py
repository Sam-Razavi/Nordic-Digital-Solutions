from dotenv import load_dotenv

# Läser in variabler från .env innan vi importerar modulerna.
# Detta behövs eftersom vissa moduler, t.ex. notification, kräver miljövariabler direkt vid import.
load_dotenv()

import logging
import os

from fastapi import FastAPI

from core.config import settings
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles

# Sam: Autentisering / backend
from services.auth.router import router as auth_router

# Sonia: UNESCO-data & karttjänst
from services.unesco.routes import router as unesco_router

# Riyaaq: Notifikationer
from services.notification.routes import router as notification_router

# Nina: Översättning
from services.translation.routes import router as translation_router, v3beta1_router as translation_v3beta1_router

# Nina: Betalning
from services.payment.routes import router as payment_router


# Skapar huvudappen för hela backend.
# Alla moduler kopplas in här, men själva logiken ska ligga i respektive modul.
_logger = logging.getLogger("nordic.bankid")


def _validate_bankid_config() -> None:
    if settings.bankid_mock_mode:
        _logger.warning(
            "BankID running in MOCK mode (BANKID_MOCK_MODE=true). "
            "No real BankID app will be contacted; logins auto-complete."
        )
        return

    missing = []
    if not settings.bankid_cert_file or not os.path.exists(settings.bankid_cert_file):
        missing.append(f"BANKID_CERT_FILE ({settings.bankid_cert_file!r})")
    if not settings.bankid_ca_file or not os.path.exists(settings.bankid_ca_file):
        missing.append(f"BANKID_CA_FILE ({settings.bankid_ca_file!r})")

    if missing:
        _logger.error(
            "BankID is configured for real mode (BANKID_MOCK_MODE=false) but the "
            "following cert files are missing: %s. BankID logins will fail until "
            "the cert files are present.",
            ", ".join(missing),
        )
        return

    _logger.info(
        "BankID running in REAL mode against %s (cert=%s)",
        settings.bankid_base_url,
        settings.bankid_cert_file,
    )


_validate_bankid_config()

app = FastAPI(title="Nordic Digital Solutions")

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")


@app.get("/widget", response_class=HTMLResponse)
def widget():
    html_path = os.path.join("frontend", "templates", "index.html")
    with open(html_path, encoding="utf-8") as f:
        return f.read()


def get_cors_origins() -> list[str]:
    origins = os.getenv("CORS_ORIGINS", "*")
    if origins == "*":
        return ["*"]
    return [o.strip() for o in origins.split(",") if o.strip()]


_cors_origins = get_cors_origins()
_allow_credentials = _cors_origins != ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=_allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Enkel startsida för att snabbt se att backend kör.
@app.get("/", response_class=HTMLResponse)
def read_root():
    html_path = os.path.join("frontend", "templates", "index.html")
    with open(html_path, encoding="utf-8") as f:
        return f.read()


# Health-check för test, felsökning och enkel kontroll av servern.
@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)


@app.get("/.well-known/appspecific/com.chrome.devtools.json", include_in_schema=False)
def devtools_probe():
    return Response(status_code=204)


# Sam: Autentisering
# Prefix sätts här eftersom auth_router inte har eget prefix i sin router-fil.
# Endpoints blir t.ex. /auth/register, /auth/login och /auth/me.
app.include_router(auth_router, prefix="/auth", tags=["auth"])


# Sonia: UNESCO-data & karttjänst
# Prefix /unesco är redan satt i services/unesco/routes.py.
app.include_router(unesco_router)


# Riyaaq: Notifikationer
# Prefix /notification är redan satt i services/notification/routes.py.
app.include_router(notification_router)


# Nina: Översättning
# Prefix /translation är redan satt i services/translation/routes.py.
app.include_router(translation_router)

# Nina: Google Cloud Translation API v3beta1-kompatibel endpoint.
# Mountas utan prefix så att sökvägen blir /v3beta1/projects/{project_id}:translateText.
app.include_router(translation_v3beta1_router)


# Nina: Betalning
# Prefix /payment är redan satt i services/payment/routes.py.
app.include_router(payment_router)


# Vi använder inte Base.metadata.create_all(bind=engine) här.
# Anledning: databasen bör hanteras via migrationer eller separat setup,
# inte skapas automatiskt varje gång appen startar.
#
# Vi använder inte heller uvicorn.run(...) här.
# Starta istället backend med:
# python -m uvicorn app:app --reload
