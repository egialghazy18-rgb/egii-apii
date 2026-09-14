import { NextResponse } from 'next/server'

const endpoints = [
  { name: 'Stalk Instagram', path: '/api/stalkg?username=cristiano' },
  { name: 'Stalk TikTok', path: '/api/stalktok?username=khaby.lame' },
  { name: 'Stalk Roblox', path: '/api/stalkroblox?username=Builderman' },
  { name: 'Stalk GitHub', path: '/api/stalkgithub?username=torvalds' },
  { name: 'Stalk Twitter', path: '/api/stalktwitter?username=elonmusk' },
  { name: 'Stalk Valorant', path: '/api/stalkvalo?name=TenZ&tag=0000' },
  { name: 'Stalk ML', path: '/api/stalkml?userid=1239858524&zoneid=15021' },
  { name: 'WA Check', path: '/api/wacheck?phone=08123456789' },
  { name: 'NGL Spam', path: '/api/nglspam?username=eguu&pesan=test&jumlah=1' },
]

export async function GET(req: Request) {
  const base = new URL(req.url).origin

  const results = await Promise.all(
    endpoints.map(async (ep) => {
      const start = Date.now()
      try {
        const res = await fetch(`${base}${ep.path}`, {
          signal: AbortSignal.timeout(8000)
        })
        const data = await res.json()
        const latency = Date.now() - start
        const ok = data?.status === true
        return {
          name: ep.name,
          status: ok ? (latency > 3000 ? 'slow' : 'ok') : 'error',
          latency,
          message: ok ? 'Normal' : (data?.message || 'Error')
        }
      } catch (e: any) {
        return {
          name: ep.name,
          status: 'down',
          latency: Date.now() - start,
          message: e.message || 'Timeout'
        }
      }
    })
  )

  const summary = {
    ok: results.filter(r => r.status === 'ok').length,
    slow: results.filter(r => r.status === 'slow').length,
    error: results.filter(r => r.status === 'error').length,
    down: results.filter(r => r.status === 'down').length,
  }

  return NextResponse.json({ status: true, summary, endpoints: results, author: 'EgiiDev' })
}
