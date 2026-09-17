import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  const agents = [
    'WhatsApp/2.23.20.0 A',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Twitterbot/1.0',
    'LinkedInBot/1.0 (compatible; Mozilla/5.0)',
  ]

  for (const ua of agents) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html',
        }
      })

      if (!res.ok) continue

      const html = await res.text()
      const name = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1]
        ?.replace(' | WhatsApp Channel', '')
        ?.replace(' - WhatsApp', '')
        ?.trim()

      if (!name) continue

      const description = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1] || null
      const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || null
      const subsMatch = html.match(/(\d[\d,.]+[KkMm]?)\s*(?:subscriber|pengikut|follower|anggota)/i)

      return NextResponse.json({
        status: true,
        name,
        description,
        image,
        subscribers: subsMatch?.[1] || 'Tidak diketahui',
        type: url.includes('/channel/') ? 'Channel' : 'Group',
        url,
        author: 'Egii Apii'
      })
    } catch { continue }
  }

  return NextResponse.json({
    status: false,
    message: 'Channel tidak ditemukan atau WhatsApp memblokir akses'
  }, { status: 404 })
}
