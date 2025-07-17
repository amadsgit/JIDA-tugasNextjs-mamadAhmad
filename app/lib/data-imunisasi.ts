import { type DataImunisasi } from '@/app/ui/dashboard/cakupan-imunisasi-chart';

export async function getDataImunisasi(): Promise<DataImunisasi[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/data-imunisasi`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data imunisasi');
  }

  return res.json();
}
