'use client';

import React from 'react';

type SummaryCardProps = {
  title: string;
  count: string;
  icon: React.ReactNode;
};

export default function SummaryCard({ title, count, icon }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
      <div className="bg-emerald-100 p-3 rounded-full ring-2 ring-emerald-300">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-emerald-700">{count}</p>
      </div>
    </div>
  );
}
