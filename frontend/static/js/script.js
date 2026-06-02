const API_BASE =
   window.location.origin && window.location.origin !== "null"
      ? window.location.origin
      : "http://localhost:8000";

const PAGE_LANG = (
   new URLSearchParams(window.location.search).get("lang") ||
   document.documentElement.lang ||
   "sv"
).slice(0, 2).toLowerCase();

const DEFAULT_POSITION = { lat: 60.4858, lon: 15.4358 };
const SEARCH_RADIUS_KM = 150;

const UI_STRINGS = {
   sv: {
      adHint: "ANNONS: VÄRLDSARVSTJÄNSTEN",
      bannerTitle: "Upptäck historien nära dig",
      bannerDesc: "Utforska världsarv i realtid med vår interaktiva karta.",
      serviceTitle: "Världsarvstjänsten",
      serviceSubtitle: "Lokal information i realtid",
      discoverTitle: "Upptäck platsen",
      loadingNearby: "Hämtar världsarv nära dig...",
      noSitesFallback: `Inga världsarv hittades inom ${SEARCH_RADIUS_KM} km. Testar du utan platsdelning används Borlänge som standard.`,
      noSitesNearby: "Inga världsarv hittades i närheten.",
      nearby: "i närheten",
      kmAway: "km bort",
      unknownSite: "Okänt världsarv",
      youAreNear: "Du är nära",
      interactiveMap: "Interaktiv karta",
      mapPreparing: "Kartvy förbereds...",
      mapLoading: "Fullständig karta laddas...",
      mapLoadError: "Kartan kunde inte laddas.",
      yourPosition: "Din position",
      premiumMap: "Din Premium-karta",
      language: "Språk",
      originalEnglish: "Original (engelska)",
      noDescription: "Ingen beskrivning hittades i UNESCO-datat.",
      translating: "Översätter...",
      becomePremium: "Bli Premium-prenumerant",
      phoneLabel: "Mobilnummer",
      phonePlaceholder: "+46700000000",
      nameLabel: "Namn",
      namePlaceholder: "För- och efternamn",
      emailLabel: "E-post",
      emailPlaceholder: "namn@exempel.se",
      passwordLabel: "Lösenord",
      passwordPlaceholder: "Minst 8 tecken",
      paymentLabel: "Betalning",
      invoiceOption: "Faktura demo",
      cardOption: "Kort",
      confirmBankId: "Bekräfta med BankID",
      bankIdDevice: "BankID på den här enheten",
      bankIdMobile: "Mobilt BankID (QR-kod)",
      bankIdQrInstruction: "Öppna BankID-appen och skanna QR-koden",
      back: "← Tillbaka",
      activateSubscription: "Aktivera prenumeration",
      alreadyMember: "Redan medlem?",
      myPagesLogin: "Mina Sidor / Logga in",
      completeAccount: "Slutför ditt konto",
      completeAccountDesc: "Ditt konto är skapat. Välj inloggningsuppgifter för att komma åt Mina Sidor.",
      emailUsername: "E-postadress (användarnamn)",
      choosePassword: "Välj lösenord",
      confirmPasswordLabel: "Bekräfta lösenord",
      repeatPassword: "Upprepa lösenordet",
      saveAndContinue: "Spara och fortsätt",
      invoiceTitle: "Fakturauppgifter",
      invoiceSubtitle: "Fyll i dina faktureringsuppgifter",
      invoiceInfo: "En faktura kommer att skickas till din e-postadress. Betalning sker inom 30 dagar.",
      invoiceFullName: "Fullständigt namn *",
      invoiceFullNamePlaceholder: "För- och efternamn",
      invoiceAddress: "Gatuadress *",
      invoiceAddressPlaceholder: "Gatunamn och nummer",
      invoiceZip: "Postnummer *",
      invoiceZipPlaceholder: "123 45",
      invoiceCity: "Ort *",
      invoiceCityPlaceholder: "Stad",
      invoiceEmailLabel: "E-post för faktura *",
      invoiceRef: "Referens / märkning",
      invoiceRefOptional: "(valfritt)",
      invoiceRefPlaceholder: "T.ex. kostnadsställe eller namn",
      confirmActivate: "Bekräfta och aktivera prenumeration",
      myPages: "Mina Sidor",
      premiumMember: "Premium-medlem",
      logout: "Logga ut",
      deleteAccount: "Avsluta prenumeration och radera konto",
      deleteConfirm: "Är du säker? Din prenumeration avslutas och kontot raderas permanent.",
      deleteYes: "Ja, radera",
      cancelBtn: "Avbryt",
      loginTitle: "Logga in",
      loginBtn: "Logga in",
      or: "— eller —",
      loginBankId: "Logga in med BankID",
      twoFactorTitle: "Tvåfaktorskod",
      codeLabel: "Kod",
      verifyBtn: "Verifiera",
      twoFaTitle: "Tvåfaktorsautentisering",
      enable2fa: "Aktivera 2FA",
      disable2fa: "Inaktivera 2FA",
      twoFaStatusActive: "Status: Aktiv",
      twoFaStatusInactive: "Status: Inaktiv",
      scan2faInstructions: "Skanna med Google Authenticator eller liknande app:",
      confirm2faCode: "Bekräfta med kod från appen",
      activateBtn: "Aktivera",
      disable2faCode: "Kod från appen för att inaktivera",
      confirmDeactivate: "Bekräfta inaktivering",
      sitesNearby: "Världsarv i närheten",
      loadingSitesCard: "Hämtar närmaste världsarv...",
      visited: "Jag har besökt denna plats",
      aiGuideTitle: "AI-Guide (Premium)",
      chatWelcome: "Välkommen! Ställ en fråga om världsarven nära dig.",
      chatPlaceholder: "Ställ en fråga...",
      askBtn: "Fråga",
      chatYou: "Du",
      chatAI: "AI",
      chatLoading: "Laddar...",
      loadingPosition: "Hämtar din position...",
      loadingSites: "Hämtar världsarv från backend...",
      updatingSites: "Uppdaterar världsarv för din position...",
      locationDenied: "Platstillstånd nekades. Visar världsarv runt Borlänge (standardläge).",
      ready: "Redo.",
      loadError: "Kunde inte hämta världsarv just nu.",
      loggingIn: "Loggar in...",
      loggedIn: "Inloggad.",
      loggedOut: "Du är utloggad.",
      loggedInBankId: "Inloggad med BankID.",
      openingBankId: "Öppnar BankID...",
      preparingQr: "Förbereder QR-kod...",
      waitingBankId: "Väntar på BankID",
      bankIdTimeout: "BankID tog för lång tid. Försök igen.",
      bankIdFailed: "BankID misslyckades",
      unknownError: "okänt fel",
      creatingAccount: "Skapar konto...",
      activatingSubscription: "Aktiverar prenumeration...",
      emailRequired: "Ange e-post för att skapa konto.",
      passwordTooShort: "Lösenordet måste vara minst 8 tecken.",
      enterEmail: "Ange en e-postadress.",
      passwordMismatch: "Lösenorden matchar inte.",
      saving: "Sparar...",
      accountReady: "Konto klart! Du kan nu logga in på Mina Sidor.",
      processingInvoice: "Behandlar faktura...",
      accountDeleted: "Kontot har raderats.",
      subscriber: "Prenumerant",
      paymentSuccess: "Betalningen lyckades! Logga in för att aktivera din prenumeration.",
      paymentCancelled: "Betalningen avbröts. Försök igen om du vill.",
      markedVisited: "Platsen markerades som besökt.",
      twoFaEnabled: "2FA aktiverat!",
      twoFaDisabled: "2FA inaktiverat.",
      scan2faQr: "Skanna QR-koden och ange koden nedan.",
      enter2faCode: "Ange din tvåfaktorskod.",
      verifyingCode: "Verifierar kod...",
      closeWindow: "Stäng fönster",
      mainNav: "Huvudmeny",
   },
   en: {
      adHint: "AD: WORLD HERITAGE SERVICE",
      bannerTitle: "Discover history near you",
      bannerDesc: "Explore world heritage sites in real time with our interactive map.",
      serviceTitle: "World Heritage Service",
      serviceSubtitle: "Local information in real time",
      discoverTitle: "Discover the location",
      loadingNearby: "Loading nearby heritage sites...",
      noSitesFallback: `No heritage sites found within ${SEARCH_RADIUS_KM} km. Without location sharing, Borlänge is used as default.`,
      noSitesNearby: "No heritage sites found nearby.",
      nearby: "nearby",
      kmAway: "km away",
      unknownSite: "Unknown heritage site",
      youAreNear: "You are near",
      interactiveMap: "Interactive map",
      mapPreparing: "Preparing map view...",
      mapLoading: "Full map loading...",
      mapLoadError: "Map could not be loaded.",
      yourPosition: "Your position",
      premiumMap: "Your Premium map",
      language: "Language",
      originalEnglish: "Original (English)",
      noDescription: "No description found in UNESCO data.",
      translating: "Translating...",
      becomePremium: "Become a Premium subscriber",
      phoneLabel: "Phone number",
      phonePlaceholder: "+46700000000",
      nameLabel: "Name",
      namePlaceholder: "First and last name",
      emailLabel: "Email",
      emailPlaceholder: "name@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "At least 8 characters",
      paymentLabel: "Payment",
      invoiceOption: "Invoice demo",
      cardOption: "Card",
      confirmBankId: "Confirm with BankID",
      bankIdDevice: "BankID on this device",
      bankIdMobile: "Mobile BankID (QR code)",
      bankIdQrInstruction: "Open the BankID app and scan the QR code",
      back: "← Back",
      activateSubscription: "Activate subscription",
      alreadyMember: "Already a member?",
      myPagesLogin: "My Pages / Log in",
      completeAccount: "Complete your account",
      completeAccountDesc: "Your account has been created. Choose login credentials to access My Pages.",
      emailUsername: "Email address (username)",
      choosePassword: "Choose password",
      confirmPasswordLabel: "Confirm password",
      repeatPassword: "Repeat password",
      saveAndContinue: "Save and continue",
      invoiceTitle: "Invoice details",
      invoiceSubtitle: "Fill in your billing information",
      invoiceInfo: "An invoice will be sent to your email address. Payment within 30 days.",
      invoiceFullName: "Full name *",
      invoiceFullNamePlaceholder: "First and last name",
      invoiceAddress: "Street address *",
      invoiceAddressPlaceholder: "Street name and number",
      invoiceZip: "ZIP code *",
      invoiceZipPlaceholder: "123 45",
      invoiceCity: "City *",
      invoiceCityPlaceholder: "City",
      invoiceEmailLabel: "Invoice email *",
      invoiceRef: "Reference / marking",
      invoiceRefOptional: "(optional)",
      invoiceRefPlaceholder: "E.g. cost center or name",
      confirmActivate: "Confirm and activate subscription",
      myPages: "My Pages",
      premiumMember: "Premium member",
      logout: "Log out",
      deleteAccount: "Cancel subscription and delete account",
      deleteConfirm: "Are you sure? Your subscription will be cancelled and account permanently deleted.",
      deleteYes: "Yes, delete",
      cancelBtn: "Cancel",
      loginTitle: "Log in",
      loginBtn: "Log in",
      or: "— or —",
      loginBankId: "Log in with BankID",
      twoFactorTitle: "Two-factor code",
      codeLabel: "Code",
      verifyBtn: "Verify",
      twoFaTitle: "Two-factor authentication",
      enable2fa: "Enable 2FA",
      disable2fa: "Disable 2FA",
      twoFaStatusActive: "Status: Active",
      twoFaStatusInactive: "Status: Inactive",
      scan2faInstructions: "Scan with Google Authenticator or similar app:",
      confirm2faCode: "Confirm with code from app",
      activateBtn: "Activate",
      disable2faCode: "Code from app to disable",
      confirmDeactivate: "Confirm deactivation",
      sitesNearby: "Heritage sites nearby",
      loadingSitesCard: "Loading nearest heritage site...",
      visited: "I have visited this place",
      aiGuideTitle: "AI Guide (Premium)",
      chatWelcome: "Welcome! Ask a question about the heritage sites near you.",
      chatPlaceholder: "Ask a question...",
      askBtn: "Ask",
      chatYou: "You",
      chatAI: "AI",
      chatLoading: "Loading...",
      loadingPosition: "Fetching your location...",
      loadingSites: "Fetching heritage sites from backend...",
      updatingSites: "Updating heritage sites for your location...",
      locationDenied: "Location permission denied. Showing heritage sites around Borlänge (default).",
      ready: "Ready.",
      loadError: "Could not fetch heritage sites right now.",
      loggingIn: "Logging in...",
      loggedIn: "Logged in.",
      loggedOut: "You are logged out.",
      loggedInBankId: "Logged in with BankID.",
      openingBankId: "Opening BankID...",
      preparingQr: "Preparing QR code...",
      waitingBankId: "Waiting for BankID",
      bankIdTimeout: "BankID timed out. Please try again.",
      bankIdFailed: "BankID failed",
      unknownError: "unknown error",
      creatingAccount: "Creating account...",
      activatingSubscription: "Activating subscription...",
      emailRequired: "Please enter an email to create an account.",
      passwordTooShort: "Password must be at least 8 characters.",
      enterEmail: "Please enter an email address.",
      passwordMismatch: "Passwords do not match.",
      saving: "Saving...",
      accountReady: "Account ready! You can now log in to My Pages.",
      processingInvoice: "Processing invoice...",
      accountDeleted: "Account has been deleted.",
      subscriber: "Subscriber",
      paymentSuccess: "Payment successful! Log in to activate your subscription.",
      paymentCancelled: "Payment cancelled. Try again if you wish.",
      markedVisited: "Location marked as visited.",
      twoFaEnabled: "2FA enabled!",
      twoFaDisabled: "2FA disabled.",
      scan2faQr: "Scan the QR code and enter the code below.",
      enter2faCode: "Enter your two-factor code.",
      verifyingCode: "Verifying code...",
      closeWindow: "Close window",
      mainNav: "Main navigation",
   },
};

