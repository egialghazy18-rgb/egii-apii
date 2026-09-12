import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'X-IG-App-ID': '936619743392459',
        'X-ASBD-ID': '198387',
        'X-IG-WWW-Claim': '0',
        'Origin': 'https://www.instagram.com',
        'Referer': 'https://www.instagram.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      }
    })

    if (!res.ok) {
      // Fallback: scrape HTML meta tag
      const htmlRes = await fetch(`https://www.instagram.com/${username}/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        }
      })
      const html = await htmlRes.text()
      const titleMatch = html.match(/<title>([^<]+)<\/title>/)
      const descMatch = html.match(/<meta name="description" content="([^"]+)"/)

      if (!titleMatch || titleMatch[1].includes('Page Not Found')) {
        return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
      }

      const desc = descMatch?.[1] || ''
      const nums = desc.match(/[\d,]+/g) || []
      const parseN = (s: string) => parseInt(s.replace(/,/g, '')) || 0

      const fullName = titleMatch[1].replace(/\(@[^)]+\)/,'').replace('• Instagram','').trim()

      return NextResponse.json({
        status: true,
        data: {
          username,
          full_name: fullName,
          bio: desc.split(' - ')[1]?.trim() || null,
          followers: nums[0] ? parseN(nums[0]) : 0,
          following: nums[1] ? parseN(nums[1]) : 0,
          posts: nums[2] ? parseN(nums[2]) : 0,
          is_private: html.includes('"is_private":true'),
          is_verified: html.includes('"is_verified":true'),
          profile_pic: null,
          ig_url: `https://instagram.com/${username}`
        },
        author: 'Egii Apii'
      })
    }

    const json = await res.json()
    const user = json?.data?.user

    if (!user) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({
      status: true,
      data: {
        username: user.username,
        full_name: user.full_name,
        bio: user.biography || null,
        followers: user.edge_followed_by?.count || 0,
        following: user.edge_follow?.count || 0,
        posts: user.edge_owner_to_timeline_media?.count || 0,
        is_private: user.is_private,
        is_verified: user.is_verified,
        profile_pic: null,
        ig_url: `https://instagram.com/${username}`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
