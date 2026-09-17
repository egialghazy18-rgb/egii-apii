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

    return NextResponse.json({
      status: true,
      channel_id: channelId,
      url: `https://whatsapp.com/channel/${channelId}`,
      invite_link: `https://wa.me/channel/${channelId}`,
      type: 'WhatsApp Channel',
      note: 'Info lengkap tidak tersedia karena WhatsApp memblokir akses server',
      author: 'Egii Apii'
    })

  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
