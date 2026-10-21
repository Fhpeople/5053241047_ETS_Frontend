import { useState, useEffect } from 'react';
import type { SumberDaya, Peminjaman, PeminjamanFilterType } from './types';
import { getSumberDaya, getPeminjaman, getPeminjamanById } from './api/pinjam';
import { SumberDayaForm } from './components/SumberDayaForm';
import { SumberDayaList } from './components/SumberDayaList';
import { PeminjamanForm } from './components/PeminjamanForm';
import { PeminjamanFilter } from './components/PeminjamanFilter';
import { PeminjamanList } from './components/PeminjamanList';
import { PeminjamanDetail } from './components/PeminjamanDetail';

export default function App() {
  const [sumberDayaList, setSumberDayaList] = useState<SumberDaya[]>([]);
  const [peminjamanList, setPeminjamanList] = useState<Peminjaman[]>([]);
  const [filter, setFilter] = useState<PeminjamanFilterType>({
    sumber_daya_id: '',
    tanggal: '',
    status: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [detailPeminjaman, setDetailPeminjaman] = useState<Peminjaman | null>(null);

  const fetchSumberDaya = async () => {
    try {
      const data = await getSumberDaya();
      setSumberDayaList(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data sumber daya');
    }
  };

  const fetchPeminjaman = async () => {
    try {
      const data = await getPeminjaman(filter);
      setPeminjamanList(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data peminjaman');
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchSumberDaya(), fetchPeminjaman()]);
      setLoading(false);
    };
    init();
  }, []);

  // Otomatis fetch ulang saat filter berubah
  useEffect(() => {
    fetchPeminjaman();
  }, [filter]);

  const handleRefreshAll = () => {
    fetchSumberDaya();
    fetchPeminjaman();
  };

  const handleSelectDetail = async (id: number) => {
    try {
      const data = await getPeminjamanById(id);
      setDetailPeminjaman(data);
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil detail');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">PinjamKampus - F1, F2 & F3</h1>

      {error && <div role="alert" className="p-2 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div>Memuat...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <SumberDayaForm onSuccess={handleRefreshAll} />
              <SumberDayaList sumberDayaList={sumberDayaList} />
            </div>

            <div>
              <PeminjamanForm
                sumberDayaList={sumberDayaList}
                onSuccess={handleRefreshAll}
              />
            </div>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">Daftar Peminjaman</h2>
          
          <PeminjamanFilter
            sumberDayaList={sumberDayaList}
            filter={filter}
            onChangeFilter={setFilter}
          />

          <PeminjamanDetail detail={detailPeminjaman} sumberDayaList={sumberDayaList} />

          <PeminjamanList
            peminjamanList={peminjamanList}
            onSelectDetail={handleSelectDetail}
          />
        </>
      )}
    </div>
  );
}