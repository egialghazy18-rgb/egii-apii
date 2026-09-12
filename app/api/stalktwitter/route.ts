import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  if (!username) return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })

  try {
    const res = await fetch(`https://syndication.twitter.com/profile/oembed?screen_name=${username}`)
    
    const res2 = await fetch(`https://publish.twitter.com/oembed?url=https://twitter.com/${username}`)
    const data = await res2.json()

    // Scrape via nitter
    const nitterRes = await fetch(`https://nitter.poast.org/${username}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const html = await nitterRes.text()

    if (html.includes('User not found')) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    const nameMatch = html.match(/<a class="profile-card-fullname"[^>]*>([^<]+)<\/a>/)
    const bioMatch = html.match(/<p class="profile-bio"[^>]*>([\s\S]*?)<\/p>/)
    const avatarMatch = html.match(/<img class="profile-card-avatar"[^>]*src="([^"]+)"/)
    const followersMatch = html.match(/Followers<\/span>\s*<span[^>]*>([\d,]+)</)
    const followingMatch = html.match(/Following<\/span>\s*<span[^>]*>([\d,]+)</)
    const tweetsMatch = html.match(/Tweets<\/span>\s*<span[^>]*>([\d,]+)</)
    const verifiedMatch = html.includes('verified-icon')

    const parseN = (s?: string) => s ? parseInt(s.replace(/,/g, '')) : 0

    return NextResponse.json({
      status: true,
      data: {
        username,
        name: nameMatch?.[1]?.trim() || username,
        bio: bioMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || null,
        avatar: avatarMatch?.[1] ? `https://nitter.poast.org${avatarMatch[1]}` : null,
        followers: parseN(followersMatch?.[1]),
        following: parseN(followingMatch?.[1]),
        tweets: parseN(tweetsMatch?.[1]),
        is_verified: verifiedMatch,
        profile_url: `https://twitter.com/${username}`
      },
      author: 'EgiiDev'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
