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
    // Cek via whatsapp API check
    const res = await fetch(`https://api.whatsapp.com/send?phone=${p62}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
      },
      redirect: 'follow'
    })

    const html = await res.text()

    const isActive = html.includes('"phoneNumber"') ||
                     html.includes(p62) ||
                     (res.status === 200 && !html.includes('invalid') && !html.includes('not on WhatsApp'))

    // Coba ambil nama dari HTML jika ada
    const nameMatch = html.match(/"name"\s*:\s*"([^"]+)"/)
    const name = nameMatch ? nameMatch[1] : null

    return NextResponse.json({
      status: true,
      data: {
        phone_original: p08,
        phone_intl: `+${p62}`,
        whatsapp: isActive,
        name: name || null,
        status: isActive ? '✅ Aktif di WhatsApp' : '❌ Tidak terdaftar di WhatsApp',
        wa_link: `https://wa.me/${p62}`,
        wa_chat: `https://api.whatsapp.com/send?phone=${p62}`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
