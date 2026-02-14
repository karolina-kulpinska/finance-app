# 🔥 Struktura Firebase dla Aplikacji Finansowej

## 📋 Obecna struktura (już istniejąca)

### Firestore Collections:

```
users/
  └── {userId}/
      └── payments/
          └── {paymentId}
              ├── name: string
              ├── amount: number
              ├── date: string
              ├── category: string (bills/shopping/other)
              ├── priority: string (high/normal/low)
              ├── paid: boolean
              ├── notes: string
              ├── attachmentUrl: string
              ├── attachmentName: string
              ├── bank: string (opcjonalne - revolut/mbank/ing/pko/millennium/santander/alior/credit_card/blik/cash/other)
              ├── paymentType: string (opcjonalne - installments/bills/shopping/insurance/other)
              ├── isInstallment: boolean (opcjonalne)
              ├── installmentInfo: object (opcjonalne)
              │   ├── current: number
              │   ├── total: number
              │   └── originalName: string
              ├── isRecurring: boolean (opcjonalne - dla ubezpieczeń)
              ├── policyNumber: string (opcjonalne - dla ubezpieczeń)
              └── accountNumber: string (opcjonalne - dla rachunków)
```

### Firebase Storage:
```
payments/
  └── {userId}/
      └── {paymentId}/
          └── {filename} (PDF lub zdjęcie)
```

---

## ✨ NOWE STRUKTURY DO DODANIA

### 1. **Listy zakupów** (Shopping Lists)

Dodaj nową kolekcję w Firestore:

```
users/
  └── {userId}/
      └── shoppingLists/
          └── {listId}
              ├── name: string
              ├── totalPrice: number
              ├── receiptUrl: string (opcjonalne)
              ├── receiptName: string (opcjonalne)
              ├── createdAt: timestamp
              └── items: array [
                  {
                    id: string,
                    name: string,
                    price: number
                  }
              ]
```

**Firebase Storage dla paragonów:**
```
shopping-lists/
  └── {userId}/
      └── {listId}/
          └── receipt.{pdf|jpg|png}
```

### 2. **Ustawienia użytkownika** (User Settings)

Dodaj dokument dla każdego użytkownika:

```
users/
  └── {userId}/
      └── settings (dokument)
          ├── displayName: string
          ├── email: string (read-only)
          ├── notifications: object {
          │   ├── enabled: boolean
          │   ├── emailNotifications: boolean
          │   └── pushNotifications: boolean
          │ }
          ├── theme: object {
          │   ├── colorScheme: string (light/dark)
          │   └── accentColor: string
          │ }
          └── backup: object {
              ├── lastBackup: timestamp
              └── autoBackup: boolean
          }
```

---

## 🔐 Firestore Security Rules

Zaktualizuj plik `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Podstawowe funkcje
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Płatności (już istniejące)
    match /users/{userId}/payments/{paymentId} {
      allow read, write: if isOwner(userId);
    }
    
    // NOWE: Listy zakupów
    match /users/{userId}/shoppingLists/{listId} {
      allow read, write: if isOwner(userId);
      allow create: if isOwner(userId) 
                    && request.resource.data.keys().hasAll(['name', 'totalPrice', 'createdAt', 'items']);
    }
    
    // NOWE: Ustawienia użytkownika
    match /users/{userId}/settings {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) 
                   && (!request.resource.data.keys().hasAny(['email'])); // email nie może być zmieniony
    }
  }
}
```

---

## 📦 Firebase Storage Rules

Zaktualizuj Storage Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Płatności - załączniki (już istniejące)
    match /payments/{userId}/{paymentId}/{filename} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024 // max 10MB
                   && (request.resource.contentType.matches('image/.*') 
                       || request.resource.contentType == 'application/pdf');
    }
    
    // NOWE: Listy zakupów - paragony
    match /shopping-lists/{userId}/{listId}/{filename} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 10 * 1024 * 1024 // max 10MB
                   && (request.resource.contentType.matches('image/.*') 
                       || request.resource.contentType == 'application/pdf');
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🚀 Jak wdrożyć zmiany

### 1. Zaktualizuj Firestore Rules:
```bash
firebase deploy --only firestore:rules
```

### 2. Zaktualizuj Storage Rules:
```bash
firebase deploy --only storage
```

### 3. Nie trzeba ręcznie tworzyć kolekcji!
Firestore automatycznie utworzy kolekcje `shoppingLists` i `settings` gdy pierwsza aplikacja zapisze tam dane.

---

## 📝 Przykładowe zapytania w kodzie

### Dodawanie listy zakupów:
```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const addShoppingList = async (userId, listData) => {
  const listRef = collection(db, 'users', userId, 'shoppingLists');
  await addDoc(listRef, {
    name: listData.name,
    totalPrice: listData.totalPrice,
    items: listData.items,
    createdAt: new Date(),
  });
};
```

### Pobieranie list zakupów:
```javascript
import { collection, query, getDocs } from 'firebase/firestore';

const getShoppingLists = async (userId) => {
  const listsRef = collection(db, 'users', userId, 'shoppingLists');
  const q = query(listsRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```

### Upload paragonu:
```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const uploadReceipt = async (userId, listId, file) => {
  const storageRef = ref(storage, `shopping-lists/${userId}/${listId}/receipt.${file.name.split('.').pop()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
```

---

## ✅ Podsumowanie zmian

| Funkcja | Co dodać | Status |
|---------|----------|--------|
| Listy zakupów | Kolekcja `shoppingLists` w Firestore | ✅ Gotowe |
| Paragony | Folder `shopping-lists` w Storage | ✅ Gotowe |
| Ustawienia profilu | Dokument `settings` w Firestore | ✅ Gotowe |
| Security Rules | Zaktualizowane reguły | ⚠️ Wymaga wdrożenia |

---

## 🔒 Ważne uwagi bezpieczeństwa

1. **Limity rozmiaru**: Maksymalny rozmiar pliku to 10MB
2. **Typy plików**: Tylko PDF i obrazy (jpg, png, jpeg)
3. **Dostęp**: Tylko właściciel może czytać/pisać swoje dane
4. **Email**: Email użytkownika nie może być zmieniany z aplikacji (tylko przez Firebase Authentication)

---

**Data utworzenia**: 2026-02-14  
**Wersja**: 1.0
