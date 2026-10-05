# SDK ZĪLE – Sporta Deju Kluba Mājaslapa & Vadības Sistēma

Modernizēta, responsīva un augstas veiktspējas tīmekļa platforma sporta deju klubam **SDK "Zīle"** (Mālpils & Sigulda, dibināts 1995. gadā). Projekts apvieno modernu **React 18** priekšgalu ar jaudīgu **Laravel 12/13** aizmugursistēmu, relāciju datubāzi un vienotu vietējo **HTTPS** izstrādes starpniekserveri (reverse proxy).

---

## 🏗️ Tehnoloģiskā Arhitektūra

Projekts veidots kā mūsdienīga pilna cikla (full-stack) hibrīdlietotne:

```
                  ┌────────────────────────────────────────┐
                  │   Klienta Pārlūks (HTTPS :8443)        │
                  └───────────────────┬────────────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │   ssl-proxy.js (:8443)  │
                         │ (Vienotais HTTPS Proxy) │
                         └─────┬──────────────┬────┘
                               │              │
      Vite HMR & Aktīvi        │              │ API & Lapu Pieprasījumi
      (/resources, /src, ws)   │              │ (/, /api/*, /uploads/*)
                               ▼              ▼
                    ┌────────────────┐  ┌──────────────────┐
                    │  Vite Dev (:5173)│  │ Laravel (:8000)  │
                    │  React 18 SPA  │  │ PHP 8.3+ Eloquent│
                    └────────────────┘  └────────┬─────────┘
                                                 │
                                                 ▼
                                        ┌──────────────────┐
                                        │  SQLite / MySQL  │
                                        │ (Sacensības &    │
                                        │  Rezultāti, Foto)│
                                        └──────────────────┘
```

* **Priekšgals (Frontend):**
  * **React 18** un **Vite 6** ar ātro moduļu aizstāšanu (HMR).
  * **Tailwind CSS** ar pielāgotu dizaina sistēmu (*Cinzel* un *Plus Jakarta Sans* fonti, zelta/šampanieša akcenti, elegants tumšais un gaišais režīms).
  * **Lucide Icons** vektorgrafikas ikonas un responsīvas animācijas.
* **Aizmugursistēma (Backend):**
  * **Laravel 12/13** (PHP 8.3+) REST API servisi.
  * **Eloquent ORM** relāciju modeļi sacensībām, rezultātiem un foto arhīvam.
  * Automātiska vēsturisko WordPress augšupielāžu un bilžu apjomu (`web_volumes`) servēšana.
* **Tīkls un Drošība:**
  * **HTTPS Reverse Proxy (`ssl-proxy.js`):** Piedāvā vienotu lokālo un lokālā tīkla piekļuvi (`https://localhost:8443` un `https://10.90.0.50:8443`) ar uzticamiem `mkcert` sertifikātiem.

---

## 📁 Pašreizējā Projekta Struktūra

