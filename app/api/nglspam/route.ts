import { NextRequest, NextResponse } from 'next/server'

function randomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

function randomUA() {
  const uas = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
  ]
  return uas[Math.floor(Math.random() * uas.length)]
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function kirimSatu(username: string, pesan: string): Promise<boolean> {
  try {
    const deviceId = randomId()
    
    // Step 1: Get session dulu
    const pageRes = await fetch(`https://ngl.link/${username}`, {
      headers: {
        'User-Agent': randomUA(),
        'Accept': 'text/html',
      }
    })
    
    const cookies = pageRes.headers.get('set-cookie') || ''

    // Step 2: Kirim pesan
    const body = new URLSearchParams({
      username,
      question: pesan,
      deviceId,
      gameSlug: '',
      referrer: '',
    })

    const res = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: {
        'User-Agent': randomUA(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://ngl.link',
        'Referer': `https://ngl.link/${username}`,
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': cookies,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
      body
    })

    const data = await res.json()
    return !!data.questionId
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const pesan = searchParams.get('pesan')
  const jumlah = Math.min(parseInt(searchParams.get('jumlah') || '1'), 50)

  if (!username || !pesan) {
    return NextResponse.json({ status: false, message: 'Parameter username dan pesan wajib diisi' }, { status: 400 })
  }

  let berhasil = 0
  let gagal = 0

  for (let i = 0; i < jumlah; i++) {
    const ok = await kirimSatu(username, pesan)
    if (ok) berhasil++
    else gagal++
    await sleep(500 + Math.random() * 500)
  }

  return NextResponse.json({
    status: true,
    username,
    pesan,
    target: jumlah,
    berhasil,
    gagal,
    author: 'EgiiDev'
  })
}
