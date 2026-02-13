# 🔥 Instrukcja konfiguracji Firebase

## 📦 Co jest już gotowe w kodzie:
✅ Firebase inicjalizacja
✅ Firestore połączenie
✅ Firebase Storage połączenie
✅ Firebase Authentication
✅ Kod do uploadu plików

## ⚙️ Co musisz zrobić w Firebase Console:

### 1️⃣ Firebase Storage - włączenie i reguły

1. **Wejdź do Firebase Console:**
   - https://console.firebase.google.com/
   - Wybierz projekt: `myfinanceapp-e2a0c`

2. **Włącz Storage:**
   - W menu po lewej stronie kliknij **"Storage"** (ikona folderu 📁)
   - Jeśli Storage nie jest włączony, kliknij **"Get started"**
   - Wybierz lokalizację (najlepiej tę samą co Firestore)

3. **Ustaw reguły bezpieczeństwa Storage:**
   - Przejdź do zakładki **"Rules"** w górnym menu
   - Usuń domyślne reguły
   - Skopiuj i wklej reguły z pliku `firebase-storage.rules`
   - Kliknij **"Publish"** (Opublikuj)

**Co robią te reguły:**
- ✅ Tylko zalogowani użytkownicy mogą uploadować pliki
- ✅ Każdy użytkownik ma dostęp tylko do swoich plików
- ✅ Maksymalny rozmiar pliku: 10 MB
- ✅ Tylko obrazy (JPG, PNG) i PDF
- ✅ Użytkownik może usuwać tylko swoje pliki

---

### 2️⃣ Firestore Database - reguły (opcjonalne)

1. **Przejdź do Firestore:**
   - W menu po lewej kliknij **"Firestore Database"**

2. **Ustaw reguły bezpieczeństwa:**
   - Przejdź do zakładki **"Rules"**
   - Skopiuj i wklej reguły z pliku `firestore.rules`
   - Kliknij **"Publish"**

**Co robią te reguły:**
- ✅ Tylko zalogowani użytkownicy mogą dodawać płatności
- ✅ Każdy użytkownik widzi tylko swoje płatności
- ✅ Użytkownik może edytować/usuwać tylko swoje płatności

---

## 🧪 Test - jak sprawdzić czy działa:

1. **Uruchom aplikację:**
   ```bash
   npm start
   ```

2. **Zaloguj się do aplikacji**

3. **Dodaj nową płatność:**
   - Kliknij "Dodaj płatność"
   - Wypełnij formularz
   - **Dodaj załącznik** (PDF lub zdjęcie)
   - Zapisz

4. **Sprawdź w Firebase Console:**
   - Przejdź do **Storage** w Firebase Console
   - Powinieneś zobaczyć folder: `payments/{twoje-user-id}/`
   - W tym folderze będzie Twój załącznik

5. **Sprawdź w aplikacji:**
   - Po zapisaniu płatności, powinieneś zobaczyć przycisk "📎 nazwa_pliku"
   - Kliknięcie powinno otworzyć plik w nowej karcie

---

## 🐛 Rozwiązywanie problemów:

### Problem: "Firebase Storage: User does not have permission"
**Rozwiązanie:** Sprawdź czy:
- Storage jest włączony w Firebase Console
- Reguły są poprawnie ustawione i opublikowane
- Jesteś zalogowany w aplikacji

### Problem: Plik nie uploaduje się
**Rozwiązanie:**
- Sprawdź rozmiar pliku (max 10 MB)
- Sprawdź format (tylko JPG, PNG, PDF)
- Sprawdź konsolę przeglądarki (F12) czy są błędy

### Problem: Nie widzę pliku w Storage
**Rozwiązanie:**
- Odśwież stronę w Firebase Console
- Sprawdź czy płatność została dodana do Firestore
- Sprawdź strukturę: `payments/{userId}/{timestamp}_nazwapliku`

---

## 💰 Koszty Firebase Storage:

**Firebase Spark Plan (darmowy):**
- ✅ 5 GB przestrzeni dyskowej
- ✅ 1 GB transferu dziennie
- ✅ 20,000 operacji upload/dzień
- ✅ 50,000 operacji download/dzień

**To wystarczy na:**
- ~500-1000 użytkowników
- ~5000-10000 załączników (przy średniej 1 MB każdy)
- Normalne użytkowanie przez wiele miesięcy

**Jeśli przekroczysz limity:** Firebase automatycznie przełączy się na plan płatny, ale **musisz to ręcznie włączyć** w ustawieniach - więc nie ma ryzyka niespodziewanych kosztów.

---

## ✅ Checklist:

- [ ] Storage włączony w Firebase Console
- [ ] Reguły Storage ustawione i opublikowane
- [ ] Reguły Firestore zaktualizowane (opcjonalne)
- [ ] Aplikacja uruchomiona (`npm start`)
- [ ] Test uploadu załącznika wykonany
- [ ] Plik widoczny w Firebase Console Storage

---

**Po wykonaniu tych kroków wszystko będzie działać! 🚀**
