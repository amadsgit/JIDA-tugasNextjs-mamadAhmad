'use client';

import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  IdentificationIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

const flatMenu = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },

  // Admin
  { name: 'Manajemen Posyandu', href: '/dashboard/manajemen-posyandu', icon: UserGroupIcon },
  // { name: 'Manajemen Akun', href: '/dashboard/akun', icon: UserIcon },
  // { name: 'Statistik Posyandu', href: '/dashboard/statistik', icon: ChartBarIcon },

  // Kader / Nakes
  // { name: 'Input Data Balita', href: '/dashboard/input/balita', icon: ClipboardDocumentIcon },
  // { name: 'Input Jadwal Imunisasi & Penimbangan', href: '/dashboard/jadwal', icon: CalendarDaysIcon },
  // { name: 'Rekap Kehadiran Balita', href: '/dashboard/kehadiran', icon: ClipboardDocumentListIcon },
  // { name: 'Status Gizi Balita', href: '/dashboard/status-gizi', icon: IdentificationIcon },
  // { name: 'Input Data Ibu Hamil', href: '/dashboard/input/ibu-hamil', icon: DocumentTextIcon },
  // { name: 'Pemantauan Kehamilan', href: '/dashboard/pemantauan-kehamilan', icon: ClipboardDocumentIcon },

  // Orang Tua
  // { name: 'Catatan Balita & Bumil', href: '/dashboard/catatan-anak', icon: ClipboardDocumentListIcon },
  // { name: 'Jadwal Kunjungan Posyandu', href: '/dashboard/jadwal-kunjungan', icon: CalendarDaysIcon },
];

// Grouped Menu
const menuGroups = [
  {
    title: '👤 Admin Puskesmas',
    items: flatMenu.slice(1, 4),
  },
  {
    title: '👩‍⚕️ Kader Posyandu',
    items: flatMenu.slice(4, 10),
  },
  {
    title: '🤰 Orang Tua Balita / Bumil',
    items: flatMenu.slice(10, 12),
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      {/* MOBILE NAVBAR */}
      <div className="md:hidden flex flex-wrap items-center justify-center gap-2 px-3 py-3 border-b bg-white">
        {flatMenu.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'flex flex-col items-center justify-center w-14 h-14 rounded-md text-gray-700 hover:text-blue-600 hover:bg-sky-100 transition',
                { 'text-blue-600 bg-sky-100': isActive }
              )}
            >
              <LinkIcon className="w-6" />
              <span className="text-[10px] font-medium">{link.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block w-full max-w-[260px] text-sm text-gray-800 px-2">
        {/* Home */}
        {flatMenu.slice(0, 1).map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center gap-2 rounded-md px-3 py-2 font-medium hover:bg-sky-100 hover:text-blue-600 mt-1',
                { 'bg-sky-100 text-blue-600': isActive }
              )}
            >
              <LinkIcon className="w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}

        {/* Grouped Menus */}
        {menuGroups.map((group) => (
          <div key={group.title} className="mt-4 border-t pt-3">
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center justify-between px-2 py-2 font-semibold text-gray-600 hover:text-blue-600 transition"
            >
              <span className="text-sm">{group.title}</span>
              {openGroups[group.title] ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </button>

            {openGroups[group.title] && (
              <div className="mt-1 flex flex-col gap-1">
                {group.items.map((link) => {
                  const LinkIcon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={clsx(
                        'flex items-center gap-3 rounded-lg px-3 py-2 ml-1 mr-1 text-sm transition',
                        {
                          'bg-sky-100 text-blue-600': isActive,
                          'text-gray-700 hover:text-blue-600 hover:bg-sky-100': !isActive,
                        }
                      )}
                    >
                      <LinkIcon className="w-5 h-5" />
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
