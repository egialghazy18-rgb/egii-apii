import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })

    const html = await res.text()

    const fullNameMatch = html.match(/<meta property="og:title" content="([^"]+)"/)
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/)

    if (!fullNameMatch) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    const desc = descMatch?.[1] || ''
    const followersMatch = desc.match(/([\d,.]+[KMB]?)\s*Followers/)
    const followingMatch = desc.match(/([\d,.]+[KMB]?)\s*Following/)
    const postsMatch = desc.match(/([\d,.]+[KMB]?)\s*Posts/)

    const fullName = fullNameMatch[1]
      .replace(/ • Instagram$/, '')
      .replace(/ \(@[^)]+\)$/, '')
      .trim()

    return NextResponse.json({
      status: true,
      data: {
        username,
        full_name: fullName,
        followers: followersMatch?.[1] || '0',
        following: followingMatch?.[1] || '0',
        posts: postsMatch?.[1] || '0',
        is_private: html.includes('"is_private":true'),
        is_verified: html.includes('"is_verified":true'),
        ig_url: `https://instagram.com/${username}`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
