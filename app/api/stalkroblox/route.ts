import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const searchRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
    })
    const searchData = await searchRes.json()
    const user = searchData?.data?.[0]

    if (!user) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    const userId = user.id

    const [detailRes, friendRes, followerRes, followingRes, avatarRes] = await Promise.all([
      fetch(`https://users.roblox.com/v1/users/${userId}`),
      fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`),
      fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`),
      fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`),
      fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png`)
    ])

    const [detail, friend, follower, following, avatar] = await Promise.all([
      detailRes.json(), friendRes.json(), followerRes.json(), followingRes.json(), avatarRes.json()
    ])

    return NextResponse.json({
      status: true,
      data: {
        username: detail.name,
        display_name: detail.displayName,
        user_id: userId,
        bio: detail.description || null,
        is_banned: detail.isBanned,
        is_verified: detail.hasVerifiedBadge,
        created: new Date(detail.created).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        friends: friend?.count || 0,
        followers: follower?.count || 0,
        following: following?.count || 0,
        profile_pic: avatar?.data?.[0]?.imageUrl || null,
        profile_url: `https://www.roblox.com/users/${userId}/profile`
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
