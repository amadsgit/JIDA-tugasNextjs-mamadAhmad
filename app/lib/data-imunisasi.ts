import { type DataImunisasi } from '@/app/ui/dashboard/cakupan-imunisasi-chart';

export async function getDataImunisasi(): Promise<DataImunisasi[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  console.log("🚀 BASE URL:", baseUrl); // <--- cek di log Vercel setelah redeploy
  const res = await fetch(`${baseUrl}/api/data-imunisasi`, {
    cache: 'no-store',
  });
  return res.json();
}

