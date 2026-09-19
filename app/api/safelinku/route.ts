import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  try {
    // Step 1: Fetch halaman sfl.gl
    const r1 = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36' },
      redirect: 'follow'
    })
    const html = await r1.text()

    // Step 2: Extract ray_id dan alias
    const rayMatch = html.match(/name="ray_id"\s+value="([^"]+)"/)
    const aliasMatch = html.match(/name="alias"\s+value="([^"]+)"/)

    if (!rayMatch || !aliasMatch) {
      return NextResponse.json({ status: false, message: 'Gagal extract link' }, { status: 500 })
    }

    const ray_id = rayMatch[1]
    const alias = aliasMatch[1]

    // Step 3: Hit redirect
    const r2 = await fetch(`https://app.khaddavi.net/redirect.php?ray_id=${ray_id}&alias=${alias}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36',
        'Referer': url
      },
      redirect: 'follow'
    })

    const finalUrl = r2.url

    // Step 4: Cari link download di halaman hasil
    const html2 = await r2.text()
    const dlMatch = html2.match(/https?:\/\/(www\.)?(mediafire|drive\.google|mega\.nz|zippyshare)[^\s"'<>]+/)

    return NextResponse.json({
      status: true,
      input: url,
      result: dlMatch ? dlMatch[0] : finalUrl,
      author: 'Egii Apii'
    })

  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message }, { status: 500 })
  }
}
