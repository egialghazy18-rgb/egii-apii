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
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8'
      }
    })

    const html = await res.text()

    const name = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] ||
                 html.match(/<title>([^<]+)<\/title>/)?.[1] || null

    const desc = html.match(/<meta property="og:description" content="([^"]+)"/)?.[1] ||
                 html.match(/<meta name="description" content="([^"]+)"/)?.[1] || null

    const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || null

    const subsMatch = html.match(/(\d[\d,.]+[KkMm]?)\s*(?:subscriber|pengikut|follower|anggota|member)/i)
    const subscribers = subsMatch?.[1] || null

    const isValid = !!name && (url.includes('whatsapp.com/channel') || url.includes('chat.whatsapp.com'))

    if (!name) {
      return NextResponse.json({ status: false, message: 'Channel tidak ditemukan atau link tidak valid' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        valid: isValid,
        name: name.replace(' | WhatsApp Channel', '').replace(' - WhatsApp', '').trim(),
        description: desc,
        image,
        subscribers: subscribers || 'Tidak diketahui',
        url,
        type: url.includes('whatsapp.com/channel') ? 'Channel' : 'Group',
        platform: 'WhatsApp'
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
