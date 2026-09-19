import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  try {
    const apis = [
      `https://bypass.bot.nu/bypass?url=${encodeURIComponent(url)}`,
      `https://api.bypass.id/bypass?url=${encodeURIComponent(url)}`,
      `https://bypasslink.com/api?url=${encodeURIComponent(url)}`,
    ]

    for (const api of apis) {
      try {
        const res = await fetch(api, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(10000)
        })
        const data = await res.json()
        const result = data.destination || data.url || data.result || data.link || data.bypass

        if (result && !result.includes('SHUT DOWN') && !result.includes('discord') && result !== url) {
          return NextResponse.json({
            status: true,
            input: url,
            result,
            author: 'Egii Apii'
          })
        }
      } catch { continue }
    }

    return NextResponse.json({ status: false, message: 'Bypass gagal, coba lagi nanti' }, { status: 500 })

  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message }, { status: 500 })
  }
}
