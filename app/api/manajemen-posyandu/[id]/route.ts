// api/manajemen-posyandu/[id]/route.ts
import { NextRequest } from 'next/server';
import { posyanduStore } from '../data';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, context: { params?: { id?: string } }) {
  const id = Number(context.params?.id);
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID tidak valid' }), { status: 400 });
  }

  try {
    const body = await request.json();
    const { nama, alamat, wilayah, kelurahan } = body;

    if (!nama || !alamat || !wilayah || !kelurahan) {
      return new Response(JSON.stringify({ error: 'Semua field wajib diisi!' }), { status: 400 });
    }

    const updated = posyanduStore.update(id, { nama, alamat, wilayah, kelurahan });

    if (!updated) {
      return new Response(JSON.stringify({ error: 'Data tidak ditemukan!' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Data berhasil diupdate' }), { status: 200 });
  } catch (error) {
    console.error('Error updating data:', error);
    return new Response(JSON.stringify({ error: 'Gagal memproses permintaan' }), { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: { params?: { id?: string } }) {
  const id = Number(context.params?.id);
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID tidak valid' }), { status: 400 });
  }

  const deleted = posyanduStore.delete(id);

  if (!deleted) {
    return new Response(JSON.stringify({ error: 'Data tidak ditemukan!' }), { status: 404 });
  }

  return new Response(JSON.stringify({ message: 'Data berhasil dihapus', deleted }), { status: 200 });
}
