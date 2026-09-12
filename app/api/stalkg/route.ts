import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    // Coba via picuki (mirror publik instagram)
    const res = await fetch(`https://picuki.com/profile/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })

    const html = await res.text()

    if (html.includes('profile-name') === false) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan atau akun private' }, { status: 404 })
    }

    const nameMatch = html.match(/<h1 class="profile-name">([^<]+)<\/h1>/)
    const usernameMatch = html.match(/<h2 class="profile-nickname">([^<]+)<\/h2>/)
    const imgMatch = html.match(/<div class="profile-avatar">\s*<img src="([^"]+)"/)
    const bioMatch = html.match(/<div class="profile-description">([^<]+)<\/div>/)

    const statsMatches = [...html.matchAll(/<span class="following-count">([^<]+)<\/span>/g)]
    const followers = statsMatches[0]?.[1]?.trim() || '0'
    const following = statsMatches[1]?.[1]?.trim() || '0'
    const posts = statsMatches[2]?.[1]?.trim() || '0'

    const isVerified = html.includes('profile-verified') || html.includes('verified-icon')
    const isPrivate = html.includes('private-account') || html.includes('This Account is Private')

    return NextResponse.json({
      status: true,
      data: {
        username,
        full_name: nameMatch?.[1]?.trim() || username,
        bio: bioMatch?.[1]?.trim() || null,
        followers,
        following,
        posts,
        is_private: isPrivate,
        is_verified: isVerified,
        profile_pic: imgMatch?.[1] || null,
        ig_url: `https://instagram.com/${username}`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
