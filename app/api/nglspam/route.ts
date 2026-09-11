import { NextRequest, NextResponse } from 'next/server'

function randomId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
}

function randomUA() {
  const uas = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 14; OnePlus 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
  ]
  return uas[Math.floor(Math.random() * uas.length)]
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function kirimSatu(username: string, pesan: string): Promise<boolean> {
  try {
    const res = await fetch('https://ngl.link/api/submit', {
      method: 'POST',
      headers: {
        'User-Agent': randomUA(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `https://ngl.link/${username}`,
        'Origin': 'https://ngl.link',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      body: new URLSearchParams({
        username,
        question: pesan,
        deviceId: randomId(),
        gameSlug: '',
        referrer: ''
      })
    })
    if (res.ok) {
      const data = await res.json()
      return !!data.questionId
    }
    return false
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const pesan = searchParams.get('pesan')
  const jumlah = Math.min(parseInt(searchParams.get('jumlah') || '1'), 100)

  if (!username || !pesan) {
    return NextResponse.json({ 
      status: false, 
      message: 'Parameter username dan pesan wajib diisi' 
    }, { status: 400 })
  }

  let berhasil = 0
  let gagal = 0
  const maxRetry = jumlah * 3

  let attempt = 0
  while (berhasil < jumlah && attempt < maxRetry) {
    // Kirim 2 sekaligus
    const sisa = jumlah - berhasil
    const batch = Math.min(2, sisa)
    const results = await Promise.all(
      Array.from({ length: batch }, () => kirimSatu(username, pesan))
    )
    
    for (const ok of results) {
      if (ok) berhasil++
      else gagal++
    }
    
    attempt += batch

    // Delay hanya kalau belum selesai
    if (berhasil < jumlah) {
      await sleep(300 + Math.random() * 200)
    }
  }

  return NextResponse.json({
    status: true,
    username,
    pesan,
    target: jumlah,
    berhasil,
    gagal,
    author: 'Egii Apii'
  })
}
