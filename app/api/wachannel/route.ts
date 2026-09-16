import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36',
        'Accept': 'text/html'
      }
    })

    const html = await res.text()

    // Ambil nama channel
    const nameMatch = html.match(/<meta property="og:title" content="([^"]+)"/)
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/)
    const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
    const subsMatch = html.match(/(\d+(?:\.\d+)?[KkMm]?\+?)\s*(?:subscriber|pengikut|follower)/i)

    const name = nameMatch?.[1] || 'Tidak ditemukan'
    const desc = descMatch?.[1] || ''
    const image = imgMatch?.[1] || ''
    const subscribers = subsMatch?.[1] || 'Tidak diketahui'

    if (!nameMatch) {
      return NextResponse.json({ status: false, message: 'Channel tidak ditemukan atau link tidak valid' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        name,
        description: desc,
        image,
        subscribers,
        url,
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