let t = UI_STRINGS.sv;

async function initLanguage() {
   if (UI_STRINGS[PAGE_LANG]) {
      t = UI_STRINGS[PAGE_LANG];
   } else {
      const cacheKey = `ui_strings_${PAGE_LANG}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
         try { t = JSON.parse(cached); } catch { t = UI_STRINGS.sv; }
      } else {
         try {
            const entries = Object.entries(UI_STRINGS.sv);
            const translated = {};
            const BATCH = 10;
            for (let i = 0; i < entries.length; i += BATCH) {
               await Promise.all(
                  entries.slice(i, i + BATCH).map(async ([key, text]) => {
                     try {
                        const res = await fetch(`${API_BASE}/translation/translate`, {
                           method: "POST",
                           headers: { "Content-Type": "application/json" },
                           body: JSON.stringify({ text, target_language: PAGE_LANG }),
                        });
                        const data = await res.json();
                        translated[key] = data.translated_text || text;
                     } catch {
                        translated[key] = text;
                     }
                  })
               );
            }
            localStorage.setItem(cacheKey, JSON.stringify(translated));
            t = translated;
         } catch {
            t = UI_STRINGS.sv;
         }
      }
   }
   applyUILanguage();
}

function applyUILanguage() {
   document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.textContent = t[key];
   });
   document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (t[key] !== undefined) el.placeholder = t[key];
   });
   document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (t[key] !== undefined) el.setAttribute("aria-label", t[key]);
   });
}

const visitorModal = document.getElementById("unescoModal");
const memberModal = document.getElementById("memberModal");
const invoiceModal = document.getElementById("invoiceModal");
const openBtn = document.getElementById("openAdBtn");
const closeAdBtn = document.getElementById("closeAdBtn");
const closeMemberBtn = document.getElementById("closeMemberBtn");
const toMemberLink = document.getElementById("toMemberView");
const bankidBtn = document.getElementById("bankidBtn");
const subscribeForm = document.getElementById("subscribeForm");
const widgetStatus = document.getElementById("widgetStatus");
const loginForm = document.getElementById("loginForm");
const twoFactorForm = document.getElementById("twoFactorForm");
const loginStatus = document.getElementById("loginStatus");
const siteList = document.getElementById("siteList");
const siteSummary = document.getElementById("siteSummary");
const siteDetail = document.getElementById("siteDetail");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const languageSelect = document.getElementById("languageSelect");
const memberSiteText = document.getElementById("memberSiteText");
const visitedCheck = document.getElementById("visitedCheck");

let lastFocusedElement;
let currentPosition = { ...DEFAULT_POSITION };
let sites = [];
let selectedSite = null;
let visitorMap = null;
let memberMap = null;
let tempToken = null;
let widgetLoaded = false;
let pendingEmail = null;
let geoWatchId = null;
let hasRealPosition = false;

function openModal(modal) {
   lastFocusedElement = document.activeElement;
   modal.style.display = "flex";
   document.body.style.overflow = "hidden";
   modal.querySelector(".close-modal").focus();
}

function closeModal(modal) {
   modal.style.display = "none";
   document.body.style.overflow = "auto";
   if (lastFocusedElement) lastFocusedElement.focus();
}

function setStatus(element, message, isError = false) {
   element.textContent = message;
   element.classList.toggle("is-error", isError);
}

function escapeHtml(value) {
   return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
}

async function apiFetch(path, options = {}) {
   const { headers: extraHeaders, ...restOptions } = options;
   const token = sessionStorage.getItem("auth_token");
   const response = await fetch(`${API_BASE}${path}`, {
      headers: {
         "Content-Type": "application/json",
         ...(token ? { "Authorization": `Bearer ${token}` } : {}),
         ...(extraHeaders || {}),
      },
      ...restOptions,
   });

   let payload = null;
   try {
      payload = await response.json();
   } catch {
      payload = {};
   }

   if (!response.ok) {
      const detail = payload.detail || payload.error || "Anropet misslyckades.";
      throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
   }

   return payload;
}

function getSiteId(site) {
   return String(site.id_no || site.id || site.name_en || "site");
}

function getCoordinates(site) {
   const coords = site.coordinates || {};
   if (typeof coords.lat === "number" && typeof coords.lon === "number") {
      return { lat: coords.lat, lon: coords.lon };
   }
   return null;
}

function requestPositionLive() {
   if (!navigator.geolocation) return;

   if (geoWatchId !== null) {
      navigator.geolocation.clearWatch(geoWatchId);
   }

   geoWatchId = navigator.geolocation.watchPosition(
      async (position) => {
         const newPos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
         };
         if (newPos.lat === currentPosition.lat && newPos.lon === currentPosition.lon) return;

         currentPosition = newPos;
         hasRealPosition = true;
         await refreshSites();
      },
      (err) => {
         if (err.code === err.PERMISSION_DENIED) {
            setStatus(widgetStatus, t.locationDenied);
         }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
   );
}

async function refreshSites() {
   try {
      setStatus(widgetStatus, t.updatingSites);
      sites = await apiFetch(
         `/unesco/sites?lat=${currentPosition.lat}&lon=${currentPosition.lon}&radius=${SEARCH_RADIUS_KM}`
      );
      renderSiteSummary();
      renderSites();
      renderMap("map-view", "visitor");
      if (memberMap) renderMap("member-map-view", "member");
      if (sites.length) selectSite(sites[0]);
      setStatus(widgetStatus, t.ready);
   } catch (error) {
      setStatus(widgetStatus, error.message, true);
   }
}

function resetMap(containerId) {
   const container = document.getElementById(containerId);
   container.classList.add("map-loaded");
   container.innerHTML = "";
}

function renderMap(containerId, mapRefName) {
   if (!window.L) {
      document.getElementById(containerId).textContent = t.mapLoadError;
      return null;
   }

   resetMap(containerId);
   const existingMap = mapRefName === "visitor" ? visitorMap : memberMap;
   if (existingMap) {
      existingMap.remove();
   }

   const map = L.map(containerId).setView([currentPosition.lat, currentPosition.lon], 8);
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
   }).addTo(map);

   L.marker([currentPosition.lat, currentPosition.lon])
      .addTo(map)
      .bindPopup(t.yourPosition);

   if (mapRefName !== "visitor") {
      sites.forEach((site) => {
         const coords = getCoordinates(site);
         if (!coords) return;
         L.marker([coords.lat, coords.lon])
            .addTo(map)
            .bindPopup(site.name_en || "UNESCO World Heritage Site")
            .on("click", () => selectSite(site));
      });
   }

   setTimeout(() => map.invalidateSize(), 100);
   if (mapRefName === "visitor") visitorMap = map;
   if (mapRefName === "member") memberMap = map;
   return map;
}

function renderSiteSummary() {
   if (!sites.length) {
      siteSummary.innerHTML = `
         <h3>${escapeHtml(t.discoverTitle)}</h3>
         <p>${escapeHtml(t.noSitesFallback)}</p>
      `;
      memberSiteText.textContent = t.noSitesNearby;
      return;
   }

   const nearest = sites[0];
   const distance = nearest.distance_km ? `${nearest.distance_km} ${t.kmAway}` : t.nearby;
   siteSummary.innerHTML = `
      <h3>${escapeHtml(t.discoverTitle)}</h3>
      <p>${escapeHtml(t.youAreNear)} <strong>${escapeHtml(nearest.name_en || t.unknownSite)}</strong>, ${escapeHtml(distance)}.</p>
   `;
   memberSiteText.innerHTML = `${escapeHtml(t.youAreNear)} <strong>${escapeHtml(nearest.name_en || t.unknownSite)}</strong>.`;
}

function renderSites() {
   siteList.innerHTML = "";
   sites.slice(0, 5).forEach((site) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "site-card";
      button.dataset.siteId = getSiteId(site);

      const title = document.createElement("strong");
      title.textContent = site.name_en || t.unknownSite;
      const meta = document.createElement("span");
      meta.className = "site-meta";
      meta.textContent = [
         site.category,
         site.states_names,
         site.distance_km ? `${site.distance_km} km` : null,
      ].filter(Boolean).join(" · ");

      button.append(title, meta);
      button.addEventListener("click", () => selectSite(site));
      siteList.appendChild(button);
   });
}

function selectSite(site) {
   selectedSite = site;
   languageSelect.value = PAGE_LANG;
   detailTitle.textContent = site.name_en || "UNESCO World Heritage Site";
   detailDescription.textContent =
      site.short_description_en || t.noDescription;
   siteDetail.hidden = false;

   document.querySelectorAll(".site-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.siteId === getSiteId(site));
   });

   translateSelectedSite();
}

async function loadLanguages() {
   try {
      const languages = await apiFetch("/translation/languages");
      const select = document.getElementById("languageSelect");
      select.innerHTML = `<option value="">${t.originalEnglish}</option>`;
      languages.forEach(lang => {
         const option = document.createElement("option");
         option.value = lang.code;
         option.textContent = lang.name || lang.code;
         if (lang.code === PAGE_LANG) option.selected = true;
         select.appendChild(option);
      });
   } catch {
      // om languages-anropet misslyckas behåller vi original-alternativet
   }
}

async function loadWidgetData() {
   setStatus(widgetStatus, t.loadingPosition);
   currentPosition = { ...DEFAULT_POSITION };
   await loadLanguages();
   await refreshSites();
   requestPositionLive();
}

async function ensureWidgetLoaded() {
   if (widgetLoaded) {
      setTimeout(() => visitorMap?.invalidateSize(), 100);
      requestPositionLive();
      return;
   }

   try {
      await loadWidgetData();
      widgetLoaded = true;
   } catch (error) {
      setStatus(widgetStatus, error.message, true);
      siteSummary.innerHTML = `<h3>${escapeHtml(t.discoverTitle)}</h3><p>${escapeHtml(t.loadError)}</p>`;
   }
}

async function translateSelectedSite() {
   if (!selectedSite || !languageSelect.value) {
      if (selectedSite) {
         detailDescription.textContent =
            selectedSite.short_description_en || t.noDescription;
      }
      return;
   }

   detailDescription.textContent = t.translating;
   try {
      const result = await apiFetch("/translation/translate", {
         method: "POST",
         body: JSON.stringify({
            text: selectedSite.short_description_en || selectedSite.name_en || "",
            target_language: languageSelect.value,
         }),
      });
      detailDescription.textContent = result.translated_text;
   } catch (error) {
      detailDescription.textContent = error.message;
   }
}

async function sendChatMessage() {
   const input = document.getElementById("chatInput");
   const output = document.getElementById("chatOutput");
   const message = input.value.trim();
   if (!message) return;

   output.innerHTML += `<br><strong>${escapeHtml(t.chatYou)}:</strong> ${escapeHtml(message)}<br><strong>${escapeHtml(t.chatAI)}:</strong> ${escapeHtml(t.chatLoading)}`;
   input.value = "";
   output.scrollTop = output.scrollHeight;

   const token = sessionStorage.getItem("auth_token");
   try {
      const result = await apiFetch("/unesco/chat", {
         method: "POST",
         headers: token ? { Authorization: `Bearer ${token}` } : {},
         body: JSON.stringify({
            message,
            lat: currentPosition.lat,
            lon: currentPosition.lon,
            radius: SEARCH_RADIUS_KM,
            page_lang: PAGE_LANG,
         }),
      });
      output.innerHTML = output.innerHTML.replace(escapeHtml(t.chatLoading), escapeHtml(result.answer));
   } catch (error) {
      output.innerHTML = output.innerHTML.replace(escapeHtml(t.chatLoading), escapeHtml(error.message));
   }
   output.scrollTop = output.scrollHeight;
}

let _isBankIdUser = false;
let _bankidInMemberModal = false;

function activatePremium(isBankId = false) {
   document.getElementById("memberSiteCard").hidden = false;
   document.getElementById("memberMapHeader").textContent = t.premiumMap;
   document.getElementById("chatbotContainer").hidden = false;
   document.getElementById("accountManagement").hidden = false;
   if (!isBankId) {
      document.getElementById("twoFaPanel").hidden = false;
      load2faStatus();
   }
   triggerNearbyNotification();
}

async function triggerNearbyNotification() {
   const token = sessionStorage.getItem("auth_token");
   if (!token || !sites.length) return;

   const nearest = sites[0];
   const siteId = getSiteId(nearest);
   const siteName = nearest.name_en || t.unknownSite;

   try {
      await apiFetch(
         `/api/notification/trigger?user_id=${encodeURIComponent(token)}&site_id=${encodeURIComponent(siteId)}&site_name=${encodeURIComponent(siteName)}`
      );
   } catch {
      // Cooldown, redan besökt, eller saknad prenumeration — tyst ignorera
   }
}

async function showLoggedIn(isBankId = false) {
   _isBankIdUser = isBankId;
   loginForm.hidden = true;
   twoFactorForm.hidden = true;
   setStatus(loginStatus, "");
   document.getElementById("memberBankidSection").hidden = true;
   document.getElementById("userInfoPanel").hidden = false;

   try {
      const user = await apiFetch("/auth/me");
      document.getElementById("userNameDisplay").textContent = user.full_name || user.email;
      document.getElementById("userEmailDisplay").textContent = user.full_name ? user.email : "";
   } catch { /* token may not be set yet, ignore */ }

   if (sessionStorage.getItem("has_subscription") === "true") {
      activatePremium(isBankId);
   }
}

async function showChatIfLoggedIn() {
   const token = sessionStorage.getItem("auth_token");
   if (!token) return;

   try {
      await syncSubscriptionStatus();
      const user = await apiFetch("/auth/me");
      document.getElementById("userInfoPanel").hidden = false;
      document.getElementById("userNameDisplay").textContent = user.full_name || user.email;
      document.getElementById("userEmailDisplay").textContent = user.full_name ? user.email : "";
      loginForm.hidden = true;
      document.getElementById("memberBankidSection").hidden = true;

      if (sessionStorage.getItem("has_subscription") === "true") {
         activatePremium();
         if (sites.length) renderMap("member-map-view", "member");
      }
   } catch {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("user_email");
   }
}

function logout() {
   sessionStorage.removeItem("auth_token");
   sessionStorage.removeItem("has_subscription");
   _isBankIdUser = false;
   _bankidInMemberModal = false;
   document.getElementById("userInfoPanel").hidden = true;
   document.getElementById("userNameDisplay").textContent = "";
   document.getElementById("userEmailDisplay").textContent = "";
   document.getElementById("chatbotContainer").hidden = true;
   document.getElementById("twoFaPanel").hidden = true;
   document.getElementById("twoFaSetupBox").hidden = true;
   document.getElementById("twoFaDisableBox").hidden = true;
   document.getElementById("twoFaQrCode").innerHTML = "";
   document.getElementById("memberBankidSection").hidden = false;
   document.getElementById("memberSiteCard").hidden = true;
   document.getElementById("memberBankidChoicePanel").style.display = "none";
   document.getElementById("memberBankidQrPanel").hidden = true;
   document.getElementById("memberBankidQrCode").innerHTML = "";
   document.getElementById("memberMapHeader").textContent = t.interactiveMap;
   document.getElementById("accountManagement").hidden = true;
   document.getElementById("deleteAccountConfirm").hidden = true;
   loginForm.hidden = false;
   loginForm.reset();
   twoFactorForm.hidden = true;
   setStatus(loginStatus, t.loggedOut);
}

async function load2faStatus() {
   const twoFaStatus = document.getElementById("twoFaStatus");
   try {
      const result = await apiFetch("/auth/2fa/status");
      const enabled = result.two_factor_enabled;
      document.getElementById("twoFaStatusText").textContent = enabled ? t.twoFaStatusActive : t.twoFaStatusInactive;
      const btn = document.getElementById("twoFaActionBtn");
      btn.textContent = enabled ? t.disable2fa : t.enable2fa;
      btn.dataset.enabled = String(enabled);
      document.getElementById("twoFaSetupBox").hidden = true;
      document.getElementById("twoFaDisableBox").hidden = true;
      setStatus(twoFaStatus, "");
   } catch {
      document.getElementById("twoFaStatusText").textContent = t.twoFaStatusInactive;
      const btn = document.getElementById("twoFaActionBtn");
      btn.textContent = t.enable2fa;
      btn.dataset.enabled = "false";
      setStatus(twoFaStatus, "");
   }
}

async function handle2faAction() {
   const btn = document.getElementById("twoFaActionBtn");
   const twoFaStatus = document.getElementById("twoFaStatus");

   if (btn.dataset.enabled === "true") {
      document.getElementById("twoFaDisableBox").hidden = false;
      document.getElementById("twoFaSetupBox").hidden = true;
      return;
   }

   try {
      const result = await apiFetch("/auth/2fa/setup", { method: "POST" });
      const qrEl = document.getElementById("twoFaQrCode");
      qrEl.innerHTML = "";
      new QRCode(qrEl, { text: result.provisioning_uri, width: 180, height: 180 });
      document.getElementById("twoFaSetupBox").hidden = false;
      document.getElementById("twoFaDisableBox").hidden = true;
      setStatus(twoFaStatus, t.scan2faQr);
   } catch (error) {
      setStatus(twoFaStatus, error.message, true);
   }
}

async function verify2faEnable() {
   const code = document.getElementById("twoFaCodeInput").value.trim();
   const twoFaStatus = document.getElementById("twoFaStatus");
   if (!code) return;
   try {
      await apiFetch("/auth/2fa/enable", { method: "POST", body: JSON.stringify({ code }) });
      document.getElementById("twoFaCodeInput").value = "";
      setStatus(twoFaStatus, t.twoFaEnabled);
      load2faStatus();
   } catch (error) {
      setStatus(twoFaStatus, error.message, true);
   }
}

async function verify2faDisable() {
   const code = document.getElementById("twoFaDisableCodeInput").value.trim();
   const twoFaStatus = document.getElementById("twoFaStatus");
   if (!code) return;
   try {
      await apiFetch("/auth/2fa/disable", { method: "POST", body: JSON.stringify({ code }) });
      document.getElementById("twoFaDisableCodeInput").value = "";
      setStatus(twoFaStatus, t.twoFaDisabled);
      load2faStatus();
   } catch (error) {
      setStatus(twoFaStatus, error.message, true);
   }
}

async function generateBankIdQrData(qrStartToken, qrStartSecret, seconds) {
   const keyBytes = new Uint8Array(qrStartSecret.replace(/-/g, "").match(/.{2}/g).map(b => parseInt(b, 16)));
   const key = await crypto.subtle.importKey(
      "raw", keyBytes,
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
   );
   const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(String(seconds)));
   const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 8);
   return `bankid.${qrStartToken}.${seconds}.${hex}`;
}

let _bankidPollTimer = null;
let _bankidQrInterval = null;

function _stopBankId() {
   if (_bankidPollTimer) { clearTimeout(_bankidPollTimer); _bankidPollTimer = null; }
   if (_bankidQrInterval) { clearInterval(_bankidQrInterval); _bankidQrInterval = null; }
}

function _hideBankIdChoice() {
   document.getElementById("bankidChoicePanel").style.display = "none";
}

function _hideBankIdQr() {
   if (_bankidInMemberModal) {
      const panel = document.getElementById("memberBankidQrPanel");
      panel.hidden = true;
      document.getElementById("memberBankidQrCode").innerHTML = "";
   } else {
      const panel = document.getElementById("bankidQrPanel");
      panel.hidden = true;
      document.getElementById("bankidQrCode").innerHTML = "";
   }
   _stopBankId();
}

async function _onBankIdComplete(accessToken) {
   _stopBankId();
   _hideBankIdQr();
   if (accessToken) {
      sessionStorage.setItem("auth_token", accessToken);
      sessionStorage.setItem("has_subscription", "true");
   }
   if (_bankidInMemberModal) {
      setStatus(document.getElementById("memberBankidStatus"), "");
      document.getElementById("memberBankidBtn").disabled = false;
      showLoggedIn(true);
      if (sites.length) renderMap("member-map-view", "member");
   } else {
      setStatus(widgetStatus, t.loggedInBankId);
      bankidBtn.disabled = false;
      closeModal(visitorModal);
      openModal(memberModal);
      showLoggedIn(true);
      if (sites.length) renderMap("member-map-view", "member");
   }
}

function _pollBankIdStatus(orderRef) {
   const maxAttempts = 45;
   let attempts = 0;

   const poll = async () => {
      const statusEl = _bankidInMemberModal ? document.getElementById("memberBankidStatus") : widgetStatus;
      const activeBtn = _bankidInMemberModal ? document.getElementById("memberBankidBtn") : bankidBtn;

      if (attempts >= maxAttempts) {
         _stopBankId();
         _hideBankIdQr();
         setStatus(statusEl, t.bankIdTimeout, true);
         activeBtn.disabled = false;
         return;
      }
      attempts++;

      try {
         const status = await apiFetch(`/auth/bankid/status/${orderRef}`);

         if (status.status === "complete") {
            _onBankIdComplete(status.access_token);
         } else if (status.status === "failed") {
            _stopBankId();
            _hideBankIdQr();
            const reason = status.hintCode || status.errorCode || t.unknownError;
            setStatus(statusEl, `${t.bankIdFailed}: ${reason}`, true);
            activeBtn.disabled = false;
         } else {
            const hint = status.hintCode ? ` (${status.hintCode})` : "";
            setStatus(statusEl, `${t.waitingBankId}${hint}...`);
            _bankidPollTimer = setTimeout(poll, 2000);
         }
      } catch (error) {
         _stopBankId();
         _hideBankIdQr();
         setStatus(statusEl, error.message, true);
         activeBtn.disabled = false;
      }
   };

   _bankidPollTimer = setTimeout(poll, 2000);
}

function initiateBankId() {
   document.getElementById("bankidChoicePanel").style.display = "flex";
}

async function startBankIdDevice() {
   _bankidInMemberModal = false;
   _hideBankIdChoice();
   setStatus(widgetStatus, t.openingBankId);
   bankidBtn.disabled = true;

   try {
      const initiated = await apiFetch("/auth/bankid/initiate", { method: "POST" });
      const link = document.createElement("a");
      link.href = `bankid:///autostarttoken=${initiated.autoStartToken}&redirect=null`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      _pollBankIdStatus(initiated.orderRef);
   } catch (error) {
      setStatus(widgetStatus, error.message, true);
      bankidBtn.disabled = false;
   }
}

