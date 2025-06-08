# 📦 Telegram Session Generator & Group Checker

Project ini terdiri dari dua tools utama berbasis Node.js yang menggunakan library [GramJS (TelegramClient)](https://gram.js.org/). Keduanya dapat digunakan untuk:

1. 🔑 **Generate session Telegram (Telethon & Pyrogram)**
2. 📋 **Cek grup/channel apa saja yang kamu buat, lengkap dengan detailnya**

---

## 🗂 Struktur Proyek

```

.
├── .env
├── cek-group-channel-owner/
│   ├── cek.js
│   └── ...
├── generate-session/
│   ├── gen.js
│   └── ...
├── .env
└── README.md

````

---

## ⚙️ Persiapan Awal

1. **Clone repo ini:**
---
   ```bash
   git clone https://github.com/MbotixTech/telegram-session-group-checker.git
   cd telegram-session-group-checker
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Buat file `.env`:**

   ```env
     API_ID=25255939 # Replace with your actual API ID
     API_HASH=9e58c6ee7d1a44821aa5a2747f3b3d80 # Replace with your actual API ID and hash
     STRING_SESSION= your_string_session_here # Replace with your actual string session
   ```

---

## 🔐 Fitur 1: Generate Session (Telethon + Pyrogram)

📁 File: `generate-session/gen.js`

### Menjalankan:

```bash
node generate-session/gen.js
```

### Fitur:

* Login Telegram via nomor HP
* Mendukung OTP & 2FA
* Hasil:

  * `Telethon StringSession`
  * `Pyrogram V1`
  * `Pyrogram V2`
* Semua session dikirim ke Saved Messages

---

## 📊 Fitur 2: Cek Grup/Channel yang Kamu Buat

📁 File: `cek-group-channel-owner/cek.js`

### Menjalankan:

```bash
node cek-group-channel-owner/cek.js
```

### Fitur:

* Mendapatkan semua grup/channel yang kamu buat
* Menampilkan:

  * Nama & ID
  * Username
  * Tipe (Channel / Megagroup)
  * Jumlah Member
  * Service message pertama (misalnya grup dibuat, user ditambahkan)
* Output disimpan ke:

  * `group_list.txt` (format teks)
  * `group_list.csv` (format Excel/CSV)

---

## 📥 Contoh Output

```txt
🏷️  Nama         : MbotixTECH
🆔 ID            : 6666666
🔗 Username      : mbotixtech
📁 Tipe          : Megagroup
👑 Dibuat Olehmu : ✅
👥 Member        : 666
📜 Pesan Awal    : Grup dibuat: Grup Edukasi (06 Juni 2020)
───────────────────────────────
```

---

## 🧪 Catatan Tambahan

* Semua session hanya digunakan untuk keperluan pribadi / audit — jaga kerahasiaan data kamu.
* Tidak mendukung login OTP via bot, hanya nomor HP pribadi.
* Jika mengalami `FLOOD_WAIT`, script akan menunggu otomatis.

---

## 🧑‍💻 Kontribusi

Pull request, issue, dan saran sangat diterima. Jangan lupa kasih ⭐ kalau kamu merasa repo ini bermanfaat!

## 📄 License

MIT License — bebas digunakan untuk proyek pribadi & open source.
