export default {
  async fetch(request) {
    const url = new URL(request.url)
    const username = url.searchParams.get('username')
    if (!username) return Response.json({ status: false, message: 'username required' })

    const res = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    })

    const html = await res.text()
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/)
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/)

    const title = titleMatch?.[1] || ''
    const desc = descMatch?.[1] || ''

    if (!title || title.includes('Page Not Found')) {
      return Response.json({ status: false, message: 'User tidak ditemukan' })
    }

    const fullName = title.replace(/\s*\(@[^)]+\)\s*/, '').replace(/\s*•\s*Instagram.*/, '').trim()
    const followersMatch = desc.match(/([\d,]+)\s+Followers?/i)
    const followingMatch = desc.match(/([\d,]+)\s+Following/i)
    const postsMatch = desc.match(/([\d,]+)\s+Posts?/i)
    const parseN = (s) => s ? parseInt(s.replace(/,/g, '')) : 0
    const bioMatch = desc.match(/\d+ Posts?\s*-\s*(.+)$/i)

    return Response.json({
      status: true,
      data: {
        username,
        full_name: fullName,
        bio: bioMatch?.[1]?.trim() || null,
        followers: parseN(followersMatch?.[1]),
        following: parseN(followingMatch?.[1]),
        posts: parseN(postsMatch?.[1]),
        is_private: html.includes('"is_private":true'),
        is_verified: html.includes('"is_verified":true'),
        ig_url: `https://instagram.com/${username}`
      }
    }, { headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}
