// api/manajemen-posyandu/route.ts
import { posyanduStore } from './data';

export async function GET() {
  return new Response(JSON.stringify(posyanduStore.getAll()), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { nama, alamat, wilayah, kelurahan } = body;

  if (!nama || !alamat || !wilayah || !kelurahan) {
    return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newItem = {
    id: Date.now(),
    nama,
    alamat,
    wilayah,
    kelurahan,
  };

  posyanduStore.add(newItem);

  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