async function startBankIdMobile() {
   _bankidInMemberModal = false;
   _hideBankIdChoice();
   setStatus(widgetStatus, t.preparingQr);
   bankidBtn.disabled = true;

   try {
      const initiated = await apiFetch("/auth/bankid/initiate", { method: "POST" });
      const { orderRef } = initiated;

      const qrPanel = document.getElementById("bankidQrPanel");
      const qrEl = document.getElementById("bankidQrCode");
      qrEl.innerHTML = "";
      qrPanel.hidden = false;

      let qrInstance = null;

      const updateQr = async () => {
         try {
            const result = await apiFetch(`/auth/bankid/qr/${orderRef}`);
            const qrData = result.qr_data;
            if (qrInstance) {
               qrInstance.clear();
               qrInstance.makeCode(qrData);
            } else {
               qrInstance = new QRCode(qrEl, { text: qrData, width: 250, height: 250, correctLevel: QRCode.CorrectLevel.L });
            }
         } catch { /* ignore transient errors during QR refresh */ }
      };

      await updateQr();
      _bankidQrInterval = setInterval(updateQr, 1000);
      _pollBankIdStatus(orderRef);
   } catch (error) {
      setStatus(widgetStatus, error.message, true);
      bankidBtn.disabled = false;
   }
}

