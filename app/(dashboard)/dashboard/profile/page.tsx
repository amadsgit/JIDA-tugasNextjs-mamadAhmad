'use client';
import Image from "next/image";
import Link from "next/link";
import { EyeIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const profile = {
    id: 1,
    name: 'Ahmad Mamad',
  };

  return (
    <div className=" p-6 bg-white text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-4">
        Profile Anda
      </h1>
      {/* Gambar Ilustrasi atau Info */}
      <div className="rounded-xl bg-emerald-50 w-40 p-6 md:flex items-center gap-8 shadow">
        <div className="mt-6 md:mt-0">
          <Image
            src="/logo3.png"
            alt="Dashboard Ilustrasi"
            width={500}
            height={300}
          />
        </div>
      </div>

      <Link
        href={`/dashboard/profile/${profile.id}`}
        className="inline-flex mt-2 items-center gap-2 rounded-lg bg-emerald-600 text-white px-5 py-2.5 text-sm md:text-base font-medium shadow hover:bg-emerald-500 transition"
      >
        <span>Lihat Detail</span> <EyeIcon className="w-5 md:w-6" />
      </Link>


    </div>
  );
}