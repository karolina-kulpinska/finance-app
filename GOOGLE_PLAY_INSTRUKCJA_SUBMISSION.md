# 📱 Instrukcja Wrzucenia do Google Play Console (Krok Po Kroku)

## ✅ Stan obecny:

- ✅ Build już gotowy w folderze `build/`
- ✅ Capacitor zainstalowany
- ✅ Teraz: Synchronizuj z Androidem i zbuduj Bundle

---

## 🔧 Krok 1: Synchronizuj z Androidem (2 minuty)

Uruchom w PowerShell (folder projektu):

```powershell
npm run cap:sync
```

Czeka aż się skończy (powinno pokazać: "✓ Copying web assets from build to android")

---

## 🔧 Krok 2: Otwórz Android Studio (1 minuta)

```powershell
npm run cap:open:android
```

Czeka aż otworzy się Android Studio. Jeśli nie otworzy się automatycznie:

1. Otwórz ścieżkę: `c:\Projekt\moja-aplikacja-finansowa\android`
2. Kliknij `Open` w Android Studio

---

## 🔧 Krok 3: Build Bundle (.aab) (5-10 minut)

W Android Studio (po lewej stronie):

1. **Build** (menu górne)
2. **Build Bundle(s) / APK(s)**
3. Wybierz: **Bundle (s)**
4. Kliknij: **Next**

Android Studio będzie budować (się pojawi pasek postępu).

Po skończeniu:

- ✅ Powinna się pojawić zielona informacja: **"Build Complete"**
- Plik `.aab` znajdziesz w: `android/app/release/app-release.aab`

---

## 🔧 Krok 4: Wrzucenie do Google Play Console (5 minut)

### Login

1. Otwórz: https://play.google.com/console
2. Zaloguj się (Gmail)
3. Wybierz aplikację: **Mój Smart Budget**

### Przejdź do Internal Testing

Po lewej stronie → **Testuj i publikuj** → **Internal testing**

### Utwórz nowe wydanie

1. Kliknij: **Utwórz wydanie**
2. W sekcji **Aplikacja** pojawi się pusty obszar
3. Kliknij: **Przeglądaj pliki** (lub przeciągnij plik)
4. Wyszukaj plik: `app-release.aab` (w `android/app/release/`)
5. Kliknij: **Otwórz**

Plik się będzie uploadować (~1-2 minuty).

Powinna się pojawić zielona informacja: ✅ **"App bundle successfully uploaded"**

### Uzupełnij Release Notes

1. **Version name:** `1.0.0`
2. **Release notes:**

   ```
   Testowanie Google Play Billing
   Możliwość zakupienia planu Pro
   ```

3. Kliknij: **Zapisz**

### Publikuj na Internal Testing

1. Kliknij: **Przegląd i publikacja** (prawy dolny guzik)
2. Przejdź przez checklistę (powinno być wszystko zielone)
3. Kliknij: **Publikuj** (prawy dolny guzik)

Czeka ~10-15 minut aż się opublikuje.

---

## ✅ Sprawdzenie (co dalej?)

### Dodaj testerów

W tym samym oknie **Internal testing**:

1. Zjedź do sekcji **Testerzy**
2. Kliknij: **Utwórz listę testerów** (lub **Edytuj listę**)
3. Dodaj emaile:
   - `kulpinska.karolinaa@gmail.com` (Twój)
   - Inne emaile jeśli testujesz z kimś

4. Kliknij: **Zapisz**

Testerzy dostaną email z linkiem do instalacji. W Play Store będzie widoczna jako "Mój Smart Budget (Test Build)"

---

## 🧪 Testowanie (10 minut)

1. Na telefonie zainstaluj z Play Store (wersja testowa)
2. Zaloguj się na konto z emailem admin (z `.env`)
3. Przejdź do **Profil** → **Zarządzaj subskrypcją**
4. Kliknij: **Ulepsz do Pro**
5. Powinna się pojawić **opcja kupienia** (bez rzeczywistej płatności w testach Google)

---

## ⏰ Po 14 dniach testów → Publikacja na Produkcję

1. **Zarabiaj** → **Produkty w aplikacji** → **Utwórz subskrypcję**
   - **Nazwa:** Pro Plan
   - **ID:** `pro_plan_monthly`
   - **Cena:** 9.99 PLN
   - **Okres:** 1 miesiąc

2. **Testuj i publikuj** → **Production**
3. Wrzuć tę samą wersję (`.aab`)
4. Kliknij: **Publikuj**

Google zweryfikuje aplikację (~24-48 godzin) i opublikuje.

---

## ❓ Problemy?

### "Bundle rejected"

- Sprawdź czy ID pakietu w `android/app/build.gradle` to: `pl.smartbudget.app`
- Sprawdź wersję w `android/app/build.gradle`: `versionCode` musi być wyższy niż poprzedno

### "Oczekiwanie aż pojawi się upload"

- Poczekaj 1-2 minuty
- Odśwież stronę

### "Nie mogę znaleźć `.aab`"

- Sprawdź ścieżkę: `c:\Projekt\moja-aplikacja-finansowa\android\app\release\`
- Jeśli nie ma, uruchom ponownie: Build → Build Bundle(s)

---

## 📋 Checklist przed wysłaniem

- ✅ Build się skompilował bez błędów (0 warnings)
- ✅ Plik `.aab` istnieje (~30-50 MB)
- ✅ Wrzucony do Google Play Console
- ✅ Release notes uzupełnione
- ✅ Testerzy dodani
- ✅ Oczekiwanie na publikację (~10-15 min)

---

## 🎉 Gotowe!

Po 10-15 minutach aplikacja będzie dostępna dla testerów w Play Store!

Masz pytania? 🚀
