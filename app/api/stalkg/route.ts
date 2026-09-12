import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    // Metode 1: via ?__a=1 (kadang masih work)
    const res = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.instagram.com/',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': 'ig_did=00000000-0000-0000-0000-000000000000; csrftoken=missing;'
      }
    })

    let user = null

    if (res.ok) {
      const json = await res.json()
      user = json?.graphql?.user || json?.data?.user
    }

    // Metode 2: scrape HTML jika metode 1 gagal
    if (!user) {
      const htmlRes = await fetch(`https://www.instagram.com/${username}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
          'Accept': 'text/html',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      })

      const html = await htmlRes.text()

      // Extract dari meta tag
      const fullNameMatch = html.match(/<meta property="og:title" content="([^"]+)"/)
      const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/)
      const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/)

      // Parse description: "X Followers, X Following, X Posts"
      const desc = descMatch?.[1] || ''
      const followersMatch = desc.match(/([\d,]+)\s*Followers/)
      const followingMatch = desc.match(/([\d,]+)\s*Following/)
      const postsMatch = desc.match(/([\d,]+)\s*Posts/)

      const parseNum = (s?: string) => s ? parseInt(s.replace(/,/g, '')) : 0

      if (fullNameMatch) {
        const fullName = fullNameMatch[1].replace(/ • Instagram$/, '').replace(/ \(@[^)]+\)$/, '').trim()

        return NextResponse.json({
          status: true,
          data: {
            username,
            full_name: fullName,
            bio: null,
            followers: parseNum(followersMatch?.[1]),
            following: parseNum(followingMatch?.[1]),
            posts: parseNum(postsMatch?.[1]),
            is_private: html.includes('"is_private":true'),
            is_verified: html.includes('"is_verified":true'),
            profile_pic: imgMatch?.[1] || null,
            external_url: null,
            category: null,
            method: 'html_scrape'
          },
          author: 'Egii Apii'
        })
      }

      return NextResponse.json({ status: false, message: 'User tidak ditemukan atau akun private' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        username: user.username,
        full_name: user.full_name,
        bio: user.biography,
        followers: user.edge_followed_by?.count,
        following: user.edge_follow?.count,
        posts: user.edge_owner_to_timeline_media?.count,
        is_private: user.is_private,
        is_verified: user.is_verified,
        profile_pic: user.profile_pic_url_hd || user.profile_pic_url,
        external_url: user.external_url,
        category: user.category_name,
        method: 'api'
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