function initiateMemberBankId() {
   document.getElementById("memberBankidChoicePanel").style.display = "flex";
}

function _hideMemberBankidChoice() {
   document.getElementById("memberBankidChoicePanel").style.display = "none";
}

async function startMemberBankIdDevice() {
   _bankidInMemberModal = true;
   _hideMemberBankidChoice();
   const statusEl = document.getElementById("memberBankidStatus");
   const btn = document.getElementById("memberBankidBtn");
   setStatus(statusEl, t.openingBankId);
   btn.disabled = true;

   try {
      const initiated = await apiFetch("/auth/bankid/initiate", { method: "POST" });
      const link = document.createElement("a");
      link.href = `bankid:///autostarttoken=${initiated.autoStartToken}&redirect=null`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      _pollBankIdStatus(initiated.orderRef);
   } catch (error) {
      setStatus(statusEl, error.message, true);
      btn.disabled = false;
   }
}

async function startMemberBankIdMobile() {
   _bankidInMemberModal = true;
   _hideMemberBankidChoice();
   const statusEl = document.getElementById("memberBankidStatus");
   const btn = document.getElementById("memberBankidBtn");
   setStatus(statusEl, t.preparingQr);
   btn.disabled = true;

   try {
      const initiated = await apiFetch("/auth/bankid/initiate", { method: "POST" });
      const { orderRef } = initiated;

      const qrPanel = document.getElementById("memberBankidQrPanel");
      const qrEl = document.getElementById("memberBankidQrCode");
      qrEl.innerHTML = "";
      qrPanel.hidden = false;

      let qrInstance = null;

      const updateQr = async () => {
         try {
            const result = await apiFetch(`/auth/bankid/qr/${orderRef}`);
            const qrData = result.qr_data;
            if (qrInstance) {
               qrInstance.clear();
               qrInstance.makeCode(qrData);
            } else {
               qrInstance = new QRCode(qrEl, { text: qrData, width: 250, height: 250, correctLevel: QRCode.CorrectLevel.L });
            }
         } catch { /* ignore transient errors during QR refresh */ }
      };

      await updateQr();
      _bankidQrInterval = setInterval(updateQr, 1000);
      _pollBankIdStatus(orderRef);
   } catch (error) {
      setStatus(statusEl, error.message, true);
      btn.disabled = false;
   }
}

