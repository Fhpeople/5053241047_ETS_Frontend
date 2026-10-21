export interface SumberDaya {
    id: number;
    nama: string;
    jenis: 'ruang' | 'alat';
    stok: number;
}

export interface SumberDayaInput {
    nama: string;
    jenis: 'ruang' | 'alat';
    stok: number;
}

export interface SumberDaya {
  id: number;
  nama: string;
  jenis: 'ruang' | 'alat';
  stok: number;
}

export interface SumberDayaInput {
  nama: string;
  jenis: 'ruang' | 'alat';
  stok: number;
}

export interface Peminjaman {
  id: number;
  sumber_daya_id: number;
  peminjam: string;
  tanggal: string;
  slot_mulai: number;
  slot_selesai: number;
  jumlah: number;
  status: 'diajukan' | 'disetujui' | 'ditolak' | 'selesai' | 'dibatalkan' | 'aktif';
  alasan?: string;
}

export interface PeminjamanInput {
  sumber_daya_id: number;
  peminjam: string;
  tanggal: string;
  slot_mulai: number;
  slot_selesai: number;
  jumlah: number;
}

export interface PeminjamanFilterType {
  sumber_daya_id: string;
  tanggal: string;
  status: string;
}