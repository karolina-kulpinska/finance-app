# Konfiguracja Stripe Customer Portal – krok po kroku

Instrukcja dodania funkcji `createCustomerPortalSession` do Firebase Functions, która umożliwia użytkownikom zarządzanie subskrypcją (anulowanie, zmiana metody płatności, faktury).

---

## Krok 1: Sprawdź czy masz już funkcję w kodzie

Funkcja `createCustomerPortalSession` została już dodana do pliku `functions/index.js`. Sprawdź czy plik zawiera tę funkcję:

```bash
cd functions
cat index.js | grep -i "createCustomerPortalSession"
```

Jeśli widzisz funkcję, przejdź do **Kroku 2**. Jeśli nie, funkcja została już dodana automatycznie.

---

## Krok 2: Sprawdź czy masz zainstalowane zależności

Upewnij się, że masz zainstalowany pakiet `stripe` w folderze `functions`:

```bash
cd functions
npm list stripe
```

Jeśli widzisz błąd lub brak pakietu, zainstaluj:

```bash
npm install stripe
```

---

## Krok 3: Sprawdź czy masz ustawiony sekret Stripe

Funkcja używa sekretu `STRIPE_SECRET_KEY`, który powinien być już ustawiony (jeśli używasz Stripe). Sprawdź:

```bash
firebase functions:secrets:access STRIPE_SECRET_KEY
```

Jeśli widzisz błąd lub nie masz tego sekretu, ustaw go:

```bash
firebase functions:secrets:set STRIPE_SECRET_KEY
```

Gdy zapyta o wartość, wklej **Secret key** ze Stripe (`sk_test_...` dla trybu testowego lub `sk_live_...` dla produkcji) i naciśnij Enter.

---

## Krok 4: Wdróż funkcję do Firebase

W folderze projektu (nie w `functions`, ale w głównym folderze):

```bash
cd ..
firebase deploy --only functions:createCustomerPortalSession
```

Lub jeśli chcesz wdrożyć wszystkie funkcje:

```bash
firebase deploy --only functions
```

Poczekaj, aż wdrożenie się zakończy. Powinieneś zobaczyć komunikat typu:

```
✔  functions[createCustomerPortalSession(us-central1)] Successful create operation.
```

---

## Krok 5: Sprawdź czy funkcja działa

1. **W Firebase Console:**
   - Wejdź do [Firebase Console](https://console.firebase.google.com) → Twój projekt
   - Przejdź do **Build → Functions**
   - Powinieneś zobaczyć funkcję `createCustomerPortalSession` na liście

2. **W aplikacji:**
   - Uruchom aplikację (`npm start`)
   - Zaloguj się jako użytkownik z aktywną subskrypcją Pro
   - Przejdź do **Profil → Subskrypcja**
   - Kliknij **"Zarządzaj subskrypcją"**
   - Powinno przekierować Cię do Stripe Customer Portal

---

## Krok 6: Konfiguracja Stripe Customer Portal (opcjonalne)

Jeśli chcesz dostosować wygląd lub funkcje Customer Portal:

1. Wejdź na [dashboard.stripe.com](https://dashboard.stripe.com)
2. Przejdź do **Settings → Billing → Customer portal**
3. Możesz tam:
   - Włączyć/wyłączyć możliwość anulowania subskrypcji
   - Dostosować wygląd portalu
   - Ustawić komunikaty dla użytkowników
   - Włączyć/wyłączyć możliwość zmiany metody płatności

---

## Jak działa funkcja?

1. **Użytkownik klika "Zarządzaj subskrypcją"** w aplikacji
2. **Aplikacja wywołuje funkcję** `createCustomerPortalSession` z `returnUrl`
3. **Funkcja:**
   - Sprawdza czy użytkownik jest zalogowany
   - Szuka customer ID w Firestore (kolekcja `customers`)
   - Jeśli nie znajdzie, szuka w sesjach checkout Stripe
   - Jeśli nadal nie znajdzie, szuka w subskrypcjach Stripe
   - Jeśli nadal nie znajdzie, tworzy nowego customera w Stripe
   - Tworzy sesję Customer Portal z `returnUrl`
   - Zwraca URL do Customer Portal
4. **Aplikacja przekierowuje** użytkownika na URL z Customer Portal
5. **Użytkownik zarządza subskrypcją** (anuluje, zmienia metodę płatności, ogląda faktury)
6. **Po zakończeniu** Stripe przekierowuje użytkownika z powrotem na `returnUrl`

---

## Rozwiązywanie problemów

### Błąd: "Musisz być zalogowany"
- Upewnij się, że użytkownik jest zalogowany w aplikacji
- Sprawdź czy Firebase Authentication działa poprawnie

### Błąd: "Błąd tworzenia sesji Customer Portal"
- Sprawdź czy `STRIPE_SECRET_KEY` jest poprawnie ustawiony
- Sprawdź czy klucz ma odpowiednie uprawnienia w Stripe (Customer portal – Write)
- Sprawdź logi funkcji: `firebase functions:log --only createCustomerPortalSession`

### Nie znajduje customer ID
- Funkcja automatycznie tworzy nowego customera, jeśli nie znajdzie istniejącego
- Sprawdź w Stripe Dashboard → Customers czy customer został utworzony

### Customer Portal nie otwiera się
- Sprawdź czy funkcja została poprawnie wdrożona: `firebase functions:list`
- Sprawdź logi: `firebase functions:log`
- Upewnij się, że używasz poprawnego `returnUrl` (pełny URL z protokołem https)

---

## Testowanie

1. **W trybie testowym Stripe:**
   - Użyj karty testowej: `4242 4242 4242 4242`
   - Dowolna przyszła data wygaśnięcia
   - Dowolny CVC

2. **Sprawdź czy możesz:**
   - Anulować subskrypcję
   - Zmienić metodę płatności
   - Zobaczyć historię faktur
   - Wrócić do aplikacji po zamknięciu portalu

---

## Podsumowanie

| Krok | Co zrobić | Status |
|------|-----------|--------|
| 1 | Sprawdź czy funkcja jest w kodzie | ✅ Automatycznie dodane |
| 2 | Sprawdź zależności (`npm list stripe`) | ⚠️ Sprawdź ręcznie |
| 3 | Sprawdź sekret (`STRIPE_SECRET_KEY`) | ⚠️ Sprawdź ręcznie |
| 4 | Wdróż funkcję (`firebase deploy`) | ⚠️ Wykonaj teraz |
| 5 | Przetestuj w aplikacji | ⚠️ Po wdrożeniu |
| 6 | Opcjonalnie: dostosuj portal w Stripe | ⚠️ Opcjonalne |

---

**Data utworzenia:** 2026-02-15  
**Wersja:** 1.0
