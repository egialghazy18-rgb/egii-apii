import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userid = searchParams.get('userid')
  const zoneid = searchParams.get('zoneid')
  if (!userid || !zoneid) return NextResponse.json({ status: false, message: 'Parameter userid dan zoneid wajib diisi' }, { status: 400 })

  try {
    const res = await fetch(`https://www.smile.one/smilecoin/api/queryroleid?product=mobilelegend&roleid=${userid}&zoneid=${zoneid}&lang=id`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://www.smile.one/'
      }
    })
    const data = await res.json()
    const username = data?.username || data?.data?.username || data?.role_name

    if (!username) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan, cek ID dan Zone ID' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        username,
        user_id: userid,
        zone_id: zoneid,
        game: 'Mobile Legends: Bang Bang'
      },
      author: 'EgiiDev'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
