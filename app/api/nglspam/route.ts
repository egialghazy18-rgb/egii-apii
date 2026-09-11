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

async function kirimSatu(username: string, pesan: string, i: number) {
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
    return res.ok ? 1 : 0
  } catch {
    return 0
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const pesan = searchParams.get('pesan')
  const jumlah = Math.min(parseInt(searchParams.get('jumlah') || '1'), 100)

  if (!username || !pesan) {
    return NextResponse.json({ status: false, message: 'Parameter username dan pesan wajib diisi' }, { status: 400 })
  }

  let berhasil = 0
  let gagal = 0

  // Kirim per batch 3, delay 500-900ms antar batch
  const batchSize = 3
  for (let i = 0; i < jumlah; i += batchSize) {
    const batch = []
    for (let j = i; j < Math.min(i + batchSize, jumlah); j++) {
      batch.push(kirimSatu(username, pesan, j))
    }
    const results = await Promise.all(batch)
    results.forEach(r => r ? berhasil++ : gagal++)
    if (i + batchSize < jumlah) {
      await sleep(500 + Math.random() * 400)
    }
  }

  return NextResponse.json({
    status: true,
    username,
    pesan,
    jumlah,
    berhasil,
    gagal,
    author: 'Egii Apii'
  })
}
