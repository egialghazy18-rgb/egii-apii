import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const htmlRes = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })

    const html = await htmlRes.text()

    if (html.includes('Page Not Found') || html.includes('Sorry, this page') || htmlRes.status === 404) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    // Meta og:title: "full_name (@username) • Instagram"
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/)
    // Meta og:description: "X Followers, X Following, X Posts - See Instagram..."
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/)
    const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/)

    const title = titleMatch?.[1] || ''
    const desc = descMatch?.[1] || ''

    // Parse full_name dari title
    const fullName = title.replace(/\s*\(@[^)]+\)\s*/, '').replace(/\s*•\s*Instagram.*/, '').trim()

    // Parse dari description: "134 Followers, 297 Following, 7 Posts"
    const followersMatch = desc.match(/([\d,]+)\s+Followers?/i)
    const followingMatch = desc.match(/([\d,]+)\s+Following/i)
    const postsMatch = desc.match(/([\d,]+)\s+Posts?/i)

    const parseN = (s?: string) => s ? parseInt(s.replace(/,/g, '')) : 0

    // Parse bio (setelah dash)
    const bioMatch = desc.match(/\d+ Posts?\s*-\s*(.+)$/i)
    const bio = bioMatch?.[1]?.trim() || null

    if (!fullName) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        username,
        full_name: fullName,
        bio,
        followers: parseN(followersMatch?.[1]),
        following: parseN(followingMatch?.[1]),
        posts: parseN(postsMatch?.[1]),
        is_private: html.includes('"is_private":true'),
        is_verified: html.includes('"is_verified":true'),
        profile_pic: null,
        ig_url: `https://instagram.com/${username}`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
