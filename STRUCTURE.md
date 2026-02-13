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
├── index.js                  (główny komponent)
├── styled.js                (style dla Dashboardu)
├── Form/
│   ├── index.js             (formularz dodawania płatności)
│   └── styled.js            (style dla formularza)
└── List/
    ├── index.js             (lista płatności)
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
│   ├── authSlice.js         (slice dla autentykacji)
│   ├── authSaga.js          (saga dla logowania)
│   ├── registrationSlice.js (slice dla rejestracji)
│   └── registrationSaga.js  (saga dla rejestracji)
├── payments/
│   ├── paymentSlice.js
│   └── paymentSaga.js
└── notification/
    ├── notificationSlice.js (slice dla powiadomień)
    └── confirmSlice.js      (slice dla potwierdzeń)
```

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

Ta struktura zapewnia:
- Łatwą modyfikację stylów dla każdego komponentu
- Niezależność komponentów
- Czytelną hierarchię
- Łatwe zarządzanie i utrzymanie kodu
