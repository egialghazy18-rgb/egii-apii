import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Redmi Note 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json',
        'X-IG-App-ID': '936619743392459',
        'Cookie': 'ig_did=1; ig_nonce=1;'
      }
    })

    const data = await res.json()
    const user = data?.graphql?.user || data?.data?.user

    if (!user) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
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
        external_url: user.external_url
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
