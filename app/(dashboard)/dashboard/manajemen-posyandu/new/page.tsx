'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    wilayah: '',
    kelurahan: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi data
    if (!formData.nama || !formData.alamat || !formData.wilayah || !formData.kelurahan) {
      setError('Semua field wajib diisi!');
      toast.error('Semua field wajib diisi!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/manajemen-posyandu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Gagal menyimpan data');
      }

      toast.success('Berhasil menambahkan data Posyandu!');
      router.push('/dashboard/manajemen-posyandu');
    } catch (err) {
      toast.error('Gagal menyimpan data Posyandu!'); 
      console.error(err);
      setError('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            Tambah <span className="text-emerald-500">Data Posyandu</span>
          </h1>

          {/* {error && <p className="text-sm text-red-600 mb-4">{error}</p>} */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Nama Posyandu</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
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
                className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
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
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
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
                  className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
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
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
