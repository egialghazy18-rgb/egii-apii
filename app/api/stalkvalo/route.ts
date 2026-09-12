import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')
  const tag = searchParams.get('tag')

  if (!name || !tag) return NextResponse.json({ status: false, message: 'Parameter name dan tag wajib diisi' }, { status: 400 })

  try {
    const [accountRes, mmrRes] = await Promise.all([
      fetch(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`),
      fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/ap/${name}/${tag}`)
    ])

    const account = await accountRes.json()
    if (account.status !== 200) return NextResponse.json({ status: false, message: 'Player tidak ditemukan' }, { status: 404 })

    const mmr = await mmrRes.json()
    const d = account.data
    const m = mmr.data

    return NextResponse.json({
      status: true,
      data: {
        name: d.name,
        tag: d.tag,
        level: d.account_level,
        region: d.region?.toUpperCase(),
        avatar: d.card?.small || null,
        rank: m?.currenttierpatched || 'Unranked',
        rank_icon: m?.images?.small || null,
        elo: m?.elo || 0,
        last_match_change: m?.mmr_change_to_last_game || 0,
        profile_url: `https://tracker.gg/valorant/profile/riot/${encodeURIComponent(name)}%23${tag}/overview`
      },
      author: 'EgiiDev'
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
