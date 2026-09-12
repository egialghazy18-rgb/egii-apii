import { NextRequest, NextResponse } from 'next/server'

const operatorMap: Record<string, { operator: string; region: string }> = {
  '0811': { operator: 'Telkomsel', region: 'Indonesia' },
  '0812': { operator: 'Telkomsel', region: 'Indonesia' },
  '0813': { operator: 'Telkomsel', region: 'Indonesia' },
  '0821': { operator: 'Telkomsel', region: 'Indonesia' },
  '0822': { operator: 'Telkomsel', region: 'Indonesia' },
  '0823': { operator: 'Telkomsel', region: 'Indonesia' },
  '0851': { operator: 'Telkomsel', region: 'Indonesia' },
  '0852': { operator: 'Telkomsel', region: 'Indonesia' },
  '0853': { operator: 'Telkomsel', region: 'Indonesia' },
  '0814': { operator: 'Indosat', region: 'Indonesia' },
  '0815': { operator: 'Indosat', region: 'Indonesia' },
  '0816': { operator: 'Indosat', region: 'Indonesia' },
  '0855': { operator: 'Indosat', region: 'Indonesia' },
  '0856': { operator: 'Indosat', region: 'Indonesia' },
  '0857': { operator: 'Indosat', region: 'Indonesia' },
  '0858': { operator: 'Indosat', region: 'Indonesia' },
  '0817': { operator: 'XL Axiata', region: 'Indonesia' },
  '0818': { operator: 'XL Axiata', region: 'Indonesia' },
  '0819': { operator: 'XL Axiata', region: 'Indonesia' },
  '0859': { operator: 'XL Axiata', region: 'Indonesia' },
  '0877': { operator: 'XL Axiata', region: 'Indonesia' },
  '0878': { operator: 'XL Axiata', region: 'Indonesia' },
  '0831': { operator: 'Axis', region: 'Indonesia' },
  '0832': { operator: 'Axis', region: 'Indonesia' },
  '0833': { operator: 'Axis', region: 'Indonesia' },
  '0838': { operator: 'Axis', region: 'Indonesia' },
  '0881': { operator: 'Smartfren', region: 'Indonesia' },
  '0882': { operator: 'Smartfren', region: 'Indonesia' },
  '0883': { operator: 'Smartfren', region: 'Indonesia' },
  '0884': { operator: 'Smartfren', region: 'Indonesia' },
  '0885': { operator: 'Smartfren', region: 'Indonesia' },
  '0886': { operator: 'Smartfren', region: 'Indonesia' },
  '0887': { operator: 'Smartfren', region: 'Indonesia' },
  '0888': { operator: 'Smartfren', region: 'Indonesia' },
  '0889': { operator: 'Smartfren', region: 'Indonesia' },
  '0895': { operator: 'Three (3)', region: 'Indonesia' },
  '0896': { operator: 'Three (3)', region: 'Indonesia' },
  '0897': { operator: 'Three (3)', region: 'Indonesia' },
  '0898': { operator: 'Three (3)', region: 'Indonesia' },
  '0899': { operator: 'Three (3)', region: 'Indonesia' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ status: false, message: 'Parameter phone wajib diisi' }, { status: 400 })
  }

  const p62 = phone.startsWith('0') ? `62${phone.slice(1)}` : phone.startsWith('+') ? phone.slice(1) : phone
  const p08 = p62.startsWith('62') ? `0${p62.slice(2)}` : phone

  const prefix = p08.substring(0, 4)
  const opInfo = operatorMap[prefix] || { operator: 'Tidak diketahui', region: 'Indonesia' }

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
        operator: opInfo.operator,
        region: opInfo.region,
        wa_link: `https://wa.me/${p62}`
      },
      author: 'EgiiDev'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