async function subscribe(event) {
   event.preventDefault();
   const phone = document.getElementById("phoneInput").value.trim();
   const name = document.getElementById("nameInput").value.trim();
   const email = document.getElementById("emailInput").value.trim();
   const password = document.getElementById("passwordInput").value;
   const method = document.getElementById("paymentMethod").value;
   const siteId = selectedSite ? getSiteId(selectedSite) : "unknown_site";

   let userId = sessionStorage.getItem("auth_token");

   if (!userId) {
      if (!email) {
         setStatus(widgetStatus, t.emailRequired, true);
         return;
      }
      if (!password || password.length < 8) {
         setStatus(widgetStatus, t.passwordTooShort, true);
         return;
      }

      setStatus(widgetStatus, t.creatingAccount);
      try {
         await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, password, full_name: name || null }),
         });
      } catch (error) {
         setStatus(widgetStatus, error.message, true);
         return;
      }

      setStatus(widgetStatus, t.loggingIn);
      try {
         const loginResult = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
         });
         sessionStorage.setItem("auth_token", loginResult.access_token);
         userId = loginResult.access_token;
      } catch (error) {
         setStatus(widgetStatus, error.message, true);
         return;
      }
   }

   setStatus(widgetStatus, t.activatingSubscription);
   try {
      await apiFetch("/api/notification/subscribe", {
         method: "POST",
         body: JSON.stringify({
            user_id: userId,
            phone: phone || null,
            email: email || null,
            sites: [siteId],
         }),
      });

      const payment = await apiFetch("/payment/create", {
         method: "POST",
         body: JSON.stringify({ user_id: userId, plan_id: "plan_basic", method, origin: window.location.origin }),
      });

      if (method === "card" && payment.url) {
         const currentToken = sessionStorage.getItem("auth_token");
         if (currentToken) {
            localStorage.setItem("stripe_pending_token", currentToken);
            localStorage.setItem("stripe_pending_email", email || sessionStorage.getItem("user_email") || "");
         }
         window.location.href = payment.url;
         return;
      }

      if (method === "invoice") {
         document.getElementById("invoiceFullName").value = name || "";
         document.getElementById("invoiceEmail").value = email || "";
         closeModal(visitorModal);
         openModal(invoiceModal);
         return;
      }

      await _completeSubscription(email);
   } catch (error) {
      setStatus(widgetStatus, error.message, true);
   }
}

