'use client';

import {
  BellIcon,
  UserCircleIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function TopNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Handle klik di luar dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }

      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-16 bg-white border-b shadow-sm px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Judul */}
      <div className="text-xl font-semibold text-blue-600">e-Posyandu Care</div>

      {/* Kanan */}
      <div className="flex items-center space-x-4">
        {/* 🔔 Notifikasi */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative text-gray-600 hover:text-emerald-600 transition"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2 font-semibold text-gray-700 border-b bg-gray-50">
                Notifikasi Terbaru
              </div>
              <ul className="text-sm text-gray-700 max-h-60 overflow-y-auto">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  💉 Jadwal imunisasi besok pukul 08:00
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  📈 Data pertumbuhan balita baru diinput
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  🔔 Kegiatan Posyandu minggu depan
                </li>
              </ul>
              <div className="text-right px-4 py-2 text-xs text-blue-500 hover:underline cursor-pointer">
                Lihat semua notifikasi
              </div>
            </div>
          )}
        </div>

        {/* 👤 Profil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-full hover:opacity-80 transition"
          >
            <Image
              src="/favicon.ico"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full border"
            />
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Aduhh..
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UserCircleIcon className="w-5 h-5 text-blue-500" />
                Profil
              </Link>
              <form action="/">
                <button
                  type="submit"
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <PowerIcon className="w-5 h-5 text-red-500" />
                  Sign Out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
