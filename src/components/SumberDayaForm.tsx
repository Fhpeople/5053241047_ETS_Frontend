import React, { useState } from 'react';
import { createSumberDaya } from '../api/pinjam';

interface Props {
    onSuccess: () => void;
}

export const SumberDayaForm: React.FC<Props> = ({ onSuccess }) => {
    const [nama, setNama] = useState('');
    const [jenis, setJenis] = useState<'ruang' | 'alat'>('ruang');
    const [stok, setStok] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedNama = nama.trim();
        if (!trimmedNama) {
            setError('Nama sumber daya wajib diisi');
            return;
        }

        if (trimmedNama.length > 50) {
            setError('Nama sumber daya maksimal 50 karakter');
            return;
        }

        if (stok < 1 || !Number.isInteger(Number(stok))) {
            setError('Stok harus berupa bilangan bulat minimal 1');
            return;
        }

        setLoading(true);
        try {
            await createSumberDaya({ nama: trimmedNama, jenis, stok: Number(stok) });
            setNama('');
            setJenis('ruang');
            setStok(1);
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Gagal menyimpan sumber daya');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow border mb-6">
            <h2 className="text-xl font-bold mb-4">Tambah Sumber Daya</h2>

            {error && <div role="alert" className="p-2 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nama-sumber-daya" className="block text-sm font-medium mb-1">
                        Nama Sumber Daya
                    </label>
                    <input
                        id="nama-sumber-daya"
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="jenis-sumber-daya" className="block text-sm font-medium mb-1">
                        Jenis
                    </label>
                    <select
                        id="jenis-sumber-daya"
                        value={jenis}
                        onChange={(e) => setJenis(e.target.value as 'ruang' | 'alat')}
                        className="w-full border p-2 rounded"
                    >
                        <option value="ruang">Ruang</option>
                        <option value="alat">Alat</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="stok-sumber-daya" className="block text-sm font-medium mb-1">
                        Stok
                    </label>
                    <input
                        id="stok-sumber-daya"
                        type="number"
                        value={stok}
                        onChange={(e) => setStok(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    Simpan Sumber Daya
                </button>
            </form>
        </div>
    )
};