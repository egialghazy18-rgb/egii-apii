import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userid = searchParams.get('userid')
  const zoneid = searchParams.get('zoneid')

  if (!userid || !zoneid) {
    return NextResponse.json({ status: false, message: 'Parameter userid dan zoneid wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch('https://order.mobilelegends.com/api/user/getUserByRoleId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://order.mobilelegends.com',
        'Referer': 'https://order.mobilelegends.com/'
      },
      body: JSON.stringify({ roleId: userid, zoneId: zoneid })
    })

    const text = await res.text()
    
    try {
      const data = JSON.parse(text)
      const username = data?.data?.username || data?.username || data?.name

      if (username) {
        return NextResponse.json({
          status: true,
          data: { username, user_id: userid, zone_id: zoneid, game: 'Mobile Legends: Bang Bang' },
          author: 'EgiiDev'
        })
      }
    } catch {}

    // Fallback: codashop
    const res2 = await fetch(`https://order.codashop.com/api-id/product.list?voucherPricePoint.id=167&voucherPricePoint.price=1000&voucherPricePoint.variationId=&userId=${userid}&zoneId=${zoneid}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const data2 = await res2.json()
    const username2 = data2?.confirmationFields?.username

    if (username2) {
      return NextResponse.json({
        status: true,
        data: { username: username2, user_id: userid, zone_id: zoneid, game: 'Mobile Legends: Bang Bang' },
        author: 'EgiiDev'
      })
    }

    return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
