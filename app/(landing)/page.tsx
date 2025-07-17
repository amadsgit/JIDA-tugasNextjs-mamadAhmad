import NavbarLanding from '@/components/navbar-landing';
import FooterLanding from '@/components/footer-landing';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white via-emerald-50 to-white text-gray-800">
      {/* Navbar */}
      <NavbarLanding />

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl shadow-xl mx-4 md:mx-6 mt-6 px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-5">
          <Image
            src="/logo.png"
            alt="Logo E-Posyandu"
            width={90}
            height={90}
            className="rounded-full bg-white p-1 shadow-lg ring-2 ring-white"
            priority
          />
          <div>
            <h1 className="text-4xl font-extrabold text-white drop-shadow">
              E‑Posyandu Care
            </h1>
            <p className="text-white text-sm md:text-base mt-1">
              Digitalisasi layanan posyandu untuk masyarakat sehat dan terdata
            </p>
          </div>
        </div>
        <div className="text-white italic text-sm md:text-base text-center md:text-right space-y-1">
          <p>“Melayani dengan data, mengabdi dengan hati.”</p>
          <p className="text-xs">Realtime • Terintegrasi • Mudah digunakan</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-col md:flex-row gap-6 mt-10 mx-4 md:mx-6">
        {/* Info Box */}
        <div className="flex flex-col justify-center gap-6 bg-white rounded-xl shadow-lg p-6 md:p-10 md:w-2/5">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-blue-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-600">
            Selamat Datang di E‑Posyandu Care
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            <strong>E‑Posyandu Care</strong> adalah sistem informasi digital yang dirancang khusus untuk membantu Puskesmas dan kader posyandu dalam meningkatkan layanan kesehatan balita dan ibu hamil secara terstruktur, cepat, dan terintegrasi.
          </p>
          <ul className="list-disc ml-5 text-gray-600 text-sm md:text-base space-y-1">
            <li>📊 Mencatat pertumbuhan dan perkembangan balita secara real-time</li>
            <li>🤰 Memantau kondisi ibu hamil dan jadwal pemeriksaan rutin</li>
            <li>📅 Menyusun jadwal imunisasi, vitamin, dan kegiatan posyandu</li>
            <li>📥 Menghasilkan laporan otomatis untuk Dinas Kesehatan</li>
            <li>💬 Menyampaikan informasi dan pengingat ke orang tua melalui sistem terintegrasi</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-5 py-2.5 text-sm md:text-base font-medium shadow hover:bg-emerald-500 transition"
            >
              <span>Login</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/tentang"
              className="text-emerald-700 text-sm md:text-base hover:underline"
            >
              Tentang Kami
            </Link>
            <Link
              href="/kontak"
              className="text-emerald-700 text-sm md:text-base hover:underline"
            >
              Kontak
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex items-center justify-center md:w-3/5">
          <Image
            src="/hero-desktop.png"
            alt="Hero Ilustrasi"
            width={800}
            height={600}
            className="hidden md:block rounded-xl shadow-lg"
            priority
          />
          <Image
            src="/hero-mobile.png"
            alt="Hero Ilustrasi Mobile"
            width={400}
            height={300}
            className="block md:hidden rounded-lg shadow"
            priority
          />
          {/* <div className="flex items-center justify-center w-full h-full bg-white rounded-xl shadow-lg p-4">
            <CakupanImunisasiChart />
          </div> */}

        </div>
      </section>

      {/* Footer */}
      <FooterLanding />
    </main>
  );
}