```text
SDKZile/
├── app/                              # Laravel lietojumprogrammas kodols
│   ├── Console/Commands/             # Artisan komandas (piem., ImportSdkData)
│   ├── Http/Controllers/Api/         # REST API kontrolieri
│   │   ├── CompetitionController.php # Sacensību un rezultātu CRUD API
│   │   └── PhotoController.php       # Galerijas un statistikas API
│   └── Models/                       # Eloquent relāciju datu modeļi
│       ├── Album.php                 # Foto albumu modelis
│       ├── Competition.php           # Sacensību modelis
│       ├── CompetitionResult.php     # Dejotāju pāru rezultātu modelis
│       ├── Photo.php                 # Atsevišķu fotoattēlu modelis
│       └── User.php                  # Lietotāju modelis
├── bootstrap/                        # Laravel palaišanas un pakotņu konfigurācija
│   ├── app.php                       # Lietotnes konfigurācija un middleware
│   └── providers.php                 # Servisu nodrošinātāji
├── config/                           # Laravel konfigurācijas faili (app, database, cors u.c.)
├── database/                         # Datubāzes slānis
│   ├── factories/                    # Testa datu fabrikas
│   ├── migrations/                   # Datu tabulu shēmas un migrācijas
│   └── seeders/                      # Sākotnējie datu aizpildītāji (Seeders)
│       ├── CompetitionSeeder.php     # Sacensību un pāru rezultātu imports
│       ├── PhotoSeeder.php           # Galerijas fotoattēlu imports
│       └── DatabaseSeeder.php        # Galvenais izpildes seederis
├── public/                           # Publiskā tīmekļa sakne
│   ├── images/                       # Statiskie attēli (hero, baneri, galerija, dejotāji)
│   ├── trainers/                     # Treneru fotogrāfijas
│   ├── .htaccess                     # Apache konfigurācija
│   ├── index.php                     # Laravel galvenais ieejas punkts
│   └── robots.txt                    # Meklētājprogrammu direktīvas
├── resources/                        # Lietotāja saskarnes (UI) pirmkods
│   ├── css/
│   │   └── app.css                   # Globālie stili un Tailwind direktīvas
│   ├── js/
│   │   ├── components/               # Modulārie React komponenti
│   │   │   ├── AboutSection.jsx      # Par klubu, vēsturi un sasniegumiem
│   │   │   ├── AdminPanel.jsx        # Pilns sacensību vadības un labošanas panelis
│   │   │   ├── CompetitionDetailModal.jsx # Sacensību ātrā apskata modālis
│   │   │   ├── CompetitionDetailPage.jsx  # Detalizēta sacensību rezultātu lapa
│   │   │   ├── CompetitionsView.jsx  # Sacensību arhīvs ar filtriem un meklēšanu
│   │   │   ├── ContactSection.jsx    # Kontakti, rekvizīti un pieteikšanās forma
│   │   │   ├── DancersSection.jsx    # Dejotāju pāru vizītkartes un sasniegumi
│   │   │   ├── Footer.jsx            # Kājene ar saitēm un rekvizītiem
│   │   │   ├── GallerySection.jsx    # Foto galerija ar kategoriju filtru
│   │   │   ├── Hero.jsx              # Dinamisks sākumlapas galvenais baneris
│   │   │   ├── Navbar.jsx            # Navigācija, ritināšana un motīva pārslēgs
│   │   │   ├── ProgramsSection.jsx   # Deju apmācības un treniņu programmas
│   │   │   ├── RecentCompetitions.jsx# Jaunāko sacensību kopsavilkums sākumlapā
│   │   │   ├── ThemeToggle.jsx       # Tumšā / Gaišā režīma pārslēdzējs
│   │   │   └── WeddingDanceSection.jsx # Kāzu deju nodarbību sadaļa
│   │   ├── App.jsx                   # Galvenā React lietotnes sakne un maršrutēšana
│   │   ├── main.jsx                  # React DOM inicializācija
│   │   └── index.css                 # Pielāgotie stili, fonti un animācijas
│   └── views/
│       └── app.blade.php             # Laravel Blade šablons ar @vite integrāciju
├── routes/                           # Maršrutēšanas definīcijas
│   ├── api.php                       # REST API maršruti (/api/competitions, /api/photos)
│   ├── console.php                   # Komandrindas maršruti
│   └── web.php                       # SPA maršruts un /wp-content/uploads/ apstrāde
├── server/                           # Datu bāzes JSON faili un rezerves serveris
│   ├── data/
│   │   ├── all_photos.json           # Vēsturiskie foto dati
│   │   └── competitions.json         # Visi apkopotie sacensību un pāru dati
│   └── server.js                     # Standalone Express API serveris
├── ssl/                              # SSL un drošības konfigurācijas
│   ├── mkcert.exe                    # Vietējo CA sertifikātu ģenerators
│   └── openssl.cnf                   # Sertifikātu pieprasījumu konfigurācija
├── storage/                          # Laravel kešatmiņa, sesijas un žurnāli (logs)
├── tests/                            # Automatizētie testi (Unit & Feature)
├── install-ssl.bat                   # Skripts uzticamo lokālo HTTPS sertifikātu instalēšanai
├── package.json                      # Node atkarības un palaides skripti
├── composer.json                     # PHP un Laravel pakotņu atkarības
├── tailwind.config.js                # Tailwind CSS krāsu un fontu konfigurācija
├── vite.config.js                    # Vite 6 + Laravel spraudņa konfigurācija
├── ssl-proxy.js                      # Universālais HTTPS lokālais starpniekserveris
└── .gitignore                        # Versiju kontroles izņēmumu saraksts
```

---

## 🌟 Galvenās Funkcijas

### 1. Publiskā Vietne
* **Dizains & Identitāte:** Šampanieša zelta un tumšo toņu vizuālā estētika, kas radīta sporta deju pasaulei.
* **Tumšā un Gaišā Režīma Atbalsts:** Lietotājam draudzīgs motīvu pārslēdzējs ar automātisku sistēmas stāvokļa nolasīšanu un izvēles saglabāšanu pārlūkā.
* **Sacensību un Rezultātu Centrs:**
  * Ātrā meklēšana un filtrēšana pēc gada, mēneša, kategorijas vai norises vietas.
  * Detalizēts rezultātu skats pa vecuma grupām un klasēm (Bērni, Juniori, Jaunieši, Pieaugušie).
  * Godalgotās vietas, fināla atzīmes un treneru komentāri.
