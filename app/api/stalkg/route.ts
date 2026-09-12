import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://api.myquran.com/v2/sholat/kota/semua`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    // Pakai instaloader API publik
    const igRes = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        'User-Agent': 'Instagram 219.0.0.12.117 Android',
        'Accept': 'application/json',
        'X-IG-App-ID': '936619743392459',
      }
    })

    const data = await igRes.json()
    const user = data?.data?.user

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
        profile_pic: user.profile_pic_url_hd,
        external_url: user.external_url,
        category: user.category_name
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
