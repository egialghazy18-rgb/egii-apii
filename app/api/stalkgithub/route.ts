import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ status: false, message: 'Parameter username wajib diisi' }, { status: 400 })
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'EgiiApii' }
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'EgiiApii' }
      })
    ])

    if (!userRes.ok) {
      return NextResponse.json({ status: false, message: 'User tidak ditemukan' }, { status: 404 })
    }

    const user = await userRes.json()
    const repos = await reposRes.json()

    const totalStars = Array.isArray(repos) ? repos.reduce((acc: number, r: any) => acc + r.stargazers_count, 0) : 0
    const topRepos = Array.isArray(repos) ? repos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count).slice(0, 3).map((r: any) => ({ name: r.name, stars: r.stargazers_count, language: r.language, url: r.html_url })) : []

    return NextResponse.json({
      status: true,
      data: {
        username: user.login,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar_url,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        total_stars: totalStars,
        location: user.location,
        company: user.company,
        blog: user.blog,
        twitter: user.twitter_username,
        joined: new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        top_repos: topRepos,
        profile_url: user.html_url
      },
      author: 'Egii Apii'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
