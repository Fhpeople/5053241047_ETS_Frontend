import React from 'react';
import type { Peminjaman } from '../types';

interface Props {
  peminjamanList: Peminjaman[];
  onSelectDetail: (id: number) => void;
}

export const PeminjamanList: React.FC<Props> = ({ peminjamanList, onSelectDetail }) => {
  return (
    <div className="p-4 bg-white rounded shadow border mb-6">
      <h2 className="text-xl font-bold mb-4">Daftar Peminjaman</h2>
      <ul aria-label="Daftar peminjaman" className="divide-y divide-gray-200">
        {peminjamanList.map((item) => (
          <li key={item.id} className="py-3 flex justify-between items-center">
            <div>
              <span className="font-semibold">{item.peminjam}</span> - {item.tanggal} - Slot {item.slot_mulai}-{item.slot_selesai} - Jumlah: {item.jumlah} - Status: <span className="uppercase text-xs font-bold px-2 py-1 bg-gray-100 rounded">{item.status}</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectDetail(item.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300"
            >
              Detail
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};