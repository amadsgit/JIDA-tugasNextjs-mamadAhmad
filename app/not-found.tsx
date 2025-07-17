'use client';

// import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import animationData from '@/public/lottie.json';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center gap-6">
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />

      <h1 className="text-4xl font-bold text-emerald-600">
        <span className="text-yellow-600">Oops!</span> Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-600 max-w-md">
        Sepertinya alamat yang kamu tuju tidak ada!
      </p>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-500 transition"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Kembali ke halaman sebelumnya
      </button>
    </div>
  );
}
