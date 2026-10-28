# Ansvarig: Sonia Tolouifar
# Modul: UNESCO-data & Karttjänst
# Hämtar världsarvsdata från UNESCO API och hanterar kartfunktionalitet

import os
import time

import anthropic
import requests
from math import radians, sin, cos, sqrt, atan2

BASE_URL = "https://data.unesco.org/api/explore/v2.1/catalog/datasets/whc001/records"

BORLANGE_LAT = 60.4858
BORLANGE_LON = 15.4358
DEFAULT_RADIUS_KM = 150
CACHE_TTL_SECONDS = 3600

_sites_cache = {"data": [], "fetched_at": 0}


def get_sites(limit=100, offset=0):
    """Hämtar världsarvssajter från UNESCO API."""
    params = {
        "limit": limit,
        "offset": offset,
        "select": "name_en,short_description_en,category,states_names,region,coordinates,geo_point_2d,date_inscribed,main_image_url,id_no"
    }
    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    sites = response.json().get("results", [])
    for site in sites:
        site["coordinates"] = _to_lat_lon(site)
        site.pop("geo_point_2d", None)
    return sites


def _to_lat_lon(site):
    """Returnerar sajtens position som {"lat": ..., "lon": ...}, eller None.

    UNESCO-API:t ger "coordinates" som GeoJSON (en MultiPoint med [lon, lat]-par)
    och mittpunkten som "geo_point_2d" ({"lat", "lon"}). Resten av appen
    (karta, notiser) förväntar sig {"lat", "lon"}, så vi normaliserar här.
    """
    for value in (site.get("geo_point_2d"), site.get("coordinates")):
        if isinstance(value, dict) and _is_number(value.get("lat")) and _is_number(value.get("lon")):
            return {"lat": float(value["lat"]), "lon": float(value["lon"])}

    # Reserv: första punkten i GeoJSON-geometrin ([lon, lat]).
    coordinates = site.get("coordinates")
    geometry = coordinates.get("geometry") if isinstance(coordinates, dict) else None
    if not isinstance(geometry, dict):
        return None
    points = geometry.get("coordinates")
    if geometry.get("type") == "Point":
        points = [points]
    if not points or not isinstance(points, list):
        return None
    first = points[0]
    if isinstance(first, (list, tuple)) and len(first) >= 2 and _is_number(first[0]) and _is_number(first[1]):
        return {"lat": float(first[1]), "lon": float(first[0])}
    return None


def _is_number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _haversine_km(lat1, lon1, lat2, lon2):
    """Beräknar avstånd i km mellan två koordinater."""
    R = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return R * 2 * atan2(sqrt(a), sqrt(1 - a))


def _get_all_sites_cached():
    if time.time() - _sites_cache["fetched_at"] < CACHE_TTL_SECONDS:
        return _sites_cache["data"]

    sites = []
    offset = 0
    while True:
        batch = get_sites(limit=100, offset=offset)
        if not batch:
            break
        sites.extend(batch)
        offset += 100
        if len(batch) < 100:
            break

    _sites_cache["data"] = sites
    _sites_cache["fetched_at"] = time.time()
    return sites


def get_sites_near(lat=BORLANGE_LAT, lon=BORLANGE_LON, radius_km=DEFAULT_RADIUS_KM):
    """Returnerar världsarvssajter inom en given radie (km) från en koordinat."""
    all_sites = _get_all_sites_cached()

    nearby = []
    for site in all_sites:
        coords = site.get("coordinates")
        if not isinstance(coords, dict) or not _is_number(coords.get("lat")) or not _is_number(coords.get("lon")):
            continue
        dist = _haversine_km(lat, lon, coords["lat"], coords["lon"])
        if dist <= radius_km:
            site["distance_km"] = round(dist, 1)
            nearby.append(site)

    nearby.sort(key=lambda s: s["distance_km"])
    return nearby


def chat_about_unesco(message: str, sites: list, page_lang: str = "sv") -> str:
    """Svarar på frågor om världsarv med hjälp av Claude AI.

    Använder prompt caching för att slippa skicka platsdata varje gång.
    page_lang är sidans språkkod (t.ex. "sv", "en", "ar") och styr
    vilket språk AI:n svarar på tills användaren skriver på ett annat språk.
    """
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return (
            "AI-tjansten ar inte tillganglig. "
            "Kontakta administratoren for att konfigurera ANTHROPIC_API_KEY."
        )

    client = anthropic.Anthropic(api_key=api_key)

    sites_text = "\n".join(
        f"- {s.get('name_en', 'Okänt namn')} ({s.get('category', '?')}), "
        f"{s.get('states_names', '')}, "
        f"{round(s.get('distance_km', 0), 1)} km bort. "
        f"{s.get('short_description_en', '')}"
        for s in sites[:20]
    )

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system=[
            {
                "type": "text",
                "text": (
                    "Du är en hjälpsam guide om UNESCO:s världsarv. "
                    "Du svarar ENDAST på frågor som handlar om UNESCO, världsarv, kulturarv, naturarv eller specifika världsarvssajter. "
                    "Om användaren frågar om något annat ämne svarar du: "
                    "'Jag kan bara hjälpa till med frågor om UNESCO:s världsarv.' "
                    "Svara alltid på samma språk som användaren skriver på. "
                    "Håll svaren kortfattade och informativa."
                    "\n\nSVARA ALLTID på samma språk som användaren ställer sin fråga. "
                    "Om frågan är på svenska, svara på svenska. "
                    "Om frågan är på engelska, svara på engelska. "
                    "Detektera användarens språk från frågan och matcha det exakt."
                ),
                "cache_control": {"type": "ephemeral"},
            },
            {
                "type": "text",
                "text": f"Nearby World Heritage Sites:\n{sites_text}",
                "cache_control": {"type": "ephemeral"},
            },
        ],
        messages=[{"role": "user", "content": message}],
    )

    return response.content[0].text
