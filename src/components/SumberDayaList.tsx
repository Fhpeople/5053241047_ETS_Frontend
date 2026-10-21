import React from 'react';
import type { SumberDaya } from '../types';

interface Props {
    sumberDayaList: SumberDaya[];
}

export const SumberDayaList: React.FC<Props> = ({ sumberDayaList }) => {
    return (
        <div className="p-4 bg-white rounded shadow border mb-6">
            <h2 className="text-xl font-bold mb-4">Daftar Sumber Daya</h2>
            <ul aria-label="Daftar sumber daya" className="divide-y divide-gray-200">
                {sumberDayaList.map((item) => (
                    <li key={item.id} className="py-2">
                        <span className="font-semibold">{item.nama}</span> - Jenis: {item.jenis} - Stok: {item.stok}
                    </li>
                ))}
            </ul>
        </div>
    );
};