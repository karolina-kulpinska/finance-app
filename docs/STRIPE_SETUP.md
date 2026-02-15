# Płatność Pro – konfiguracja Stripe (krok po kroku)

Jedna ścieżka: przycisk „Ulepsz do Pro” → Stripe Checkout → po opłaceniu webhook ustawia plan Pro. Wystarczy zrobić poniższe **raz**.

---

## 1. Stripe – klucze i produkt

1. Wejdź na **https://dashboard.stripe.com** (włącz **Test mode** u góry).
2. **Developers → API keys**  
   Skopiuj **Secret key** (`sk_test_...`). Będzie potrzebny w kroku 3.
3. **Products → Add product**  
   - Name: np. „Plan Pro”  
   - Price: jednorazowa kwota (np. 29 zł)  
   Zapisz produkt, wejdź w utworzoną **cenę** i skopiuj **Price ID** (`price_...`). Będzie potrzebny w kroku 4.

---

## 2. Firebase – secret Stripe

W terminalu (w folderze projektu):

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```

Gdy zapyta o wartość, **wklej** Secret key ze Stripe (`sk_test_...`) i naciśnij Enter.  
(W PowerShell: po pytaniu wklej Ctrl+V, potem Enter – **nie** wpisuj klucza w tej samej linii co komenda.)

---

## 3. Stripe – webhook (żeby po płatności ustawić Pro)

**URL do wklejenia (gdy już znajdziesz pole):**
```
https://us-central1-myfinanceapp-e2a0c.cloudfunctions.net/stripeWebhook
```

Stripe ma **dwa** różne ekrany. Sprawdź, który widzisz:

---

**Jeśli widzisz przycisk "Add endpoint" / "Add an endpoint":** (klasyczny Dashboard)

1. Kliknij **Add endpoint**.
2. Na stronie formularza szukaj **"Endpoint URL"** – to jedno pole tekstowe (czasem pod wyborem zdarzeń). Wklej tam powyższy URL.
3. W sekcji **"Select events"** wybierz zdarzenie **checkout.session.completed**.
4. Zapisz ( **Add endpoint** / **Create** / **Save** ).
5. Na stronie utworzonego webhooka znajdź **"Signing secret"** → **Reveal** → skopiuj `whsec_...`.

---

**Jeśli widzisz "Create destination" / Workbench / "Event destinations":** (nowy interfejs)

1. Kliknij **Create destination** (albo **Create new destination**).
2. Wybierz typ: **Webhook** (wysyłanie na adres HTTPS).
3. **Pierwsze pole na stronie** to zwykle **"Endpoint URL"** albo **"URL"** – tam wklej powyższy URL. (Czasem jest na górze, przed wyborem zdarzeń.)
4. Wybierz zdarzenie **checkout.session.completed**, potem **Continue**.
5. Dokończ kreator (**Create new destination**).
6. Po utworzeniu wejdź w ten webhook – będzie **"Signing secret"** → **Reveal** → skopiuj `whsec_...`.

---

## 4. Firebase – secret webhooka

W terminalu:

```bash
firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
```

Gdy zapyta o wartość, **wklej** Signing secret ze Stripe (`whsec_...`) i naciśnij Enter.

---

## 5. Price ID w functions

W folderze **functions** utwórz (lub edytuj) plik **.env** z jedną linią:

```
STRIPE_PRICE_ID=price_xxxxxxxx
```

Zamień `price_xxxxxxxx` na **Price ID** skopiowany w kroku 1 (cenę produktu „Plan Pro”).

---

## 6. Wdrożenie funkcji

W folderze projektu:

```bash
firebase deploy --only functions
```

Poczekaj, aż wdrożenie się skończy.

---

## 7. Test

1. Uruchom aplikację (`npm start`), zaloguj się.
2. Kliknij **„Ulepsz do Pro”** – powinno przekierować na Stripe Checkout.
3. W trybie testowym użyj karty: `4242 4242 4242 4242`, dowolna przyszła data, dowolny CVC.
4. Po opłaceniu Stripe przekieruje z powrotem do aplikacji.  
   Webhook w tle ustawi **plan Pro** – odśwież stronę; powinna być odznaka **Pro**.

---

## Gdy coś nie działa

- **Nie przekierowuje na Stripe**  
  Sprawdź: `functions/.env` ma `STRIPE_PRICE_ID=price_...` i zrobiłeś `firebase deploy --only functions`.

- **Po płatności nadal „Ulepsz do Pro”**  
  Webhook nie zadziałał. Sprawdź:
  1. W Stripe → Webhooks czy endpoint ma status aktywny i zdarzenie `checkout.session.completed`.
  2. Czy `STRIPE_WEBHOOK_SECRET` to **Signing secret** z tego webhooka (nie Secret key API).
  3. Po poprawce: `firebase deploy --only functions` i spróbuj płatności jeszcze raz.

- **W aplikacji jest link „Zapłaciłeś, ale nadal nie masz Pro? Kliknij tutaj.”**  
  To awaryjne – po kliknięciu ustawi Pro ręcznie (raz na konto). Najpierw dopilnuj webhooka (kroki 3–4–6), żeby kolejne płatności działały automatycznie.
