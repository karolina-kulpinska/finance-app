# Struktura Projektu - Style Components

## Zasada organizacji

Każdy folder i podfolder ma swój własny plik `styled.js` zawierający komponenty stylowane dla tego poziomu. Podkomponenty są niezależnymi modułami z własnymi stylami i logiką.

## Struktura stron

### Landing Page (`src/pages/Landing/`)

```
Landing/
├── index.js                  (główny komponent - importuje podkomponenty)
├── styled.js                 (style dla Wrapper i Container)
├── Hero/
│   ├── index.js             (komponent Hero)
│   └── styled.js            (style dla Hero)
├── Features/
│   ├── index.js             (komponent Features)
│   └── styled.js            (style dla Features)
└── Benefits/
    ├── index.js             (komponent Benefits)
    └── styled.js            (style dla Benefits)
```

### Login Page (`src/pages/Login/`)

```
Login/
├── index.js                  (główny komponent - importuje LoginForm)
└── LoginForm/
    ├── index.js             (komponent formularza)
    └── styled.js            (wszystkie style dla formularza)
```

### Registration Page (`src/pages/Registration/`)

```
Registration/
├── index.js                  (główny komponent - importuje RegistrationForm)
└── RegistrationForm/
    ├── index.js             (komponent formularza)
    └── styled.js            (wszystkie style dla formularza)
```

### Dashboard (`src/pages/Dashboard/`)

```
Dashboard/
├── index.js                  (główny komponent - koordynuje wszystkie podkomponenty)
├── styled.js                (podstawowe style - Wrapper, Container)
├── Header/
│   ├── index.js             (nagłówek z tytułem i akcjami)
│   └── styled.js            (style dla nagłówka)
├── Stats/
│   ├── index.js             (statystyki finansowe)
│   └── styled.js            (style dla statystyk)
├── Filters/
│   ├── index.js             (filtry statusu i kategorii)
│   └── styled.js            (style dla filtrów)
├── Form/
│   ├── index.js             (formularz dodawania płatności)
│   └── styled.js            (style dla formularza)
└── List/
    ├── index.js             (lista płatności z kartami)
    └── styled.js            (style dla listy)
```

## Komponenty globalne (`src/components/`)

```
components/
├── Button/
│   ├── index.js
│   └── styled.js
├── Icons/
│   ├── index.js             (eksportuje wszystkie ikony)
│   ├── GoogleIcon.js
│   ├── SuccessIcon.js
│   ├── ErrorIcon.js
│   ├── WarningIcon.js
│   └── InfoIcon.js
├── NotificationModal/
│   ├── index.js
│   └── styled.js
└── ConfirmModal/
    ├── index.js
    └── styled.js
```

## Redux (`src/features/`)

```
features/
├── auth/
│   ├── authSlice.js         (slice dla autentykacji - user, loading, error)
│   ├── authSaga.js          (saga dla logowania - email/password + Google Popup)
│   ├── registrationSlice.js (slice dla rejestracji)
│   └── registrationSaga.js  (saga dla rejestracji)
├── payments/
│   ├── paymentSlice.js      (slice dla płatności - items, filter, categoryFilter)
│   └── paymentSaga.js       (saga - CRUD + Firebase Storage dla załączników)
└── notification/
    ├── notificationSlice.js (slice dla powiadomień)
    └── confirmSlice.js      (slice dla potwierdzeń usuwania)
```

## Funkcje Dashboard

### Zarządzanie płatnościami:
- Dodawanie płatności z pełnymi danymi (nazwa, kwota, termin, kategoria, priorytet, notatki)
- Możliwość dodania załączników (PDF, zdjęcia) - **automatyczna kompresja zdjęć (-70% rozmiaru)**
- Przechowywanie załączników w Firebase Storage
- Oznaczanie płatności jako zapłacone/niezapłacone
- Usuwanie płatności z potwierdzeniem
- Pobieranie załączników
- **Responsywny layout** - 2 kolumny na laptopach, 1 kolumna na mobile

### Kategorie:
- 🧾 Rachunki (bills)
- 🛒 Zakupy (shopping)
- 📌 Inne (other)

### Priorytety:
- 🔴 Wysoki (high)
- 🟡 Normalny (normal)
- 🟢 Niski (low)

### Filtry:
- Status: Wszystkie / Do zapłaty / Zapłacone
- Kategoria: Wszystkie / Rachunki / Zakupy / Inne

### Statystyki:
- Łączne wydatki
- Do zapłaty (z liczbą niezapłaconych)
- Zapłacone (z liczbą opłaconych)

### Optymalizacja kosztów:
- Załączniki przechowywane w Firebase Storage (nie w Firestore)
- Tylko URL i nazwa pliku w bazie danych
- Efektywne zapytania z filtrowaniem po userId
- Real-time updates przez onSnapshot

## Kluczowe zasady

1. **Każdy folder ma swój styled.js** - zawierający style tylko dla tego poziomu
2. **Podkomponenty są niezależne** - każdy ma własny index.js i styled.js
3. **Brak re-exportów** - styled.js nie re-exportuje stylów z podfolderów
4. **Główny komponent importuje podkomponenty** - np. Landing/index.js importuje Hero, Features, Benefits
5. **Brak komentarzy //** - kod nie zawiera jednoliniowych komentarzy

## Przykład użycia

### Landing Page

```jsx
import Hero from "./Hero";
import Features from "./Features";
import Benefits from "./Benefits";
import * as S from "./styled";

<S.Wrapper>
  <S.Container>
    <Hero onLogin={handleLogin} onRegistration={handleRegistration} />
    <Features />
    <Benefits />
  </S.Container>
</S.Wrapper>
```

### Login Page

```jsx
import LoginForm from "./LoginForm";

<LoginForm
  onSubmit={onSubmit}
  onGoogleLogin={handleGoogleLogin}
  isLoading={isLoading}
/>
```

## Struktura danych płatności (Firestore)

```javascript
{
  id: "auto-generated-id",
  name: "Nazwa płatności",
  amount: 123.45,
  date: "2024-01-15",
  category: "bills" | "shopping" | "other",
  priority: "high" | "normal" | "low",
  notes: "Dodatkowe informacje",
  paid: false,
  userId: "user-uid",
  createdAt: serverTimestamp(),
  attachmentUrl: "https://firebase-storage-url" | null,
  attachmentName: "filename.pdf" | null
}
```

## Firebase Storage - optymalizacja kosztów

- Załączniki przechowywane w `payments/{userId}/{timestamp}_{filename}`
- URL generowany po uploadu i zapisywany w Firestore
- Przy usuwaniu płatności, załącznik również usuwany z Storage
- Akceptowane formaty: PDF, JPG, JPEG, PNG
- Firestore przechowuje tylko metadane (URL + nazwa), nie sam plik

## Zalety tej struktury

- Łatwą modyfikację stylów dla każdego komponentu
- Niezależność komponentów
- Czytelną hierarchię
- Łatwe zarządzanie i utrzymanie kodu
- Minimalne koszty bazy danych
- Efektywne zapytania i filtrowanie
- Real-time synchronizację danych
