import { NextRequest, NextResponse } from 'next/server'

const operators: Record<string, string> = {
  '0811': 'Telkomsel', '0812': 'Telkomsel', '0813': 'Telkomsel',
  '0821': 'Telkomsel', '0822': 'Telkomsel', '0823': 'Telkomsel',
  '0851': 'Telkomsel', '0852': 'Telkomsel', '0853': 'Telkomsel',
  '0814': 'Indosat', '0815': 'Indosat', '0816': 'Indosat',
  '0855': 'Indosat', '0856': 'Indosat', '0857': 'Indosat', '0858': 'Indosat',
  '0817': 'XL Axiata', '0818': 'XL Axiata', '0819': 'XL Axiata',
  '0859': 'XL Axiata', '0877': 'XL Axiata', '0878': 'XL Axiata',
  '0831': 'Axis', '0832': 'Axis', '0833': 'Axis', '0838': 'Axis',
  '0881': 'Smartfren', '0882': 'Smartfren', '0883': 'Smartfren',
  '0884': 'Smartfren', '0885': 'Smartfren', '0886': 'Smartfren',
  '0887': 'Smartfren', '0888': 'Smartfren', '0889': 'Smartfren',
  '0895': 'Three (3)', '0896': 'Three (3)', '0897': 'Three (3)',
  '0898': 'Three (3)', '0899': 'Three (3)',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')
  if (!phone) return NextResponse.json({ status: false, message: 'Parameter phone wajib diisi' }, { status: 400 })

  const p62 = phone.startsWith('0') ? `62${phone.slice(1)}` : phone.startsWith('+') ? phone.slice(1) : phone
  const p08 = p62.startsWith('62') ? `0${p62.slice(2)}` : phone
  const prefix = p08.substring(0, 4)
  const operator = operators[prefix] || 'Tidak diketahui'

  try {
    const res = await fetch(`https://wa.me/${p62}`, {
      headers: { 'User-Agent': 'WhatsApp/2.23.20.0 A' },
      redirect: 'follow'
    })
    const html = await res.text()
    const notRegistered = html.includes('not on WhatsApp') || html.includes('tidak menggunakan WhatsApp') || html.toLowerCase().includes('invalid')
    const isActive = !notRegistered && res.status === 200

    return NextResponse.json({
      status: true,
      data: {
        phone_original: p08,
        phone_intl: `+${p62}`,
        whatsapp: isActive,
        status: isActive ? '✅ Aktif di WhatsApp' : '❌ Tidak terdaftar di WhatsApp',
        operator,
        region: 'Indonesia',
        wa_link: `https://wa.me/${p62}`
      },
      author: 'EgiiDev'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
