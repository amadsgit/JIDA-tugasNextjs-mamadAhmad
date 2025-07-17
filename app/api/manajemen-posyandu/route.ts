import { posyanduList } from './data';

export async function GET(request: Request) {
  return new Response(JSON.stringify(posyanduList), {
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

  const newPosyandu = {
    id: Date.now(),
    nama,
    alamat,
    wilayah,
    kelurahan,
  };

  posyanduList.push(newPosyandu);

  return new Response(JSON.stringify(newPosyandu), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
