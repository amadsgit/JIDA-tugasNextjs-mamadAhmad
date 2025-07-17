'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Posyandu = {
  nama: string;
  alamat: string;
  wilayah: string;
  kelurahan: string;
  id?: string;
};

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams() as { id?: string };

  const [formData, setFormData] = useState<Posyandu>({
    nama: '',
    alamat: '',
    wilayah: '',
    kelurahan: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/manajemen-posyandu');
        const data = await res.json();
        const posyandu = data.find((item: Posyandu) => item.id?.toString() === id);

        if (!posyandu) {
          setError('Data tidak ditemukan.');
          return;
        }

        setFormData(posyandu);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data.');
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama || !formData.alamat || !formData.wilayah || !formData.kelurahan) {
      toast.error('Semua field wajib diisi!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/manajemen-posyandu/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || 'Gagal menyimpan perubahan');
      }

      toast.success('Perubahan berhasil disimpan');
      router.push('/dashboard/manajemen-posyandu');
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Edit <span className="text-emerald-500">Data Posyandu</span>
          </h1>

          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>
          )}

          {!error && (
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nama Posyandu
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-emerald-400 focus:outline-none focus:ring-2 transition"
                  placeholder="Contoh: Posyandu Melati"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-emerald-400 focus:outline-none focus:ring-2 transition"
                  placeholder="Contoh: Jl. Mawar No. 10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Wilayah</label>
                  <input
                    type="text"
                    name="wilayah"
                    value={formData.wilayah}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-emerald-400 focus:outline-none focus:ring-2 transition"
                    placeholder="Contoh: RW 01"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Kelurahan</label>
                  <input
                    type="text"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-emerald-400 focus:outline-none focus:ring-2 transition"
                    placeholder="Contoh: Pasirkareumbi"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Link href="/dashboard/manajemen-posyandu">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-orange-200 text-orange-600 text-sm px-4 py-2 rounded-xl shadow-sm transition"
                  >
                    Batal
                  </button>
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-300 text-white text-sm px-6 py-2 rounded-xl shadow-md transition"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
