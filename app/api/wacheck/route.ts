import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ status: false, message: 'Parameter phone wajib diisi' }, { status: 400 })
  }

  const p62 = phone.startsWith('0') ? `62${phone.slice(1)}` : phone.startsWith('+') ? phone.slice(1) : phone

  try {
    const res = await fetch(`https://wa.me/${p62}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36'
      },
      redirect: 'follow'
    })

    const html = await res.text()
    const isActive = !html.includes('phone number shared via link is not on WhatsApp') && !html.includes('tidak menggunakan WhatsApp')

    return NextResponse.json({
      status: true,
      phone: p62,
      whatsapp: isActive,
      message: isActive ? 'Nomor aktif di WhatsApp' : 'Nomor tidak terdaftar di WhatsApp',
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
