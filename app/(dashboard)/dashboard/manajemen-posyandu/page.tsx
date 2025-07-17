'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ModalKonfirmasi from '@/components/delete-confirmation';

type Posyandu = {
  id: number;
  nama: string;
  alamat: string;
  wilayah: string;
  kelurahan: string;
};

export default function Page() {
  const [posyanduList, setPosyanduList] = useState<Posyandu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/manajemen-posyandu');
        const data = await res.json();
        setPosyanduList(data);
      } catch (error) {
        console.error('Gagal memuat data posyandu:', error);
        toast.error('Gagal memuat data posyandu!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(`/api/manajemen-posyandu/${selectedId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Gagal menghapus data');

      setPosyanduList((prev) => prev.filter((item) => item.id !== selectedId));
      toast.success('Data Posyandu berhasil dihapus!');
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan saat menghapus data!');
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 via-white to-white text-gray-800 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Manajemen <span className="text-emerald-500">Posyandu & Kader</span>
          </h1>
          <Link href="/dashboard/manajemen-posyandu/new">
            <button className="bg-teal-600 hover:bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition">
              + Tambah Posyandu
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-16 text-emerald-600">
              <svg className="w-6 h-6 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-sm font-medium">Memuat data posyandu...</span>
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Nama Posyandu</th>
                  <th className="px-6 py-4 text-left">Alamat</th>
                  <th className="px-6 py-4 text-left">Wilayah</th>
                  <th className="px-6 py-4 text-left">Kelurahan</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {posyanduList.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{item.nama}</td>
                    <td className="px-6 py-4">{item.alamat}</td>
                    <td className="px-6 py-4">{item.wilayah}</td>
                    <td className="px-6 py-4">{item.kelurahan}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Link
                          href={`/dashboard/manajemen-posyandu/${item.id}/edit`}
                          className="p-2 rounded-md bg-white border border-gray-300 hover:border-teal-500 hover:text-teal-600 transition"
                          title="Edit"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </Link>

                        <button
                          onClick={() => openDeleteModal(item.id)}
                          className="p-2 rounded-md bg-white border border-gray-300 hover:border-rose-500 hover:text-rose-600 transition"
                          title="Hapus"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>

                        <Link
                          href={`/dashboard/manajemen-posyandu/${item.id}`}
                          className="p-2 rounded-md bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition"
                          title="Detail Posyandu"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/manajemen-posyandu/${item.id}/kader`}
                          className="px-3 py-1.5 text-xs rounded-md bg-sky-600 hover:bg-sky-500 text-white transition"
                        >
                          Kelola Kader
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {posyanduList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Tidak ada data posyandu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ModalKonfirmasi
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Hapus Data Posyandu"
        message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."
      />
    </div>
  );
}
