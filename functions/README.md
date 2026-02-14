# Wysyłka e-maili zaproszeń do rodziny

Aplikacja wysyła e-maile z linkiem zaproszenia przez **Resend** i **Firebase Cloud Functions**.

## Krok 1: Konto Resend

1. Załóż konto na [resend.com](https://resend.com) (darmowy plan: 100 maili/dzień).
2. W panelu Resend: **API Keys** → **Create API Key** → skopiuj klucz (zaczyna się od `re_`).

## Krok 2: Firebase – plan Blaze

Cloud Functions wymagają płatnego planu **Blaze** (pay as you go).  
W [Firebase Console](https://console.firebase.google.com) → ustawienia projektu → **Upgrade to Blaze**.  
Bez obciążania karty możesz ustawić limit budżetu (np. 5 USD).

## Krok 3: Zainstaluj Firebase CLI i zaloguj się

```bash
npm install -g firebase-tools
firebase login
```

W katalogu projektu:

```bash
cd functions
npm install
cd ..
```

## Krok 4: Ustawienie klucza Resend w Firebase

```bash
firebase functions:secrets:set RESEND_API_KEY
```

Wpisz (lub wklej) klucz API z Resend i zatwierdź.

## Krok 5: Wdrożenie funkcji

```bash
firebase deploy --only functions
```

Po wdrożeniu w konsoli zobaczysz URL funkcji. Aplikacja wywołuje ją automatycznie.

## Nadawca e-maila (opcjonalnie)

- **Testy:** funkcja używa `onboarding@resend.dev` – działa od razu, małe ryzyko trafienia do spamu.
- **Produkcja:** w [Resend](https://resend.com/domains) dodaj i zweryfikuj swoją domenę. W pliku `functions/index.js` zmień zmienną `from` na np. `Zaproszenia <zaproszenia@twojadomena.pl>`.

## Sprawdzenie

1. W aplikacji: Rodzina → Zaproś członka → wpisz swój e-mail → Wyślij zaproszenie.
2. Sprawdź skrzynkę (i folder spam) – powinien przyjść mail z linkiem do dołączenia do rodziny.
