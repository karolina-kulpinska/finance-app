# Rozszerzenie „Run Payments with Stripe” – krok po kroku

Instrukcja dla rozszerzenia **Run Payments with Stripe** (Invertase) w Firebase. Po tej konfiguracji płatności obsługuje rozszerzenie – nie musisz ustawiać webhooków ani sekretów w terminalu.

---

## Krok 1: Klucz API w Stripe (restricted key)

1. Wejdź na [dashboard.stripe.com](https://dashboard.stripe.com).
2. Włącz **tryb testowy** (przełącznik „Test mode” u góry).
3. Przejdź do **Developers → API keys**.
4. Kliknij **Create restricted key**.
5. Nadaj nazwę, np. „Firebase Extension”.
6. Ustaw uprawnienia:
   - **Customers** – Write
   - **Checkout Sessions** – Write
   - **Customer portal** – Write
   - **Subscriptions** – Read
   - **Prices** – Read
7. Zapisz klucz. Skopiuj go (zaczyna się od `rk_`). **Nie używaj** zwykłego Secret key (`sk_`) – rozszerzenie wymaga restricted key.

---

## Krok 2: Produkt i cena w Stripe

1. W Stripe (w trybie testowym): **Products → Add product**.
2. **Name:** np. „Plan Pro”.
3. **Description:** np. „Pełny dostęp, załączniki, bez reklam”.
4. **Pricing:** One time (jednorazowo) lub Recurring (subskrypcja) – wybierz, co chcesz.
5. **Price:** np. 29 zł (lub inna kwota).
6. Zapisz produkt.
7. Wejdź w utworzoną **cenę** i skopiuj **Price ID** (np. `price_1ABC...`). Będzie potrzebny w aplikacji.

---

## Krok 3: Konfiguracja rozszerzenia w Firebase

1. Wejdź do [Firebase Console](https://console.firebase.google.com) → projekt **MyFinanceApp**.
2. W menu po lewej: **Extensions** (Beta).
3. Przy „Run Payments with Stripe” kliknij **Get started** (lub **Reconfigure**, jeśli rozszerzenie było już konfigurowane).
4. Wypełnij parametry (wartości mogą się nieznacznie różnić w zależności od wersji rozszerzenia):

   - **Stripe API Key (Restricted)**  
     Wklej klucz **restricted** z Kroku 1 (`rk_...`).

   - **Stripe Webhook Secret**  
     Na pierwszej konfiguracji rozszerzenie może wyświetlić informację, że webhook zostanie utworzony automatycznie. Jeśli pole jest wymagane:
     - W Stripe: **Developers → Webhooks → Add endpoint**.
     - **Endpoint URL:** skopiujesz z ekranu konfiguracji rozszerzenia (po zapisaniu rozszerzenia zobaczysz tam URL funkcji).
     - Zdarzenia: zaznacz np. `checkout.session.completed`, `customer.subscription.*` (jeśli używasz subskrypcji).
     - Po zapisaniu webhooka skopiuj **Signing secret** (`whsec_...`) i wklej w parametr rozszerzenia.

   - **Products collection**, **Customers collection** itd.  
     Zostaw domyślne nazwy (np. `products`, `customers`), chyba że chcesz inne. **Zapisz sobie** te ścieżki – przydadzą się w aplikacji.

5. Kliknij **Zapisz / Save** (lub **Install**, jeśli to pierwsza instalacja). Poczekaj, aż rozszerzenie się wdroży.

---

## Krok 4: Sprawdzenie, co utworzyło rozszerzenie

1. W Firebase: **Build → Functions**. Powinny być widoczne nowe funkcje (np. powiązane z Stripe).
2. **Firestore**: rozszerzenie może utworzyć kolekcje (np. `products`, `customers`) – możesz je zobaczyć w **Firestore Database** po pierwszym użyciu płatności.

---

## Krok 5: Aplikacja (przycisk „Ulepsz do Pro”)

Aplikacja jest już podłączona do rozszerzenia przez SDK **@invertase/firestore-stripe-payments**:

1. **Zmienna środowiskowa**  
   Skopiuj `.env.example` do `.env` i ustaw **Price ID** z Kroku 2:
   ```env
   REACT_APP_STRIPE_PRICE_ID=price_1ABC...
   ```
2. **Zbuduj i uruchom**  
   Po ustawieniu `REACT_APP_STRIPE_PRICE_ID` przycisk „Ulepsz do Pro” tworzy sesję Stripe (rozszerzenie) i przekierowuje na Stripe Checkout. Po powrocie z `?payment=success` aplikacja odświeża plan.
3. **Status Pro**  
   Plan „Pro” jest ustalany, gdy rozszerzenie ma w Firestore aktywną subskrypcję lub udaną płatność dla zalogowanego użytkownika (kolekcje `customers` / subskrypcje). Opcjonalnie możesz dalej ustawiać `users/{uid}.plan = "pro"` (np. własnym webhookiem) – aplikacja najpierw sprawdza dane rozszerzenia, potem Firestore.
4. **Kolekcje**  
   W `src/api/stripePayments.js` używane są domyślne nazwy: `products`, `customers`. Jeśli w rozszerzeniu wybrałeś inne – zmień je w tym pliku.

---

## Podsumowanie

| Krok | Gdzie | Co zrobić |
|------|--------|------------|
| 1 | Stripe | Restricted key (rk_...), uprawnienia: Customers, Checkout Sessions, Customer portal – Write; Subscriptions, Prices – Read |
| 2 | Stripe | Produkt „Plan Pro” + cena, skopiować Price ID (price_...) |
| 3 | Firebase → Extensions | Get started przy „Run Payments with Stripe”, wkleić Stripe API Key (restricted), ewentualnie Webhook Secret, zapisać |
| 4 | Firebase | Sprawdzić Functions i Firestore po wdrożeniu |
| 5 | Aplikacja | Ustaw `REACT_APP_STRIPE_PRICE_ID` w `.env`, zbuduj – przycisk „Ulepsz do Pro” korzysta z rozszerzenia |

Po wykonaniu kroków 1–4 napisz, że konfiguracja jest gotowa – wtedy podam dokładne zmiany w kodzie (Firestore + ewentualnie custom claims) pod Twoje rozszerzenie.