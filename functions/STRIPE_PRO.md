# Automatyczna zmiana na Pro po opłaceniu (Stripe)

Po skonfigurowaniu Stripe, kliknięcie „Ulepsz do Pro” przekierowuje użytkownika do Stripe Checkout. Po udanej płatności webhook automatycznie ustawia w Firestore `users/{uid}` pole `plan: "pro"`.

---

## 1. Konto Stripe

1. Załóż konto na [stripe.com](https://stripe.com).
2. W panelu: **Developers → API keys** – skopiuj **Secret key** (sk zaczyna się od `sk_`).
3. **Developers → Webhooks → Add endpoint**:
   - **URL:** `https://us-central1-myfinanceapp-e2a0c.cloudfunctions.net/stripeWebhook`  
     (jeśli Twój region/projekt jest inny, sprawdź URL po wdrożeniu: `firebase deploy --only functions`).
   - **Zdarzenia:** zaznacz `checkout.session.completed`.
   - Po zapisaniu skopiuj **Signing secret** (zaczyna się od `whsec_`).

4. **Product w Stripe:**  
   **Products → Add product** – np. nazwa „Plan Pro”, cena jednorazowa (np. 29 zł).  
   Po zapisaniu wejdź w cenę i skopiuj **Price ID** (np. `price_1ABC...`).

---

## 2. Sekrety i konfiguracja w Firebase

W terminalu (w folderze projektu):

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```
Wklej **Secret key** ze Stripe (sk_...).

```bash
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```
Wklej **Signing secret** z webhooka (whsec_...).

**Price ID** (np. `price_1ABC...`): w folderze `functions` utwórz plik **`.env`** (nie commituj go do repo) z zawartością:

```
STRIPE_PRICE_ID=price_TWOJ_PRICE_ID
```

Zamień na prawdziwy Price ID z Stripe. Przy `firebase deploy --only functions` wartość zostanie wczytana i plan Pro będzie dostępny po płatności.

---

## 3. Wdrożenie funkcji

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

Skopiuj URL funkcji **stripeWebhook** z outputu i upewnij się, że w Stripe (Webhooks) wpisany jest dokładnie ten adres.

---

## 4. Test

1. W aplikacji zaloguj się i kliknij **Ulepsz do Pro**.
2. Powinieneś trafić do Stripe Checkout.
3. W trybie testowym użyj karty `4242 4242 4242 4242`.
4. Po opłaceniu Stripe przekieruje z powrotem do aplikacji z parametrem `?payment=success`.
5. Aplikacja odświeży plan – w nagłówku powinna pojawić się odznaka **Pro**.

---

## 5. Tryb produkcyjny Stripe

Gdy przełączysz konto Stripe na tryb **Live**, wygeneruj nowe klucze (Live) i nowy webhook (Live), zaktualizuj sekrety w Firebase i Price ID (produkcyjny).
