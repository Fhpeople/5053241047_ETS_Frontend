import React from 'react';
import type { SumberDaya, PeminjamanFilterType } from '../types';

interface Props {
  sumberDayaList: SumberDaya[];
  filter: PeminjamanFilterType;
  onChangeFilter: (newFilter: PeminjamanFilterType) => void;
}

export const PeminjamanFilter: React.FC<Props> = ({
  sumberDayaList,
  filter,
  onChangeFilter,
}) => {
  return (
    <div className="p-4 bg-gray-50 rounded border mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label htmlFor="filter-sumber-daya" className="block text-sm font-medium mb-1">
          Filter sumber daya
        </label>
        <select
          id="filter-sumber-daya"
          value={filter.sumber_daya_id}
          onChange={(e) => onChangeFilter({ ...filter, sumber_daya_id: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Semua</option>
          {sumberDayaList.map((sd) => (
            <option key={sd.id} value={sd.id}>
              {sd.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-tanggal" className="block text-sm font-medium mb-1">
          Filter tanggal
        </label>
        <input
          id="filter-tanggal"
          type="date"
          value={filter.tanggal}
          onChange={(e) => onChangeFilter({ ...filter, tanggal: e.target.value })}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="filter-status" className="block text-sm font-medium mb-1">
          Filter status
        </label>
        <select
          id="filter-status"
          value={filter.status}
          onChange={(e) => onChangeFilter({ ...filter, status: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Semua</option>
          <option value="diajukan">diajukan</option>
          <option value="disetujui">disetujui</option>
          <option value="ditolak">ditolak</option>
          <option value="selesai">selesai</option>
          <option value="dibatalkan">dibatalkan</option>
        </select>
      </div>
    </div>
  );
};