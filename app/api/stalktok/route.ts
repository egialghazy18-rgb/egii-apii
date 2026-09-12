import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://www.tiktok.com/@${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Redmi Note 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'text/html',
      }
    })

    const html = await res.text()
    const match = html.match(/"uniqueId":"([^"]+)".*?"nickname":"([^"]+)".*?"followerCount":(\d+).*?"followingCount":(\d+).*?"heartCount":(\d+).*?"videoCount":(\d+).*?"verified":(true|false).*?"privateAccount":(true|false).*?"signature":"([^"]*)"/)

    if (!match) {
      const jsonMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/)
      if (!jsonMatch) {
        return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
      }
      const json = JSON.parse(jsonMatch[1])
      const user = json?.['__DEFAULT_SCOPE__']?.['webapp.user-detail']?.userInfo?.user
      const stats = json?.['__DEFAULT_SCOPE__']?.['webapp.user-detail']?.userInfo?.stats

      if (!user) {
        return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
      }

      return NextResponse.json({
        status: true,
        data: {
          username: user.uniqueId,
          nickname: user.nickname,
          bio: user.signature,
          followers: stats?.followerCount,
          following: stats?.followingCount,
          likes: stats?.heartCount,
          videos: stats?.videoCount,
          is_verified: user.verified,
          is_private: user.privateAccount,
          profile_pic: user.avatarLarger
        },
        author: 'Egii Apii'
      })
    }

    return NextResponse.json({
      status: true,
      data: {
        username: match[1],
        nickname: match[2],
        followers: parseInt(match[3]),
        following: parseInt(match[4]),
        likes: parseInt(match[5]),
        videos: parseInt(match[6]),
        is_verified: match[7] === 'true',
        is_private: match[8] === 'true',
        bio: match[9]
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
