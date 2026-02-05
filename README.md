# 🚀 RunClub Netlify - Gotowy Pakiet

## 📦 Co Jest w Środku?

Ten folder zawiera **wszystko** czego potrzebujesz do wdrożenia aplikacji RunClub na Netlify!

```
runclub-netlify-package/
├── index.html              ← Aplikacja (frontend)
├── netlify.toml            ← Konfiguracja Netlify
└── netlify/
    └── functions/
        └── strava-token.js ← Backend (serverless function)
```

---

## ⚡ SZYBKI START (5 MINUT)

### Opcja 1: Netlify Drop (Najłatwiejsza!)

1. **Edytuj `index.html`**
   - Otwórz w Notatniku
   - Znajdź `STRAVA_CONFIG` (Ctrl+F)
   - Wpisz swój `clientId` i `clubId` ze Strava

2. **Ustaw zmienne w pliku strava-token.js**
   - Otwórz `netlify/functions/strava-token.js`
   - Znajdź linię: `// const CLIENT_ID = 'TWÓJ_CLIENT_ID';`
   - Odkomentuj (usuń `//`) i wpisz swoje klucze:
   ```javascript
   const CLIENT_ID = '123456';
   const CLIENT_SECRET = 'abc123def456...';
   ```

3. **Wdróż na Netlify**
   - Wejdź na: https://app.netlify.com/drop
   - **Przeciągnij cały folder** `runclub-netlify-package`
   - Poczekaj 30 sekund
   - Gotowe! 🎉

4. **Zaktualizuj Strava API**
   - Wejdź na: https://www.strava.com/settings/api
   - Edytuj swoją aplikację
   - Wpisz URL z Netlify (np. `random-name.netlify.app`)

---

### Opcja 2: Netlify + GitHub (Zalecane dla Produkcji)

1. **Utwórz repozytorium GitHub**
   - Wejdź na https://github.com
   - Kliknij **New repository**
   - Nazwa: `runclub-app`
   - Wgraj wszystkie pliki z tego folderu

2. **Połącz z Netlify**
   - Wejdź na https://app.netlify.com
   - Kliknij **New site from Git**
   - Wybierz **GitHub** i repozytorium `runclub-app`

3. **Ustaw zmienne środowiskowe** (WAŻNE!)
   - W Netlify → Site settings → Environment variables
   - Dodaj:
     ```
     STRAVA_CLIENT_ID = 123456
     STRAVA_CLIENT_SECRET = abc123def456...
     ```

4. **Deploy!**
   - Netlify automatycznie wdroży
   - Każda zmiana w GitHub = automatyczny redeploy

---

## 🔧 Co Musisz Zmienić?

### W pliku `index.html`:

Znajdź sekcję `STRAVA_CONFIG` (około linia 48):

```javascript
const STRAVA_CONFIG = {
    clientId: 'TWÓJ_STRAVA_CLIENT_ID',    // ← ZMIEŃ NA SWÓJ!
    clubId: 'TWÓJ_CLUB_ID',                // ← ZMIEŃ NA SWÓJ!
    redirectUri: window.location.origin,
    scope: 'read,activity:read',
};
```

Zmień `DEMO_MODE` z `true` na `false` (około linia 54):

```javascript
const DEMO_MODE = false;  // ← ZMIEŃ NA false!
```

### W pliku `netlify/functions/strava-token.js`:

**OPCJA A - Dla testów (szybko, ale mniej bezpieczne):**

Odkomentuj linie 34-35 i wpisz swoje klucze:

```javascript
const CLIENT_ID = '123456';               // ← Twój Client ID
const CLIENT_SECRET = 'abc123def456...';  // ← Twój Client Secret
```

**OPCJA B - Dla produkcji (zalecane):**

Zostaw kod jak jest i ustaw zmienne w Netlify:
- Site settings → Environment variables
- Dodaj `STRAVA_CLIENT_ID` i `STRAVA_CLIENT_SECRET`

---

## 📝 Gdzie Wziąć Klucze?

### Client ID i Client Secret:

1. Wejdź na: https://www.strava.com/settings/api
2. Kliknij **"Create an App"**
3. Wypełnij:
   ```
   Application Name: RunClub Loyalty
   Category: Training
   Website: http://localhost
   Authorization Callback Domain: localhost
   ```
4. Skopiuj **Client ID** i **Client Secret**

### Club ID:

1. Przejdź do swojej grupy na Strava
2. URL będzie wyglądał tak: `https://www.strava.com/clubs/1234567`
3. Liczba na końcu = twój **Club ID**

---

## ✅ Checklist Przed Wdrożeniem

- [ ] Wpisałem Client ID w `index.html`
- [ ] Wpisałem Club ID w `index.html`
- [ ] Zmieniłem `DEMO_MODE` na `false`
- [ ] Ustawiłem klucze w `strava-token.js` LUB w Netlify env variables
- [ ] Wdrożyłem na Netlify
- [ ] Zaktualizowałem URL w Strava API settings
- [ ] Przetestowałem logowanie

---

## 🧪 Testowanie Lokalne (Opcjonalne)

Jeśli chcesz przetestować przed wdrożeniem:

### Zainstaluj Netlify CLI:

```bash
npm install -g netlify-cli
```

### Uruchom lokalnie:

```bash
cd runclub-netlify-package
netlify dev
```

Aplikacja uruchomi się na: http://localhost:8888

---

## 🆘 Rozwiązywanie Problemów

### Problem: "Invalid redirect_uri"

**Rozwiązanie:**
1. Sprawdź URL w Strava API
2. Upewnij się że format to: `nazwa.netlify.app` (bez https://)
3. W `index.html` `redirectUri` powinno być: `window.location.origin`

### Problem: "Missing Strava credentials"

**Rozwiązanie:**
1. Sprawdź czy ustawiłeś klucze w `strava-token.js` LUB
2. Sprawdź czy dodałeś zmienne środowiskowe w Netlify

### Problem: "Function not found"

**Rozwiązanie:**
1. Sprawdź czy struktura folderów jest poprawna
2. Upewnij się że `netlify.toml` jest w głównym folderze
3. Sprawdź logi w Netlify: Functions → Logs

### Problem: Aplikacja nie pokazuje wydarzeń

**Rozwiązanie:**
1. Sprawdź czy Club ID jest poprawny
2. Sprawdź czy masz wydarzenia w grupie Strava
3. Otwórz konsolę (F12) i sprawdź błędy

---

## 🎓 Co Dalej?

Po wdrożeniu:

1. **Dodaj siebie jako admina**
   - Zaloguj się do aplikacji
   - Otwórz konsolę (F12)
   - Wpisz: `JSON.parse(localStorage.getItem('currentUser')).stravaId`
   - Skopiuj ID
   - W `index.html` znajdź `adminUsers` i dodaj swoje ID

2. **Prześlij link uczestnikom**
   - URL z Netlify (np. `runclub-loyalty.netlify.app`)
   - Możesz też kupić własną domenę

3. **Stwórz wydarzenie w Stravie**
   - Aplikacja automatycznie je pobierze

4. **Zacznij weryfikować uczestników!**

---

## 📞 Potrzebujesz Pomocy?

Opisz problem dokładnie i powiedz mi:
1. Który krok wykonujesz?
2. Co dokładnie kliknąłeś/zrobiłeś?
3. Jaki błąd widzisz? (screenshot pomoże!)

---

## 🎉 Gratulacje!

Jesteś na dobrej drodze do wdrożenia aplikacji RunClub! 

**Powodzenia!** 🏃‍♂️☕