async function _completeSubscription(email) {
   await apiFetch("/auth/subscription/activate", { method: "POST" });
   sessionStorage.setItem("has_subscription", "true");
   if (email) sessionStorage.setItem("user_email", email);
   closeModal(visitorModal);
   closeModal(invoiceModal);
   openModal(memberModal);
   await showLoggedIn(false);
   if (sites.length) renderMap("member-map-view", "member");
}

async function syncSubscriptionStatus() {
   try {
      const user = await apiFetch("/auth/me");
      if (user.has_subscription) {
         sessionStorage.setItem("has_subscription", "true");
      } else {
         sessionStorage.removeItem("has_subscription");
      }
   } catch { /* ignorera fel */ }
}

async function login(event) {
   event.preventDefault();
   setStatus(loginStatus, t.loggingIn);

   try {
      const result = await apiFetch("/auth/login", {
         method: "POST",
         body: JSON.stringify({
            email: document.getElementById("loginEmail").value.trim(),
            password: document.getElementById("loginPassword").value,
         }),
      });

      if (result.requires_2fa) {
         tempToken = result.temp_token;
         twoFactorForm.hidden = false;
         setStatus(loginStatus, t.enter2faCode);
         return;
      }

      sessionStorage.setItem("auth_token", result.access_token);
      sessionStorage.setItem("user_email", document.getElementById("loginEmail").value.trim());

      if (sessionStorage.getItem("pending_activation") === "true") {
         await apiFetch("/auth/subscription/activate", { method: "POST" }).catch(() => {});
         sessionStorage.removeItem("pending_activation");
      }

      await syncSubscriptionStatus();
      setStatus(loginStatus, t.loggedIn);
      await showLoggedIn();
      if (sites.length) renderMap("member-map-view", "member");
   } catch (error) {
      setStatus(loginStatus, error.message, true);
   }
}

