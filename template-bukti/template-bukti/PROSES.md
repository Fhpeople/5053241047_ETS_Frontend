# PROSES

## 1. Persona dan masalahnya
Pengguna aplikasi ini adalah Admin Himpunan (Persona C) yang bertugas mengelola peminjaman ruang dan alat di lingkungan kampus. Masalah utama yang dihadapi adalah setiap pengajuan peminjaman tidak boleh langsung otomatis aktif, melainkan harus melalui alur persetujuan yang meliputi diajukan, disetujui, atau ditolak beserta alasannya, untuk memastikan penggunaan fasilitas kampus berjalan teratur. Fitur khas akan menyediakan tombol aksi persetujuan serta formulir alasan penolakan pada layar untuk memberikan kejelasan bagi peminjam.

## 2. Rancangan komponen dan state

Aplikasi dibagi menjadi beberapa komponen yang fokus melakukan tugas masing-masing. Komponen utama App.tsx berfungsi untuk mengatur data dan menghubungkan komponen-komponen lainnya. Pembagian komponen dan alur datanya adalah sebagai berikut:

- App.tsx (Komponen Utama)
  - State (penyimpanan data yang bisa berubah):
    - sumberDayaList: menyimpan daftar sumber daya yang tersedia untuk dipinjam.
    - peminjamanList: menyimpan daftar peminjaman yang ditampilkan sesuai filter.
    - filter: menyimpan kriteria untuk menyaring data peminjaman berdasarkan sumber daya, tanggal, dan status.
    - loading: menunjukkan apakah aplikasi sedang memuat data dari server.
    - error / globalError: menyimpan pesan kesalahan yang perlu ditampilkan kepada pengguna.
    - detailPeminjaman: menyimpan data peminjaman yang sedang dipilih untuk dilihat detailnya.
    - editingPeminjaman: menyimpan data peminjaman yang sedang diedit.

- Komponen Anak dan Props:
  - SumberDayaForm: menampilkan formulir untuk menambahkan sumber daya dan memberi tahu komponen utama ketika proses berhasil agar data diperbarui.
  - SumberDayaList: menampilkan daftar sumber daya yang tersedia berdasarkan data dari komponen utama.
  - PeminjamanForm: menampilkan formulir untuk menambahkan atau mengedit data peminjaman. Komponen ini menerima daftar sumber daya, data yang sedang diedit, serta fungsi untuk memperbarui data setelah proses berhasil atau membatalkan pengeditan.
  - PeminjamanFilter: menyediakan pilihan filter berdasarkan sumber daya, tanggal, dan status peminjaman. Komponen ini menerima data sumber daya, pilihan filter saat ini, dan fungsi untuk mengubah filter.
  - PeminjamanDetail: menampilkan informasi lengkap dari peminjaman yang dipilih, dengan menggunakan data peminjaman dan daftar sumber daya.
  - PeminjamanList: menampilkan daftar peminjaman serta menyediakan fungsi untuk memilih data yang ingin dilihat detailnya, mengedit data, memperbarui daftar, dan menangani pesan kesalahan.

## 3. Satu keputusan desain
(Satu keputusan yang kamu ambil, pilihan lain yang kamu pertimbangkan, dan alasanmu memilih yang ini. Contoh: kenapa daftar peminjaman diambil ulang dari server setelah setiap aksi, bukan hanya diubah di state.)

## 4. Bug atau kendala (minimal dua)
### Bug 1
- Gejala: Terdapat error kompilasi TypeScript is a type and must be imported using a type-only import when verbatimModuleSyntax is enabled pada pengimporan tipe/interface dari file types.
- Cara menemukan: Memeriksa tab Problems di VS Code dan terminal kompilasi saat pertama kali mengimpor tipe data.
- Penyebab dan solusi: Aturan ketat verbatimModuleSyntax pada Konfigurasi TypeScript Vite mewajibkan pengimporan tipe/interface menggunakan sintaks import type { ... }. Solusinya adalah menambah klausa type pada seluruh statement import khusus tipe data.

### Bug 2
- Gejala:
- Cara menemukan:
- Penyebab dan solusi:

## 5. Change request
(Apa yang diminta, bagian kode mana yang kamu ubah, dan satu keputusan desain yang kamu ambil.)
