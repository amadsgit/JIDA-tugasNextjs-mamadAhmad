// lib/imunisasi.ts
import { type DataImunisasi } from '@/app/ui/dashboard/cakupan-imunisasi-chart';

export async function getDataImunisasi(): Promise<DataImunisasi[]> {
  const res = await fetch('http://localhost:3000/api/data-imunisasi', {
    cache: 'no-store',
  });
  return res.json();
}
