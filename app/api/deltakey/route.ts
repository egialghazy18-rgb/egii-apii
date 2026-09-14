import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

async function bypassLink(url: string) {
  // Coba bypass.vip dulu
  try {
    const res = await fetch(`https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    })
    const data = await res.json()
    if (data?.result) return data.result
  } catch {}

  // Coba bypass.city
  try {
    const res = await fetch(`https://api.bypass.city/bypass?url=${encodeURIComponent(url)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    })
    const data = await res.json()
    if (data?.result) return data.result
  } catch {}

  return null
}

function extractKey(text: string) {
  // Cari pola key Delta
  const patterns = [
    /delta[-_]?[a-zA-Z0-9]{8,}/i,
    /key[:\s=]+([a-zA-Z0-9\-_]{10,})/i,
    /[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/,
    /DELTA[-_][A-Z0-9]+/i,
  ]
  for (const p of patterns) {
    const m = text.match(p)
    if (m) return m[0]
  }
  return null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ 
      status: false, 
      message: 'Paste link Delta key system kamu di parameter url' 
    }, { status: 400 })
  }

  try {
    // Step 1: bypass link pertama
    let current = url
    let steps = []
    let key = null

    for (let i = 0; i < 5; i++) {
      const bypassed = await bypassLink(current)
      if (!bypassed) break
      
      steps.push(bypassed)

      // Cek apakah sudah ada key
      key = extractKey(bypassed)
      if (key) break

      // Kalau masih link, lanjut bypass
      if (bypassed.startsWith('http')) {
        current = bypassed
      } else {
        key = bypassed
        break
      }
    }

    if (key) {
      return NextResponse.json({
        status: true,
        key,
        steps,
        original_url: url,
        author: 'Egii Apii'
      })
    }

    // Kalau ga ketemu key, kembalikan hasil bypass terakhir
    if (steps.length > 0) {
      return NextResponse.json({
        status: true,
        key: steps[steps.length - 1],
        steps,
        original_url: url,
        note: 'Mungkin perlu step manual tambahan',
        author: 'Egii Apii'
      })
    }

    return NextResponse.json({
      status: false,
      message: 'Gagal bypass link, coba link yang valid dari Delta key system',
      author: 'Egii Apii'
    }, { status: 422 })

  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
