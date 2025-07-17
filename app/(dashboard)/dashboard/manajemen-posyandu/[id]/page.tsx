import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { id: string };
};

export const dynamic = 'force-dynamic';

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.error('ERROR: NEXT_PUBLIC_BASE_URL tidak ditemukan di env.');
    return notFound();
  }

  try {
    const res = await fetch(`${baseUrl}/api/manajemen-posyandu`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`Fetch gagal: ${res.statusText}`);

    const data = await res.json();
    const posyandu = data.find((item: any) => item.id.toString() === id);

    if (!posyandu) return notFound();

    return (
      <div className="px-6 py-10 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">
              Detail Posyandu
            </h1>

            <div className="space-y-4 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Nama Posyandu:</span>
                <span className="font-semibold">{posyandu.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Alamat:</span>
                <span>{posyandu.alamat}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Wilayah:</span>
                <span>{posyandu.wilayah}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Kelurahan:</span>
                <span>{posyandu.kelurahan}</span>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <Link href="/dashboard/manajemen-posyandu">
                <button className="bg-gray-200 hover:bg-orange-200 text-orange-600 text-sm px-4 py-2 rounded-xl shadow-sm transition">
                  ← Kembali
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching detail posyandu:', error);
    return notFound();
  }
}
