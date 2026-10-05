# SDK ZĪLE – Sporta Deju Kluba Mājaslapas Redizains & Sacensību Vadības Sistēma

Modernizēta, responsīva un eleganta tīmekļa vietne sporta deju klubam **SDK "Zīle"** (Mālpils & Sigulda, dibināts 1995. gadā) ar integrētu sacensību rezultātu vadības paneli.

---

## 🌟 Galvenās Iezīmes

### 1. Jauns, Mūsdienīgs Vizuālais Tēls (Public Site)
* **Ballroom & Latin Elegance:** Dziļi tumši toņi apvienojumā ar šampanieša zelta akcentiem, dinamisku tipogrāfiju (*Plus Jakarta Sans* un *Cinzel*).
* **Motto & Vēsture:** Saglabāts kluba vēsturiskais sauklis (*"DEJA IR KUSTĪBA, BET KUSTĪBA IR PATI DZĪVE"*), stāsts par klubu kopš 1995. gada Mālpilī un Siguldā.
* **Treneru vizītkartes:** Iveta Zīle (vadītāja, LSDF tiesnese) un Uģis Putniņš (LSDF treneris).
* **Deju Programmas:** Bērnu iesācēju grupas, sporta deju izlase (Standarts & Latīņamerika), fiziskā sagatavotība un vasaras nometnes.
* **Kāzu Dejas:** Īpaša sadaļa jaunlaulātajiem ar tiešsaistes pieteikšanās formu un mūzikas/horeogrāfijas piedāvājumu.
* **Mirkļu Galerija:** Kategorizēta fotogalerija ar pilnekrāna skatītāju.
* **Kontakti & Norēķinu Rekvizīti:** Tiešs zvans, WhatsApp poga, Swedbank rekvizīti un interaktīva pieteikšanās anketa.

### 2. Administratora Panelis Sacensību Pievienošanai (`/admin`)
* **Pieslēgšanās:** Aizsargāta administratora pieeja (demo parole: `zile2026`).
* **Sacensību Reģistrācija:**
  * Sacensību nosaukums, datums, norises vieta un kategorija (*Reitings, Latvijas Kauss, Čempionāts, Kausa izcīņa*).
  * Vāka attēla izvēle ar ātrajiem ieteikumiem.
  * Īss kopsavilkums sākumlapas kartītēm un plašāka treneru atsauksme.
* **Dejotāju Pāru Rezultātu Konstruktors:**
  * Dinamiski pievienojiet dejotāju pārus (piem., *Mārtiņš B. & Madara O.*).
  * Vecuma grupa un klase (piem., *Juniori II C*, *Bērni I E4*, *Jaunieši A*).
  * Iegūtā vieta un medaļas nozīmīte (🥇 Zelts, 🥈 Sudrabs, 🥉 Bronza, Fināls).
* **Datu Sinhronizācija:** Dati tiek saglabāti `server/data/competitions.json` un automātiski parādās sākumlapā un sasniegumu arhīvā.

---

## 🚀 Kā Palaist Projektu

### Vienlaicīga servera un klienta palaišana:
```bash
npm run dev
```
* **Publiskā vietne:** [http://localhost:5173/](http://localhost:5173/)
* **Aizmugursistēmas API:** [http://localhost:3001/api/competitions](http://localhost:3001/api/competitions)

### Atsevišķas komandas:
* `npm run client` – palaiž tikai Vite priekšgalu
* `npm run server` – palaiž tikai Express API serveri
* `npm run build` – sagatavo optimizētu produkcijas būvējumu (`dist/`)

---

## 🔐 Administratora Piekļuve

1. Vietnes galvenē vai kājenē noklikšķiniet uz pogas **Admin**.
2. Ievadiet paroli: `zile2026`.
3. Pārvaldiet sacensības, pievienojiet jaunas vai rediģējiet esošās!
