import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  try {
    const channelId = url.split('/channel/')?.[1]?.split('?')?.[0]
    if (!channelId) {
      return NextResponse.json({ status: false, message: 'Link channel tidak valid' }, { status: 400 })
    }

    // Coba via api nexadev
    const res = await fetch(`https://api.nexadev.my.id/tools/wainfo?url=${encodeURIComponent(url)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.status) {
        return NextResponse.json({
          status: true,
          name: data.name || data.title || 'Tidak diketahui',
          subscribers: data.subscribers || data.members || 'Tidak diketahui',
          description: data.description || null,
          image: data.image || null,
          channel_id: channelId,
          url: `https://whatsapp.com/channel/${channelId}`,
          type: 'WhatsApp Channel',
          author: 'Egii Apii'
        })
      }
    }

    // Fallback
    return NextResponse.json({
      status: false,
      message: 'Tidak bisa mengambil info channel, WhatsApp memblokir akses'
    }, { status: 503 })

  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
