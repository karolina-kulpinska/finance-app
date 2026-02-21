# 🔴 Konfiguracja Stripe Live Mode - Krok po kroku

## ⚠️ WAŻNE: Przed przejściem na Live mode
- Upewnij się, że masz **aktywne konto Stripe** (przeszedłeś przez weryfikację)
- Masz już utworzony **Product i Price** w trybie Live
- Masz skonfigurowany **webhook** w trybie Live

---

## 📋 Krok 1: Pobierz Live klucze ze Stripe Dashboard

### 1.1. Secret Key (API Key)
1. Wejdź na **https://dashboard.stripe.com**
2. **Upewnij się, że jesteś w trybie Live** (przełącznik u góry powinien być na "Live", nie "Test")
3. **Developers → API keys**
4. Skopiuj **Secret key** (zaczyna się od `sk_live_...`)
   - ⚠️ **UWAGA:** To jest klucz Live - nie udostępniaj go publicznie!

### 1.2. Webhook Secret
1. W Stripe Dashboard: **Developers → Webhooks**
2. Jeśli nie masz webhooka w trybie Live, utwórz nowy:
   - Kliknij **"Add endpoint"** lub **"Create destination"**
   - **URL:** `https://us-central1-myfinanceapp-e2a0c.cloudfunctions.net/stripeWebhook`
   - **Event:** wybierz `checkout.session.completed`
   - Zapisz
3. Wejdź w utworzony webhook
4. Kliknij **"Reveal"** przy **"Signing secret"**
5. Skopiuj Signing secret (zaczyna się od `whsec_...`)

### 1.3. Price ID (z Product)
1. W Stripe Dashboard: **Products**
2. Upewnij się, że jesteś w trybie **Live**
3. Jeśli nie masz produktu w Live, utwórz:
   - Kliknij **"Add product"**
   - **Name:** "Plan Pro"
   - **Pricing model:** Subscription
   - **Price:** np. 29 PLN/miesiąc
   - Zapisz
4. Wejdź w utworzony produkt → kliknij w cenę
5. Skopiuj **Price ID** (zaczyna się od `price_...`)

---

## 🔧 Krok 2: Zaktualizuj sekrety w Firebase Functions

### 2.1. Zaktualizuj STRIPE_SECRET_KEY

W terminalu (w folderze projektu):

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```

Gdy zapyta o wartość:
- **Wklej Live Secret key** (`sk_live_...`)
- Naciśnij Enter

**W PowerShell:** Po pytaniu wklej klucz (Ctrl+V), potem Enter - **nie** wpisuj klucza w tej samej linii co komenda.

### 2.2. Zaktualizuj STRIPE_WEBHOOK_SECRET

```bash
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

Gdy zapyta o wartość:
- **Wklej Live Signing secret** (`whsec_...`)
- Naciśnij Enter

---

## 📝 Krok 3: Zaktualizuj Price ID w functions/.env

1. Otwórz plik `functions/.env`
2. Zmień wartość `STRIPE_PRICE_ID` na **Live Price ID**:

```
STRIPE_PRICE_ID=price_TWOJ_LIVE_PRICE_ID
```

Zamień `price_TWOJ_LIVE_PRICE_ID` na prawdziwy Live Price ID ze Stripe.

**Przykład:**
```
STRIPE_PRICE_ID=price_1ABC123xyz456LIVE
```

---

## 🚀 Krok 4: Zdeployuj funkcje

W terminalu (w folderze projektu):

```bash
firebase deploy --only functions
```

Poczekaj, aż wdrożenie się zakończy (może zająć 2-5 minut).

---

## ✅ Krok 5: Sprawdź czy działa

1. Uruchom aplikację: `npm start`
2. Zaloguj się
3. Przejdź do **Profil → Subskrypcja**
4. Kliknij **"Ulepsz teraz"**
5. Powinieneś trafić na **Stripe Checkout w trybie Live**
6. ⚠️ **UWAGA:** W trybie Live użyj prawdziwej karty - będą prawdziwe płatności!

---

## 🔍 Jak sprawdzić czy używasz Live czy Test?

### W Stripe Dashboard:
- Sprawdź przełącznik u góry - powinien być na **"Live"**

### W aplikacji:
- Po kliknięciu "Ulepsz teraz" sprawdź URL Stripe Checkout
- W trybie Live URL będzie zawierał `checkout.stripe.com` (bez `test`)
- W trybie Test URL będzie zawierał `checkout.stripe.com/test`

### W Firebase Functions:
- Sprawdź logi: `firebase functions:log`
- W logach zobaczysz czy używa Live czy Test kluczy

---

## ⚠️ WAŻNE UWAGI:

1. **Nie mieszaj Test i Live:**
   - Jeśli używasz Live kluczy, użyj też Live Price ID i Live webhooka
   - Jeśli używasz Test kluczy, użyj Test Price ID i Test webhooka

2. **Bezpieczeństwo:**
   - Live Secret key (`sk_live_...`) jest bardzo wrażliwy - nie udostępniaj go
   - Nie commituj `functions/.env` do Git (powinien być w `.gitignore`)

3. **Testowanie:**
   - Najpierw przetestuj wszystko w trybie Test
   - Dopiero potem przełączaj na Live

4. **Webhook:**
   - Upewnij się, że webhook w Live ma ten sam URL co w Test
   - URL: `https://us-central1-myfinanceapp-e2a0c.cloudfunctions.net/stripeWebhook`

---

## 🆘 Jeśli coś nie działa:

### Problem: "Nie przekierowuje na Stripe"
- Sprawdź czy `functions/.env` ma poprawny `STRIPE_PRICE_ID`
- Sprawdź czy zrobiłeś `firebase deploy --only functions`
- Sprawdź logi: `firebase functions:log`

### Problem: "Po płatności nadal nie mam Pro"
- Sprawdź czy webhook w Stripe ma status aktywny
- Sprawdź czy `STRIPE_WEBHOOK_SECRET` to Signing secret z webhooka (nie Secret key)
- Sprawdź logi webhooka w Stripe Dashboard → Webhooks → kliknij w webhook → "Recent events"

### Problem: "Błąd podczas tworzenia sesji checkout"
- Sprawdź czy `STRIPE_SECRET_KEY` to Live Secret key (nie Test)
- Sprawdź czy Price ID istnieje w trybie Live
- Sprawdź logi: `firebase functions:log`

---

## 📚 Przydatne komendy:

```bash
# Sprawdź aktualne sekrety (nie pokazuje wartości, tylko nazwy)
firebase functions:secrets:access STRIPE_SECRET_KEY

# Zobacz logi funkcji
firebase functions:log

# Zobacz logi konkretnej funkcji
firebase functions:log --only createCheckoutSession

# Sprawdź status wdrożenia
firebase functions:list
```

---

**Gotowe! 🎉** Po wykonaniu tych kroków aplikacja będzie używać Stripe w trybie Live.
