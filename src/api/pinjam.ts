import type { SumberDaya, SumberDayaInput, Peminjaman, PeminjamanInput, PeminjamanFilterType } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export async function getSumberDaya(): Promise<SumberDaya[]> {
    const res = await fetch(`${API_BASE_URL}/sumber-daya`);
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Gagal mengambil data sumber daya' }));
        throw new Error(errorData.error || 'Gagal mengambil data sumber daya');
    }

    return res.json();
}

export async function createSumberDaya(data: SumberDayaInput): Promise<SumberDaya> {
    const res = await fetch(`${API_BASE_URL}/sumber-daya`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Gagal membuat sumber daya' }));
        throw new Error(errorData.error || 'Gagal membuat sumber daya baru');
    }

    return res.json();
}

export async function getPeminjaman(filter: PeminjamanFilterType): Promise<Peminjaman[]> {
    const params = new URLSearchParams();
    if (filter.sumber_daya_id) params.append('sumber_daya_id', filter.sumber_daya_id);
    if (filter.tanggal) params.append('tanggal', filter.tanggal);
    if (filter.status) params.append('status', filter.status);

    const res = await fetch('${API_BASE_URL}/peminjaman?${params.toString()}');
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Gagal mengambil data peminjaman' }));
        throw new Error(errorData.error || 'Gagal mengambil data peminjaman');
    }

    return res.json();
}

export async function createPeminjaman(data: PeminjamanInput): Promise<Peminjaman> {
    const res = await fetch(`${API_BASE_URL}/peminjaman`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Gagal mmebuat peminjaman'}));
        throw new Error(errorData.error || 'Gagal membuat peminjaman');
    }

    return res.json();
}

export async function getPeminjamanById(id: number): Promise<Peminjaman> {
  const res = await fetch(`${API_BASE_URL}/peminjaman/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Gagal mengambil detail peminjaman' }));
    throw new Error(errorData.error || 'Gagal mengambil detail peminjaman');
  }
  return res.json();
}