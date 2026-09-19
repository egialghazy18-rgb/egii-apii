import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://api.bypass.vip/bypass?url=${encodeURIComponent(url)}`)
    const data = await res.json()

    return NextResponse.json({
      status: true,
      input: url,
      result: data.destination || data.url || data,
      author: 'Egii Apii'
    })
  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message }, { status: 500 })
  }
}
