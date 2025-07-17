import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'https://opendata.cimahikota.go.id/api/bigdata/dkkc/ckpn_mnss_dsr_lngkp_pd_by_mnrt_jk_kcmtn_psksms_d_kt_cmh_2';
    
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Next.js Server)',
        'Accept': 'application/json',
        'Referer': 'https://opendata.cimahikota.go.id',
        'Host': 'opendata.cimahikota.go.id',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API CIMAHI] Status:', response.status);
      const text = await response.text(); 
      console.error('[API CIMAHI] Body:', text);
      return NextResponse.json({ error: 'Gagal mengambil data dari API eksternal' }, { status: response.status });
    }

    const result = await response.json();

    console.log('[DEBUG] Contoh data dari API:', result?.data?.[0]);

    return NextResponse.json(result.data);
  } catch (error: any) {
    console.error('[API CIMAHI] Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