async function completeTwoFactor(event) {
   event.preventDefault();
   setStatus(loginStatus, t.verifyingCode);

   try {
      const result = await apiFetch("/auth/login/2fa", {
         method: "POST",
         body: JSON.stringify({
            temp_token: tempToken,
            code: document.getElementById("twoFactorCode").value.trim(),
         }),
      });
      sessionStorage.setItem("auth_token", result.access_token);

      if (sessionStorage.getItem("pending_activation") === "true") {
         await apiFetch("/auth/subscription/activate", { method: "POST" }).catch(() => {});
         sessionStorage.removeItem("pending_activation");
      }

      await syncSubscriptionStatus();
      setStatus(loginStatus, t.loggedIn);
      await showLoggedIn();
      if (sites.length) renderMap("member-map-view", "member");
   } catch (error) {
      setStatus(loginStatus, error.message, true);
   }
}

async function markVisited() {
   if (!selectedSite || !visitedCheck.checked) return;

   try {
      await apiFetch("/api/notification/mark-visited", {
         method: "POST",
         body: JSON.stringify({
            user_id: sessionStorage.getItem("auth_token") || "guest",
            site_id: getSiteId(selectedSite),
         }),
      });
      setStatus(loginStatus, t.markedVisited);
   } catch (error) {
      if (error.message.includes("Prenumerant finns inte")) {
         visitedCheck.parentElement.hidden = true;
      } else {
         setStatus(loginStatus, error.message, true);
      }
   }
}

async function saveCredentials(event) {
   event.preventDefault();
   const statusEl = document.getElementById("setPasswordStatus");
   const email = pendingEmail || document.getElementById("setupEmail").value.trim();
   const password = document.getElementById("newPassword").value;
   const confirm = document.getElementById("confirmPassword").value;

   if (!email) {
      setStatus(statusEl, t.enterEmail, true);
      return;
   }
   if (password.length < 8) {
      setStatus(statusEl, t.passwordTooShort, true);
      return;
   }
   if (password !== confirm) {
      setStatus(statusEl, t.passwordMismatch, true);
      return;
   }

   setStatus(statusEl, t.saving);
   try {
      await apiFetch("/auth/register", {
         method: "POST",
         body: JSON.stringify({ email, password }),
      });
      setStatus(statusEl, t.accountReady);
      setTimeout(() => {
         visitorModal.style.display = "none";
         openModal(memberModal);
      }, 2000);
   } catch (error) {
      setStatus(statusEl, error.message, true);
   }
}

openBtn.addEventListener("click", () => {
   openModal(visitorModal);
   ensureWidgetLoaded();
});

closeAdBtn.addEventListener("click", () => closeModal(visitorModal));
closeMemberBtn.addEventListener("click", () => closeModal(memberModal));

toMemberLink.addEventListener("click", (event) => {
   event.preventDefault();
   visitorModal.style.display = "none";
   openModal(memberModal);
   showChatIfLoggedIn();
   if (sites.length) {
      renderMap("member-map-view", "member");
   }
});

