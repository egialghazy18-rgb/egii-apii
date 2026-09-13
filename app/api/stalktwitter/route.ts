import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  if (!username) return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })

  const nitterInstances = [
    'https://nitter.privacydev.net',
    'https://nitter.poast.org',
    'https://nitter.lucabased.xyz',
  ]

  for (const instance of nitterInstances) {
    try {
      const res = await fetch(`${instance}/${username}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(5000)
      })
      const html = await res.text()
      if (html.includes('User not found') || !html.includes('profile-card')) continue

      const nameMatch = html.match(/class="profile-card-fullname"[^>]*>([^<]+)</)
      const bioMatch = html.match(/class="profile-bio"[^>]*><p>([\s\S]*?)<\/p>/)
      const avatarMatch = html.match(/class="profile-card-avatar"[^>]*>\s*<a[^>]*>\s*<img[^>]*src="([^"]+)"/)
      const followersMatch = html.match(/followers[\s\S]*?<span class="profile-stat-num">([\d,]+)</)
      const followingMatch = html.match(/following[\s\S]*?<span class="profile-stat-num">([\d,]+)</)
      const tweetsMatch = html.match(/tweets[\s\S]*?<span class="profile-stat-num">([\d,]+)</)
      const parseN = (s?: string) => s ? parseInt(s.replace(/,/g, '')) : 0

      return NextResponse.json({
        status: true,
        data: {
          username,
          name: nameMatch?.[1]?.trim() || username,
          bio: bioMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || null,
          avatar: avatarMatch?.[1] ? `${instance}${avatarMatch[1]}` : null,
          followers: parseN(followersMatch?.[1]),
          following: parseN(followingMatch?.[1]),
          tweets: parseN(tweetsMatch?.[1]),
          is_verified: html.includes('verified-icon'),
          profile_url: `https://twitter.com/${username}`
        },
        author: 'EgiiDev'
      })
    } catch { continue }
  }

  return NextResponse.json({ status: false, message: 'User tidak ditemukan atau semua server down' }, { status: 404 })
}
