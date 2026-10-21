import React, { useState } from 'react';
import type { SumberDaya, PeminjamanInput } from '../types';
import { createPeminjaman } from '../api/pinjam';

interface Props {
  sumberDayaList: SumberDaya[];
  onSuccess: () => void;
}

export const PeminjamanForm: React.FC<Props> = ({ sumberDayaList, onSuccess }) => {
  const [sumberDayaId, setSumberDayaId] = useState<string>('');
  const [peminjam, setPeminjam] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [slotMulai, setSlotMulai] = useState<number>(1);
  const [slotSelesai, setSlotSelesai] = useState<number>(1);
  const [jumlah, setJumlah] = useState<number>(1);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSumberDayaId('');
    setPeminjam('');
    setTanggal('');
    setSlotMulai(1);
    setSlotSelesai(1);
    setJumlah(1);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);

    if (!sumberDayaId) {
      setError('Sumber daya belum dipilih');
      return;
    }

    const trimmedPeminjam = peminjam.trim();
    if (!trimmedPeminjam) {
      setError('Peminjam wajib diisi');
      return;
    }
    if (trimmedPeminjam.length > 50) {
      setError('Peminjam maksimal 50 karakter');
      return;
    }

    if (!tanggal) {
      setError('Tanggal wajib diisi');
      return;
    }

    const start = Number(slotMulai);
    const end = Number(slotSelesai);
    if (start < 1 || start > 8 || end < 1 || end > 8) {
      setError('Slot harus bernilai 1 sampai 8');
      return;
    }
    if (start > end) {
      setError('Slot mulai tidak boleh lebih besar dari slot selesai');
      return;
    }

    const selectedSD = sumberDayaList.find((s) => s.id === Number(sumberDayaId));
    const maxStok = selectedSD ? selectedSD.stok : 1;
    const qty = Number(jumlah);

    if (qty < 1 || qty > maxStok) {
      setError(`Jumlah harus antara 1 dan ${maxStok}`);
      return;
    }

    const payload: PeminjamanInput = {
      sumber_daya_id: Number(sumberDayaId),
      peminjam: trimmedPeminjam,
      tanggal,
      slot_mulai: start,
      slot_selesai: end,
      jumlah: qty,
    };

    setLoading(true);

    try {
      await createPeminjaman(payload);
      resetForm();
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow border mb-6">
      <h2 className="text-xl font-bold mb-4">Buat Peminjaman</h2>
      
      {error && <div role="alert" className="p-2 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sumber-daya-select" className="block text-sm font-medium mb-1">
            Sumber daya
          </label>
          <select
            id="sumber-daya-select"
            value={sumberDayaId}
            onChange={(e) => setSumberDayaId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Sumber Daya --</option>
            {sumberDayaList.map((sd) => (
              <option key={sd.id} value={sd.id}>
                {sd.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="peminjam-input" className="block text-sm font-medium mb-1">
            Peminjam
          </label>
          <input
            id="peminjam-input"
            type="text"
            value={peminjam}
            onChange={(e) => setPeminjam(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="tanggal-input" className="block text-sm font-medium mb-1">
            Tanggal
          </label>
          <input
            id="tanggal-input"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="slot-mulai-select" className="block text-sm font-medium mb-1">
              Slot mulai
            </label>
            <select
              id="slot-mulai-select"
              value={slotMulai}
              onChange={(e) => setSlotMulai(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="slot-selesai-select" className="block text-sm font-medium mb-1">
              Slot selesai
            </label>
            <select
              id="slot-selesai-select"
              value={slotSelesai}
              onChange={(e) => setSlotSelesai(Number(e.target.value))}
              className="w-full border p-2 rounded"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="jumlah-input" className="block text-sm font-medium mb-1">
            Jumlah
          </label>
          <input
            id="jumlah-input"
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Simpan peminjaman
        </button>
      </form>
    </div>
  );
};