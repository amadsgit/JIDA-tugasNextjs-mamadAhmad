// app/api/manajemen-posyandu/[id]/route.ts

import { NextRequest } from 'next/server';
import { posyanduList } from '../data';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, context: { params?: { id?: string } }) {
  const id = context.params?.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID tidak ditemukan dalam parameter URL' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const { nama, alamat, wilayah, kelurahan } = body;

    if (!nama || !alamat || !wilayah || !kelurahan) {
      return new Response(JSON.stringify({ error: 'Semua field wajib diisi!' }), { status: 400 });
    }

    const index = posyanduList.findIndex(item => item.id.toString() === id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Data tidak ditemukan!' }), { status: 404 });
    }

    posyanduList[index] = { ...posyanduList[index], nama, alamat, wilayah, kelurahan };
    return new Response(JSON.stringify(posyanduList[index]), { status: 200 });

  } catch (error) {
    console.error('Error updating data:', error);
    return new Response(JSON.stringify({ error: 'Gagal memproses permintaan' }), { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params?: { id?: string } }) {
  const id = context.params?.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID tidak ditemukan dalam parameter URL' }), { status: 400 });
  }

  const index = posyanduList.findIndex(item => item.id.toString() === id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: 'Data tidak ditemukan!' }), { status: 404 });
  }

  const deleted = posyanduList.splice(index, 1)[0];
  return new Response(JSON.stringify({ message: 'Berhasil dihapus', deleted }), { status: 200 });
}
