import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userid = searchParams.get('userid')
  const zoneid = searchParams.get('zoneid')

  if (!userid || !zoneid) {
    return NextResponse.json({ status: false, message: 'Parameter userid dan zoneid wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://order2.mobilelegends.com/diamond/id/checkrole?roleId=${userid}&zoneId=${zoneid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://order2.mobilelegends.com/'
      }
    })

    const data = await res.json()
    const username = data?.data?.roleName || data?.roleName

    if (!username) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan, cek ID dan Zone ID' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        username,
        user_id: userid,
        zone_id: zoneid,
        server: data?.data?.zoneId || zoneid,
        game: 'Mobile Legends: Bang Bang'
      },
      author: 'EgiiDev'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
