'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export type DataImunisasi = {
  nama_puskesmas: string;
  jenis_kelamin: 'LAKI-LAKI' | 'PEREMPUAN';
  jumlah_bayi_diimunisasi: number;
};

interface ImunisasiChartProps {
  data: DataImunisasi[];
}

export default function CakupanImunisasiChart({ data }: ImunisasiChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada data imunisasi.</p>;
  }

  const labels = Array.from(new Set(data.map((d) => d.nama_puskesmas)));

  const dataLaki = labels.map((nama) => {
    const item = data.find((d) => d.nama_puskesmas === nama && d.jenis_kelamin === 'LAKI-LAKI');
    return item?.jumlah_bayi_diimunisasi || 0;
  });

  const dataPerempuan = labels.map((nama) => {
    const item = data.find((d) => d.nama_puskesmas === nama && d.jenis_kelamin === 'PEREMPUAN');
    return item?.jumlah_bayi_diimunisasi || 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Laki-laki',
        data: dataLaki,
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500
      },
      {
        label: 'Perempuan',
        data: dataPerempuan,
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // blue-500
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cakupan Imunisasi Dasar Lengkap per Puskesmas',
      },
    },
  };

  return (
    <div className="w-full h-full space-y-3 mt-10">
      <div className="relative w-full" style={{ height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
      <p className="text-sm text-red-500 text-center">
        Sumber data API :{' '}
        <a
          href="https://opendata.cimahikota.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-emerald-600 text-gray-500"
        >
          Open Data Kota Cimahi
        </a>
      </p>
    </div>
  );
}