document.getElementById("backToVisitorBtn").addEventListener("click", () => {
   closeModal(memberModal);
   openModal(visitorModal);
   setTimeout(() => visitorMap?.invalidateSize(), 100);
});

bankidBtn.addEventListener("click", initiateBankId);
document.getElementById("bankidDeviceBtn").addEventListener("click", startBankIdDevice);
document.getElementById("bankidMobileBtn").addEventListener("click", startBankIdMobile);
document.getElementById("bankidQrCancelBtn").addEventListener("click", () => {
   _hideBankIdQr();
   bankidBtn.disabled = false;
   setStatus(widgetStatus, "");
   document.getElementById("bankidChoicePanel").style.display = "flex";
});
subscribeForm.addEventListener("submit", subscribe);
loginForm.addEventListener("submit", login);
document.getElementById("invoiceForm").addEventListener("submit", async (event) => {
   event.preventDefault();
   const btn = document.getElementById("invoiceSubmitBtn");
   const status = document.getElementById("invoiceStatus");
   btn.disabled = true;
   setStatus(status, t.processingInvoice);
   try {
      const email = document.getElementById("invoiceEmail").value.trim();
      await _completeSubscription(email);
   } catch (err) {
      setStatus(status, err.message, true);
      btn.disabled = false;
   }
});
twoFactorForm.addEventListener("submit", completeTwoFactor);
languageSelect.addEventListener("change", translateSelectedSite);
visitedCheck.addEventListener("change", markVisited);
document.getElementById("sendChat").addEventListener("click", sendChatMessage);
document.getElementById("chatInput").addEventListener("keydown", (event) => {
   if (event.key === "Enter") sendChatMessage();
});
document.getElementById("backToVisitorBtn").addEventListener("click", () => {
   closeModal(memberModal);
   openModal(visitorModal);
});
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("deleteAccountBtn").addEventListener("click", () => {
   document.getElementById("deleteAccountConfirm").hidden = false;
});
document.getElementById("confirmDeleteNo").addEventListener("click", () => {
   document.getElementById("deleteAccountConfirm").hidden = true;
});
document.getElementById("confirmDeleteYes").addEventListener("click", async () => {
   try {
      document.getElementById("deleteAccountConfirm").hidden = true;
      await apiFetch("/auth/account", { method: "DELETE" });
      logout();
      closeModal(memberModal);
      openModal(visitorModal);
      setStatus(widgetStatus, t.accountDeleted);
   } catch (error) {
      setStatus(loginStatus, error.message, true);
   }
});
document.getElementById("twoFaActionBtn").addEventListener("click", handle2faAction);
document.getElementById("twoFaVerifyBtn").addEventListener("click", verify2faEnable);
document.getElementById("twoFaDisableVerifyBtn").addEventListener("click", verify2faDisable);
document.getElementById("memberBankidBtn").addEventListener("click", initiateMemberBankId);
document.getElementById("memberBankidDeviceBtn").addEventListener("click", startMemberBankIdDevice);
document.getElementById("memberBankidMobileBtn").addEventListener("click", startMemberBankIdMobile);
document.getElementById("memberBankidQrCancelBtn").addEventListener("click", () => {
   _hideBankIdQr();
   document.getElementById("memberBankidBtn").disabled = false;
   setStatus(document.getElementById("memberBankidStatus"), "");
   document.getElementById("memberBankidChoicePanel").style.display = "flex";
});

let _mousedownOnOverlay = false;
window.addEventListener("mousedown", (event) => {
   _mousedownOnOverlay = event.target.classList.contains("modal-overlay");
});
window.addEventListener("click", (event) => {
   if (_mousedownOnOverlay && event.target.classList.contains("modal-overlay")) {
      closeModal(visitorModal);
      closeModal(memberModal);
   }
});

document.addEventListener("keydown", (event) => {
   if (event.key === "Escape") {
      closeModal(visitorModal);
      closeModal(memberModal);
   }
});

(async () => { await initLanguage(); })();

// Hantera återkomst från Stripe-betalning
(async () => {
   const params = new URLSearchParams(window.location.search);
   const payment = params.get("payment");
   if (!payment) return;

   history.replaceState({}, "", "/");

   if (payment === "success") {
      let token = sessionStorage.getItem("auth_token");
      if (!token) {
         const saved = localStorage.getItem("stripe_pending_token");
         if (saved && saved !== "null") {
            sessionStorage.setItem("auth_token", saved);
            token = saved;
         }
      }
      const savedEmail = localStorage.getItem("stripe_pending_email") || "";
      if (savedEmail) sessionStorage.setItem("user_email", savedEmail);
      localStorage.removeItem("stripe_pending_token");
      localStorage.removeItem("stripe_pending_email");

      if (token) {
         const activated = await apiFetch("/auth/subscription/activate", { method: "POST" }).catch(() => null);
         sessionStorage.setItem("has_subscription", "true");
         openModal(memberModal);

         if (activated) {
            await showLoggedIn();
         } else {
            loginForm.hidden = true;
            twoFactorForm.hidden = true;
            document.getElementById("memberBankidSection").hidden = true;
            document.getElementById("userInfoPanel").hidden = false;
            document.getElementById("userNameDisplay").textContent = savedEmail || t.subscriber;
            document.getElementById("userEmailDisplay").textContent = "";
            activatePremium();
         }

         await ensureWidgetLoaded();
         renderSiteSummary();
         if (sites.length) renderMap("member-map-view", "member");
      } else {
         sessionStorage.setItem("pending_activation", "true");
         await ensureWidgetLoaded();
         openModal(memberModal);
         setStatus(loginStatus, t.paymentSuccess);
      }
   } else if (payment === "cancelled") {
      await ensureWidgetLoaded();
      openModal(visitorModal);
      setStatus(widgetStatus, t.paymentCancelled);
   }
})();

// Hantera SMS-länk med ?id= parameter (öppnar specifikt världsarv)
(async () => {
   const params = new URLSearchParams(window.location.search);
   const targetSiteId = params.get("id");
   if (!targetSiteId) return;

   openModal(visitorModal);
   await ensureWidgetLoaded();

   let target = sites.find(
      (s) => String(s.id_no) === targetSiteId || String(s.id) === targetSiteId
   );

   if (!target) {
      try {
         const allSites = await apiFetch(`/unesco/sites?radius=50000`);
         target = allSites.find(
            (s) => String(s.id_no) === targetSiteId || String(s.id) === targetSiteId
         );
      } catch { /* ignorera */ }
   }

   if (target) {
      selectSite(target);

      const coords = getCoordinates(target);
      if (coords && visitorMap) {
         visitorMap.setView([coords.lat, coords.lon], 12);
         L.marker([coords.lat, coords.lon])
            .addTo(visitorMap)
            .bindPopup(target.name_en || "UNESCO World Heritage Site")
            .openPopup();
      }
   }
})();
