### **Prompt untuk Agent LLM: Landing Page Development for Kahii Coffee Shop**

**Role:** Anda adalah seorang Senior Frontend Developer dan UI/UX Designer.
**Task:** Buatlah kode (React/Next.js dengan Tailwind CSS) untuk landing page satu halaman (single-page) sebuah coffeeshop bernama **Kahii**.

#### **1. Brand Identity & Design System**

Gunakan palet warna berikut secara konsisten (Prinsip Kontras & Hierarki):

- **Primary (Merah):** `#A21B2B` (Gunakan untuk Logo, Judul Utama, dan Tombol CTA).
- **Background (Krem):** `#F6EDDE` (Warna dasar halaman untuk kesan hangat dan bersih).
- **Secondary/Texture (Cokelat Kayu):** `#A47551` (Gunakan untuk aksen section atau background card).
- **Accent (Gold):** `#D4AF37` (Gunakan untuk ikon kecil, badge, atau highlight penawaran).
- **Text (Dark):** `#2D2D2D` (Teks utama agar mudah dibaca).
- **Neutral:** `#A8A9AB` (Gunakan untuk border halus atau teks sekunder).
- **Tipografi:** Gunakan kombinasi font _Serif_ yang elegan untuk judul (seperti Playfair Display) dan _Sans-serif_ yang modern untuk body text (seperti Montserrat atau Inter).

#### **Assets**

- static/kahi-logo.png
- static/kahi-logo-2.png

#### **2. Struktur Section Landing Page**

**A. Navbar (Sticky):**

- Logo: "KAHII" (Gunakan font bold merah).
- Menu: Home, Menu, Gallery, Hours, Contact.
- Button: "Reserve Now" (Outline merah).

**B. Hero Section:**

- **Headline:** "Sips & Bites to Start the Day Right."
- **Sub-headline:** "Your Day to Day Brews and Bites. Est 2024."
- **Background:** Gunakan placeholder image yang menggambarkan suasana kafe dengan pencahayaan hangat.
- **CTA:** Button "Explore Menu" (Solid Red) & "Find Us" (Outline).

**C. About Section (The Vibe):**

- Tampilkan teks singkat tentang pengalaman "Your Day to Day Brews". Berikan visualisasi tekstur kayu dan elemen minimalis. Tekankan pada suasana yang cocok untuk bekerja (laptop-friendly) dan bersosialisasi.

**D. Featured Menu (Sips & Bites):**

- Tampilkan 3 card kategori:
  1.  **Signature Coffee:** Coffee-based drinks.
  2.  **Dessert (Highlight):** "KAHII's Umm Ali" (Gunakan deskripsi: Hidangan penutup khas yang autentik dan manis).
  3.  **Bites:** Aneka pastry dan cemilan pendamping kopi.
- Gunakan foto melingkar atau persegi dengan border tipis warna emas.

**E. Operational Hours (Information Center):**

- Tampilkan tabel jam operasional yang bersih menggunakan warna latar belakang cokelat kayu diredam:
  - **Mon - Thu:** 08.00 - 01.30
  - **Fri - Sat:** 07.00 - 02.00
  - **Sun:** 07.00 - 01.00

**F. Social Proof & Instagram Feed:**

- Grid 4 kolom yang menampilkan placeholder postingan Instagram (Gunakan nuansa merah-krem sesuai gambar referensi).
- Tambahkan handle IG: `@your.kahii`.

**G. Reservation & Contact (Footer-Pre):**

- **Headline:** "Planning a Visit?"
- **Info:** Tampilkan instruksi: "Reservation (H-1) via WhatsApp".
- **Action:** Tombol WhatsApp yang besar dan mencolok dengan warna hijau atau merah brand.
- **Location:** Embed Google Maps (Makassar Area).

#### **3. Technical Requirements**

- **Responsive:** Pastikan mobile-first (karena pengunjung kafe sering membuka web via HP).
- **Animation:** Tambahkan efek _fade-in_ sederhana saat scroll menggunakan Framer Motion atau CSS AOS.
- **Clean Code:** Gunakan komponen fungsional dan Tailwind utility classes.
