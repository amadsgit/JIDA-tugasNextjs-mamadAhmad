import {
  UsersIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import CakupanImunisasiChart from '@/app/ui/dashboard/cakupan-imunisasi-chart';
import SummaryCard from '@/app/ui/dashboard/summary-card';
import { getDataImunisasi } from '@/app/lib/data-imunisasi';



export default async function Page() {
  const data = await getDataImunisasi();

  return (
    <div className="p-6 bg-gradient-to-b from-emerald-50 via-white to-white text-gray-800">
      <h1 className="text-3xl font-bold text-emerald-700 mb-2">
        Dashboard <span className="text-emerald-500">E‑Posyandu Care</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Selamat datang, berikut ringkasan informasi Posyandu hari ini.
      </p>

      {/* Ringkasan Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Data Balita"
          count="null"
          icon={<UsersIcon className="w-7 h-7 text-emerald-600" />}
        />
        <SummaryCard
          title="Ibu Hamil Terdata"
          count="null"
          icon={<ClipboardDocumentListIcon className="w-7 h-7 text-emerald-600" />}
        />
        <SummaryCard
          title="Jadwal Posyandu"
          count="null"
          icon={<CalendarDaysIcon className="w-7 h-7 text-emerald-600" />}
        />
        <SummaryCard
          title="Laporan Pemeriksaan"
          count="null"
          icon={<DocumentTextIcon className="w-7 h-7 text-emerald-600" />}
        />
      </div>

      {/* Grafik Imunisasi */}
      <CakupanImunisasiChart data={data} />
    </div>
  );
}
