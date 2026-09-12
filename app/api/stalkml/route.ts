import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userid = searchParams.get('userid')
  const zoneid = searchParams.get('zoneid')

  if (!userid || !zoneid) {
    return NextResponse.json({ status: false, message: 'Parameter userid dan zoneid wajib diisi' }, { status: 400 })
  }

  try {
    // Cek nickname via API ML
    const checkRes = await fetch(`https://api.duniagames.co.id/api/transaction/v1/top-up/7/check-role?roleId=${userid}&zoneId=${zoneid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    })

    const checkData = await checkRes.json()

    if (!checkData?.data?.username) {
      // Fallback ke API lain
      const res2 = await fetch(`https://order.mobilelegends.com/api/user/getUserByRoleId?roleId=${userid}&zoneId=${zoneid}`)
      const data2 = await res2.json()
      
      if (!data2?.data?.username) {
        return NextResponse.json({ status: false, message: 'User tidak ditemukan, cek ID dan Zone ID' }, { status: 404 })
      }

      return NextResponse.json({
        status: true,
        data: {
          username: data2.data.username,
          user_id: userid,
          zone_id: zoneid,
          game: 'Mobile Legends: Bang Bang'
        },
        author: 'EgiiDev'
      })
    }

    return NextResponse.json({
      status: true,
      data: {
        username: checkData.data.username,
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
