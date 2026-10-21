import React from 'react';
import type { Peminjaman, SumberDaya } from '../types';

interface Props {
  detail: Peminjaman | null;
  sumberDayaList: SumberDaya[];
}

export const PeminjamanDetail: React.FC<Props> = ({ detail, sumberDayaList }) => {
  if (!detail) return null;

  const sd = sumberDayaList.find((s) => s.id === detail.sumber_daya_id);

  return (
    <div
      aria-label="Detail peminjaman"
      className="p-4 bg-blue-50 border border-blue-200 rounded mb-6"
    >
      <h3 className="text-lg font-bold mb-2">Detail Peminjaman</h3>
      <p><strong>ID:</strong> {detail.id}</p>
      <p><strong>Peminjam:</strong> {detail.peminjam}</p>
      <p><strong>Sumber Daya:</strong> {sd ? sd.nama : detail.sumber_daya_id}</p>
      <p><strong>Tanggal:</strong> {detail.tanggal}</p>
      <p><strong>Slot:</strong> Slot {detail.slot_mulai}-{detail.slot_selesai}</p>
      <p><strong>Jumlah:</strong> {detail.jumlah}</p>
      <p><strong>Status:</strong> {detail.status}</p>
    </div>
  );
};