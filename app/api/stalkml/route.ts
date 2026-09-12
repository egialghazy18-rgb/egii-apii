import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userid = searchParams.get('userid')
  const zoneid = searchParams.get('zoneid')

  if (!userid || !zoneid) {
    return NextResponse.json({ status: false, message: 'Parameter userid dan zoneid wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://liquidpay.com.sg/api/v2/check_user?game_id=mobilelegends&user_id=${userid}&zone_id=${zoneid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    })

    const data = await res.json()

    if (data?.username || data?.data?.username) {
      const username = data?.username || data?.data?.username
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
    }

    // Fallback: smilegate
    const res2 = await fetch(`https://games.mobileapi.co/api/check?game=mobilelegend&userid=${userid}&zoneid=${zoneid}`)
    const data2 = await res2.json()

    if (data2?.name || data2?.username) {
      return NextResponse.json({
        status: true,
        data: {
          username: data2?.name || data2?.username,
          user_id: userid,
          zone_id: zoneid,
          game: 'Mobile Legends: Bang Bang'
        },
        author: 'EgiiDev'
      })
    }

    return NextResponse.json({ status: false, message: 'User tidak ditemukan, cek ID dan Zone ID' }, { status: 404 })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