* **Mirkļu Galerija:** Fotoattēlu pārlūks ar kategoriju atlasi (Sacensības, Treniņi, Nometnes, Vēsture).
* **Deju Programmas & Kāzu Dejas:** Detalizēts nodarbību apraksts un tiešsaistes pieteikšanās.

### 2. Administratora Vadības Panelis (`/admin`)
* **Droša Piekļuve:** Aizsargāta administrācijas ieeja ar paroli (noklusētā demo parole: `zile2026`).
* **Sacensību Pārvaldība:**
  * Jaunu sacensību izveide ar vāka attēla, apraksta, vietas un datuma pievienošanu.
  * Interaktīvs rezultātu konstruktors — ātra pāru, klašu un vietu pievienošana/rediģēšana.
  * Esošo sacensību labošana un dzēšana ar tūlītēju sinhronizāciju datubāzē.

---

## 🚀 Kā Uzstādīt un Palaist Projektu

### 1. Priekšnosacījumi
* **PHP** 8.3 vai jaunāka versija
* **Composer**
* **Node.js** 18+ un **npm**

### 2. Atkarību Instalācija
```bash
# Instalē PHP atkarības
composer install

# Instalē JavaScript atkarības
npm install
```

### 3. Vides Konfigurācija un Datubāze
```bash
# Izveidojiet lokālo .env failu
copy .env.example .env

# Saģenerējiet lietotnes šifrēšanas atslēgu
php artisan key:generate

# Palaidiet datubāzes migrācijas un aizpildiet datus
npm run migrate
npm run seed
```

### 4. Lokālā HTTPS Uzticamā Sertifikāta Sagatavošana (Vienreizēji)
Lai nodrošinātu uzticamu HTTPS bez pārlūka drošības brīdinājumiem:
* Palaidiet `install-ssl.bat` un apstipriniet Windows drošības dialogu.

### 5. Lietotnes Palaišana
```bash
# Palaiž pilnu servisu steku vienā komandā (Laravel + Vite + HTTPS Proxy):
npm run dev
```

Piekļuves adreses:
* **Vienotais izstrādes starpniekserveris (lokāli & lokālajā tīklā):**
  * **HTTP:** [http://localhost:8080/](http://localhost:8080/) vai `http://<JŪSU-IP>:8080/`
  * **HTTPS:** [https://localhost:8443/](https://localhost:8443/) vai `https://<JŪSU-IP>:8443/`
* **Vite tiešais serveris:** [http://localhost:5173/](http://localhost:5173/)
* **Laravel tiešais serveris:** [http://localhost:8000/](http://localhost:8000/)
* **API pārbaude (Health check):** [http://localhost:8080/api/health](http://localhost:8080/api/health) vai [https://localhost:8443/api/health](https://localhost:8443/api/health)

---

## 🛠️ Pieejamie Skripti

| Komanda | Apraksts |
| :--- | :--- |
| `npm run dev` | Vienlaicīgi palaiž Laravel (`:8000`), Vite (`:5173`) un vienoto HTTP/HTTPS starpniekserveri (`:8080` & `:8443`) |
| `npm run dev:http` | Palaiž Laravel un Vite bez starpniekservera |
| `npm run client` | Palaiž tikai Vite izstrādes serveri |
| `npm run serve` | Palaiž tikai Laravel iebūvēto serveri (`php artisan serve`) |
| `npm run proxy` | Palaiž tikai vienoto HTTP/HTTPS starpniekserveri (`ssl-proxy.js`) |
| `npm run build` | Izveido optimizētu produkcijas būvējumu |
| `npm run migrate` | Izpilda datubāzes migrācijas |
| `npm run seed` | Aizpilda sacensību un foto datus datubāzē |
| `npm run import` | Izsauc Artisan datu importēšanas komandu (`php artisan sdk:import`) |

---

## 🔐 Administratora Piekļuve

1. Vietnes navigācijas joslā vai kājenē noklikšķiniet uz pogas **Admin**.
2. Ievadiet paroli: `zile2026`.
3. Pārvaldiet sacensības, pievienojiet jaunus sasniegumus vai labojiet datus tiešsaistē!
