import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  try {
    const r1 = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      redirect: 'follow'
    })

    const html = await r1.text()
    const snippet = html.substring(0, 500)

    const rayMatch = html.match(/name="ray_id"\s+value="([^"]+)"/)
    const aliasMatch = html.match(/name="alias"\s+value="([^"]+)"/)

    if (!rayMatch || !aliasMatch) {
      return NextResponse.json({
        status: false,
        message: 'Gagal extract link',
        debug: snippet
      }, { status: 500 })
    }

    const ray_id = rayMatch[1]
    const alias = aliasMatch[1]

    const r2 = await fetch(`https://app.khaddavi.net/redirect.php?ray_id=${ray_id}&alias=${alias}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': url
      },
      redirect: 'follow'
    })

    const html2 = await r2.text()
    const dlMatch = html2.match(/https?:\/\/(www\.)?(mediafire|drive\.google|mega\.nz|zippyshare)[^\s"'<>]+/)

    return NextResponse.json({
      status: true,
      input: url,
      result: dlMatch ? dlMatch[0] : r2.url,
      author: 'Egii Apii'
    })

  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message }, { status: 500 })
  }
}
