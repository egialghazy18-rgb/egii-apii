import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  if (!username) return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  try {
    const res = await fetch(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        'User-Agent': 'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)',
        'Accept': '*/*',
        'X-IG-App-ID': '936619743392459',
      }
    })
    if (!res.ok) return NextResponse.json({ status: false, message: `Instagram error: ${res.status}` }, { status: res.status })
    const data = await res.json()
    const user = data?.data?.user
    if (!user) return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
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
