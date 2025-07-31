# 📝 Encrypted Journal App

A privacy-first journaling platform where users can write, encrypt, and store their journals securely. All journal entries are encrypted in the browser using the Web Crypto API before being sent to the backend, which never sees any unencrypted content.

---
### 🏠 Home Page
![Home](./public/screenshots/home.png)


## 🧱 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router
- i18n
- Web Crypto API (AES-GCM encryption)
- IndexedDB (offline storage)

### Backend
- Laravel (REST API for encrypted journal storage)

---

## 🔐 Encryption Flow

1. **Key Derivation**
   - A secure key is derived from the user's password using PBKDF2.

2. **Encryption**
   - Journal entries are encrypted using AES-GCM in the browser.


4. **Syncing**
   - Encrypted data is sent to the Laravel backend via API.

5. **Decryption**
   - Only the client holds the key and can decrypt the journals.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git 'https://github.com/ibada13/OnlyYoursJournal'
cd encrypted-journal-app
```

### 2. Install frontend dependencies

```bash
pnpm install
```

### 3. Start the frontend dev server

```bash
pnpm dev
```

### 4. Set up Laravel backend

```bash
cd backend
cp .env.example .env
composer install
php artisan migrate
php artisan serve
```

---

## 🌍 Localization

- Uses `i18next` for multilingual support (e.g., English, Arabic)
- Add translation files in `src/assets/`

---

## 🧪 Build for Production

```bash
pnpm build
```

Output will be in the `dist/` folder.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

