# AI-LOG

Catat setiap penggunaan AI yang menghasilkan kode. Jika tidak memakai AI sama sekali, tulis satu baris: **tidak memakai AI**.

Log yang jujur tidak mengurangi nilai, sebanyak apa pun AI dipakai. Yang mengurangi nilai adalah log yang tidak sesuai dengan kode, atau isi log yang tidak bisa kamu jelaskan.

## (Nama fitur atau komponen, misalnya: Penanganan error 409 di form peminjaman, F5)
- Prompt: (ringkas, apa yang kamu minta)
- Dipakai: (bagian kode yang kamu ambil, misalnya nama komponen/fungsi dan file)
- Diubah: (apa yang kamu ubah atau perbaiki dari hasil AI, dan kenapa)

## Panduan Pengerjaan Bertahap dan Perbaikan Code (F1 - F3)
- Prompt: Minta arahan pengerjaan bertahap dari F1 sampai F3 secara langkah demi langkah untuk memahami alur kode, tipe data TypeScript, serta penanganan API fetch.
- Dipakai: Struktur tipe data di src/types/index.ts, fungsi fetch di src/api/pinjam.ts, serta komponen UI (SumberDayaForm, SumberDayaList, PeminjamanForm, PeminjamanFilter, PeminjamanDetail, PeminjamanList, dan App.tsx).
- Diubah: Memperbaiki typo endpoint /sumberdaya menjadi /sumber-daya, menyesuaikan impor tipe menggunakan sintaks import type untuk mematuhi aturan strict verbatimModuleSyntax dari TypeScript Vite, dan mengganti tipe event handler e: React.FormEvent menjadi e: React.SubmitEvent untuk menghilangkan peringatan deprecated dari React.