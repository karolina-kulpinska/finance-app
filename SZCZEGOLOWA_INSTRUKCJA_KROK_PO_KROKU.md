# 📱 INSTRUKCJA KROK PO KROKU - Budowanie i Wrzucanie do Google Play

## ✅ CZĘŚĆ 1: ANDROID STUDIO - Budowanie Bundle'a

### Krok 1: Synchronizacja (PowerShell)

**Gdzie:** Otwórz PowerShell (lub Command Prompt)

```powershell
cd c:\Projekt\moja-aplikacja-finansowa
npm run cap:sync
```

**Co czekać:**

- Pojawi się tekst: `Copying web assets...`
- Na końcu: `✓ Copying web assets from build to android`

---

### Krok 2: Otwórz Android Studio

**W PowerShell:**

```powershell
npm run cap:open:android
```

**Czekaj:** Android Studio otworzy się automatycznie (1-2 minuty)

**Jeśli się nie otworzy:**

1. Otwórz Android Studio (ikonka na pulpicie)
2. **File** → **Open**
3. Wyszukaj: `c:\Projekt\moja-aplikacja-finansowa\android`
4. Kliknij: **OK**

---

### Krok 3: Android Studio się ładuje

**Czekaj:** Projekt się ładuje (~2-3 minuty)

Zobaczysz:

- Lewa strona: drzewo folderów (`android`, `app`, `src` itd.)
- Górę: menu (`File`, `Edit`, `Build` itd.)
- Środek: kod projektu

---

### Krok 4: Budowanie Bundle'a

**Górne menu:**

1. Kliknij: **Build**
2. Kliknij: **Build Bundle(s) / APK(s)**

**Pojawi się okno "Select Build Variant"**

1. Upewnij się że jest zaznaczone: **release** (powinno być domyślnie)
2. Kliknij: **Create**

**Czekaj:** 5-10 minut (Android Studio kompiluje)

Zobaczysz pasek postępu na dole.

---

### Krok 5: Potwierdzenie

**Po skończeniu pojawi się okno:**

```
Build Complete: Finished 'bundleRelease' in X minutes
```

**Kliknij:** **Locate** lub **Show in Explorer**

Plik `.aab` będzie w:

```
c:\Projekt\moja-aplikacja-finansowa\android\app\release\app-release.aab
```

**Skopiuj ścieżkę** (będzie Ci potrzebna za chwilę!)

---

## ✅ CZĘŚĆ 2: GOOGLE PLAY CONSOLE - Wrzucanie Bundle'a

### Krok 1: Zaloguj się do Google Play Console

**URL:** https://play.google.com/console

1. Otwórz stronę
2. Kliknij: **Sign in** (lub zaloguj się jeśli pytanie)
3. Wybiercę email: `kulpinska.karolinaa@gmail.com` (lub Twój admin email)
4. Wpisz hasło

---

### Krok 2: Wybierz aplikację

**Na głównej stronie:**

1. Zobaczysz listę aplikacji
2. Szukaj: **Mój Smart Budget**
3. Kliknij na nią

**Powinieneś zobaczyć panel aplikacji**

---

### Krok 3: Przejdź do Internal Testing

**Po lewej stronie menu:**

1. Zjedź do: **Testuj i publikuj**
2. Kliknij: **Internal testing**

**Powinieneś zobaczyć tekst:**

```
Internal testing
Nieopublikowane wydania
```

---

### Krok 4: Utwórz nowe wydanie

**Przycisk w górze:**

1. Kliknij: **Utwórz wydanie**

**Pojawi się okno "Create release"**

---

### Krok 5: Wrzuć plik .aab

**W oknie "Create release":**

1. **Sekcja "Aplikacja"** - zobaczysz pusty obszar
2. Kliknij: **Przeglądaj pliki** (lub przeciągnij plik)
3. **Wyszukaj plik:**
   ```
   c:\Projekt\moja-aplikacja-finansowa\android\app\release\app-release.aab
   ```
4. Kliknij plik: **app-release.aab**
5. Kliknij: **Otwórz**

**Czekaj:** Plik się uploaduje (1-2 minuty)

**Powinna pojawić się zielona informacja:**

```
✓ App bundle successfully uploaded
```

---

### Krok 6: Wersja i Release Notes

**W tym samym oknie:**

1. **Version name:** Wpisz

   ```
   1.0.0
   ```

