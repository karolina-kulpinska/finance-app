# Plany: Free i Pro

## Zachowanie

- **Free (domyślnie):** brak załączników do płatności, wyświetlana jest sekcja reklam (placeholder), w nagłówku przycisk „Ulepsz do Pro”.
- **Pro:** załączniki włączone, brak reklam, w nagłówku odznaka „Pro”.

Plan użytkownika jest trzymany w Firestore w dokumencie `users/{uid}` w polu `plan`: `"free"` lub `"pro"`.

## Ręczne ustawienie Pro (na razie)

1. Otwórz Firebase Console → Firestore.
2. Kolekcja **users** → dokument o ID równym **uid** użytkownika (uid zobaczysz np. w Authentication).
3. Dodaj lub edytuj pole **plan** i ustaw wartość **pro** (małymi literami).
4. Po odświeżeniu aplikacji użytkownik będzie miał plan Pro.

## Później: płatności

Można dodać integrację z Stripe / Paddle / Google Play Billing: po udanej płatności wywołanie Cloud Function, która w Firestore w `users/{uid}` ustawi `plan: "pro"` (oraz ewentualnie daty ważności subskrypcji).
