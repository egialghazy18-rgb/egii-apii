import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ status: false, message: 'Parameter phone wajib diisi' }, { status: 400 })
  }

  const p62 = phone.startsWith('0') ? `62${phone.slice(1)}` : phone.startsWith('+') ? phone.slice(1) : phone
  const p08 = p62.startsWith('62') ? `0${p62.slice(2)}` : phone

  try {
    const res = await fetch(`https://wa.me/${p62}`, {
      headers: {
        'User-Agent': 'WhatsApp/2.23.20.0 A',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow'
    })

    const html = await res.text()

    const notRegistered =
      html.includes('phone number shared via link is not on WhatsApp') ||
      html.includes('tidak menggunakan WhatsApp') ||
      html.includes('not on WhatsApp') ||
      html.toLowerCase().includes('invalid')

    const isActive = !notRegistered && res.status === 200

    return NextResponse.json({
      status: true,
      data: {
        phone_original: p08,
        phone_intl: `+${p62}`,
        whatsapp: isActive,
        status: isActive ? '✅ Aktif di WhatsApp' : '❌ Tidak terdaftar di WhatsApp',
        wa_link: `https://wa.me/${p62}`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