2. **Release notes (What's new in this version?):**
   ```
   Pierwsza wersja testowa
   - Integracja Google Play Billing
   - Możliwość kupienia planu Pro
   - Poprawki graficzne
   ```

---

### Krok 7: Zapisz

**Przycisk na dole:**

1. Kliknij: **Zapisz**

**Czekaj:** Zmiany się zapisują

---

### Krok 8: Przegląd i publikacja

**Po zapisaniu:**

1. Pojawi się przycisk: **Przegląd i publikacja**
2. Kliknij go

**Pojawi się checklist (powinno być wszystko zielone):**

```
✓ Aplikacja
✓ Zawartość z oceną wiekową
✓ Dane dotyczące treści
✓ Ceny i dystrybucja
```

**Jeśli coś jest czerwone - przeczytaj co trzeba uzupełnić i uzupełnij!**

---

### Krok 9: Publikuj

**Na dole okna:**

1. Kliknij: **Publikuj**

**Pojawi się potwierdzenie:**

```
Wydanie opublikowane
```

**Czekaj:** ~10-15 minut

---

## ✅ CZĘŚĆ 3: Dodaj Testerów

### Krok 1: Wróć do Internal Testing

**Po lewej stronie:**

1. Kliknij: **Internal testing** (już tam jesteś pewnie)

---

### Krok 2: Sekcja Testerów

**Zjedź w dół i szukaj:**

```
Testerzy
```

Zobaczysz: **Utwórz listę testerów** lub **Edytuj**

---

### Krok 3: Dodaj emaile

**Kliknij: Utwórz listę testerów**

1. **E-maile testerów:** Wpisz (każdy w nowej linii)
   ```
   kulpinska.karolinaa@gmail.com
   ```
2. Jeśli więcej osób testuje, dodaj:

   ```
   osoba2@gmail.com
   osoba3@gmail.com
   ```

3. Kliknij: **Zapisz**

---

### Krok 4: Testerzy dostaną email

**Co dalej:**

- Testerzy dostaną email z linkiem do instalacji
- Na ich Play Store pojawi się: **Mój Smart Budget (Test Build)**
- Mogą pobrać i testować

---

## ✅ CZĘŚĆ 4: Testowanie na Telefonie

### Krok 1: Zaloguj się w Play Store

Na telefonie testera:

1. Otwórz **Google Play**
2. Zaloguj się emailem: `kulpinska.karolinaa@gmail.com`
3. Szukaj: **Mój Smart Budget**

Powinna pojawić się wersja testowa!

---

### Krok 2: Instalacja

1. Kliknij: **Zainstaluj**
2. Czekaj aż się zainstaluje
3. Kliknij: **Otwórz**

---

### Krok 3: Test funkcjonalności

1. Zaloguj się (email z `.env` z uprawnieniami pro)
2. Przejdź do: **Profil** → **Zarządzaj subskrypcją**
3. Powinno być: **Przycisk "Ulepsz do Pro"**
4. Kliknij go
5. Powinna być możliwość kupienia (bez rzeczywistej płatności w testach)

---

## ⏰ CO DALEJ? (Po 14 dniach)

### Utwórz Subskrypcję w Google Play Console

**W Google Play Console:**

1. **Zarabiaj** → **Produkty w aplikacji**
2. Kliknij: **Utwórz subskrypcję** (lub "Nowy produkt" → "Subskrypcja")

**Uzupełnij:**

- **Nazwa:** Pro Plan
- **Identyfikator produktu:** `pro_plan_monthly`
- **Cena:** 9.99 zł (lub Twoja cena)
- **Okres rozliczeniowy:** 1 miesiąc
- **Okres próbny:** 7 dni (opcjonalnie)

Kliknij: **Utwórz**

### Opublikuj na Produkcję

1. Wróć do: **Internal testing** → **Production**
2. Kliknij: **Utwórz wydanie**
3. Wrzuć ten sam plik `.aab`
4. Kliknij: **Publikuj**

Google zweryfikuje ~24-48 godzin i opublikuje dla wszystkich!

---

## ❓ PROBLEMY?

### Problem: "Brak uprawnienia do aplikacji"

- Upewnij się że jesteś zalogowany na właściwy email
- Spam folder - sprawdzić czy email z zaproszeniem tam nie wylądował

### Problem: Layout wygląda inaczej

- Google zmienia interfejs
- Szukaj sekcji: "Internal testing", "Products", "Release"

### Problem: Build nie chce się skompilować

- Sprawdzić logi w Android Studio (dół ekranu)
- Spróbować: **Build** → **Clean Project**

### Problem: Plik `.aab` jest zbyt mały lub pusty

- Skompiluj ponownie Bundle
- Sprawdź czy wszystko się skompilowało bez błędów

---

## ✅ CHECKLIST

- ☐ Android Studio zainstalowany
- ☐ `npm run cap:sync` wykonany
- ☐ Bundle `.aab` zbudowany
- ☐ Plik `.aab` wrzucony do Google Play Console
- ☐ Release notes uzupełnione
- ☐ Wydanie opublikowane na Internal testing
- ☐ Testerzy dodani
- ☐ Oczekiwanie ~15 minut na publikację
- ☐ Testowanie na telefonie
- ☐ GOTOWE! 🎉

---

## 🎉 Powodzenia!

Aplikacja będzie dostępna dla testerów w Play Store za ~15 minut! 📱
