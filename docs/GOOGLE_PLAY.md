# Jak dodać aplikację do Google Play

Aplikacja jest już skonfigurowana jako **PWA** (manifest, service worker). Żeby trafiła do Google Play, trzeba ją **wdrożyć w internecie** (HTTPS), a potem **opakować w aplikację Android** (TWA) i wgrać do Play Console.

---

## Krok 0. Ikony (jeśli brakuje)

Do instalacji PWA i do sklepu Play potrzebne są ikony **192×192** i **512×512** pikseli (PNG).

- Jeśli w folderze `public/` **nie ma** plików `logo192.png` i `logo512.png`:
  - Zrób lub wygeneruj ikonę (np. na [realfavicongenerator.net](https://realfavicongenerator.net) lub w Canvie).
  - Zapisz jako `logo192.png` (192×192) i `logo512.png` (512×512).
  - Wrzuć oba pliki do folderu **`public/`** w projekcie.

---

## Część 1. Wdrożenie strony (HTTPS)

Aplikacja musi być dostępna pod adresem **https://...** (np. Firebase Hosting).

### 1.1 Build

W folderze projektu:

```bash
npm run build
```

### 1.2 Firebase Hosting (jeśli używasz Firebase)

1. W pliku `firebase.json` dodaj (lub upewnij się, że jest) sekcja `hosting`:

```json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  },
  "functions": { ... }
}
```

2. Wdróż hosting:

```bash
firebase deploy --only hosting
```

3. Adres aplikacji będzie np.:  
   **https://myfinanceapp-e2a0c.web.app**  
   (lub Twoja domena, jeśli ją podłączysz w Firebase Hosting).

Zapamiętaj ten adres – będzie potrzebny w Bubblewrap/PWABuilder i **jako bazowy link w e-mailach zaproszeniowych**.

---

## Część 2. Aplikacja Android (TWA) – Bubblewrap

**TWA** (Trusted Web Activity) = aplikacja Android, która w pełnym ekranie otwiera Twoją stronę. Google zaleca narzędzie **Bubblewrap**.

### 2.1 Wymagania

- Zainstalowana **Java JDK 11** (lub 17).
- **Node.js** (masz).
- Konto **Google Play Developer** (jednorazowo ok. 25 USD).

### 2.2 Instalacja Bubblewrap

W terminalu (dowolny folder):

```bash
npm install -g @bubblewrap/cli
bubblewrap init
```

Podczas `bubblewrap init` podaj:

- **URL aplikacji** – np. `https://myfinanceapp-e2a0c.web.app`
- **Nazwa aplikacji** – np. „Moja Aplikacja Finansowa”
- **Launcher name** – np. „Panel Finansowy”
- **Ścieżka do ikony** – plik 512×512 PNG (np. `public/logo512.png`)
- **Kolor theme** – np. `#667eea`
- **Kolor background** – np. `#ffffff`

Bubblewrap wygeneruje folder z projektem Android (np. `twa-manifest.json` i projekt na Androida).

### 2.3 Zbudowanie AAB (plik do Google Play)

W folderze wygenerowanym przez Bubblewrap:

```bash
bubblewrap build
```

Powstanie plik **.aab** (Android App Bundle) – tym plikiem wgrywasz aplikację do Play Console.

---

## Alternatywa: PWABuilder

Jeśli wolisz interfejs w przeglądarce:

1. Wejdź na [pwabuilder.com](https://www.pwabuilder.com).
2. Wklej adres swojej wdrożonej aplikacji (np. `https://myfinanceapp-e2a0c.web.app`).
3. Kliknij **Start** – PWABuilder sprawdzi manifest i PWA.
4. Wybierz **Android** → **Generate** – pobierzesz paczkę z projektem Android.
5. Zbuduj AAB w Android Studio (File → Build → Generate Signed Bundle) lub używając ich instrukcji.

---

## Część 3. Google Play Console

### 3.1 Konto deweloperskie

1. Wejdź na [play.google.com/console](https://play.google.com/console).
2. Zaloguj się kontem Google.
3. Opłać **jednorazową opłatę** rejestracyjną (ok. 25 USD).
4. Uzupełnij dane dewelopera (np. nazwa, strona, e-mail).

### 3.2 Nowa aplikacja

1. **Utwórz aplikację** – nazwa, domyślny język, typ (aplikacja), czy płatna/darmowa.
2. W **Dashboard** wejdź w **Wersja** → **Produkcja** (lub **Test wewnętrzny** na początek).

### 3.3 Wgranie AAB

1. **Utwórz nową wersję**.
2. **Prześlij plik AAB** (ten z Bubblewrap lub PWABuilder).
3. Wypełnij **opis aplikacji**, **zrzuty ekranu** (telefon, ewentualnie tablet).
4. Ustaw **kategorię** (np. Finanse), **treść** (np. wiek, reklamy tak/nie).
5. **Polityka prywatności** – musisz podać link do strony z polityką (może być prosta strona lub dokument w repozytorium).
6. Zapisz i **wyślij do recenzji**.

Po zaakceptowaniu aplikacja pojawi się w Google Play.

---

## Link w e-mailu zaproszeniowym

Żeby zaproszenia do rodziny działały też po publikacji w Play:

- W Cloud Function (lub w konfiguracji) **link zaproszenia** powinien używać **tej samej domeny**, pod którą działa PWA (np. `https://myfinanceapp-e2a0c.web.app`).
- W Firebase / Resend upewnij się, że `window.location.origin` lub stały URL w funkcji to właśnie ten adres produkcyjny (nie localhost). Wtedy link w mailu otworzy się w przeglądarce lub w zainstalowanej aplikacji TWA, jeśli użytkownik ma ją zainstalowaną.

---

## Szybka checklista

- [ ] Ikony 192×192 i 512×512 w `public/`
- [ ] `npm run build` i wdrożenie na HTTPS (np. Firebase Hosting)
- [ ] Zapamiętany adres aplikacji (np. https://....web.app)
- [ ] Bubblewrap lub PWABuilder – wygenerowany projekt i zbudowany AAB
- [ ] Konto Google Play Developer (opłacone)
- [ ] W Play Console: wgrany AAB, opisy, zrzuty ekranu, polityka prywatności
- [ ] Link w mailu zaproszeniowym ustawiony na docelowy adres aplikacji
