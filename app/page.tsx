'use client'
import { useState } from 'react'

const neu = {
  card: { background: '#e0e5ec', borderRadius: '20px', padding: '20px', boxShadow: '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff', marginBottom: '20px' } as React.CSSProperties,
  input: { width: '100%', boxSizing: 'border-box' as const, background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', border: 'none', borderRadius: '12px', padding: '12px 14px', fontSize: '13px', color: '#444', outline: 'none' } as React.CSSProperties,
  label: { fontSize: '11px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '1px', display: 'block', marginBottom: '8px' } as React.CSSProperties,
  example: { background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', borderRadius: '12px', padding: '10px 14px', fontSize: '11px', color: '#888', marginBottom: '20px', fontFamily: 'monospace' } as React.CSSProperties,
  response: { background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', borderRadius: '12px', padding: '14px' } as React.CSSProperties
}

function Badge({ color, text }: any) {
  return <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color }}>{text}</div>
}

function Btn({ onClick, disabled, loading, label }: any) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', background: '#e0e5ec', boxShadow: disabled ? 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff' : '6px 6px 12px #b8bec7, -6px -6px 12px #ffffff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '14px', fontWeight: '700', color: disabled ? '#aaa' : '#444', cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {loading ? 'Loading...' : label}
    </button>
  )
}

function Card({ badge, color, path, name, desc, example, children }: any) {
  return (
    <div style={neu.card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Badge color={color} text="GET" />
        <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>{path}</code>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>{name}</span>
      </div>
      <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>{desc}</p>
      <div style={neu.example}>{example}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>{children}</div>
    </div>
  )
}

function Result({ data, color }: any) {
  if (!data) return null
  return (
    <div style={neu.response}>
      <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Response</p>
      <pre style={{ fontSize: '12px', color, margin: 0, overflow: 'auto' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default function Home() {
  const [nglUrl, setNglUrl] = useState('')
  const [nglPesan, setNglPesan] = useState('')
  const [nglJumlah, setNglJumlah] = useState('5')
  const [nglResult, setNglResult] = useState<any>(null)
  const [nglLoading, setNglLoading] = useState(false)

  const [igUser, setIgUser] = useState('')
  const [igResult, setIgResult] = useState<any>(null)
  const [igLoading, setIgLoading] = useState(false)

  const [tokUser, setTokUser] = useState('')
  const [tokResult, setTokResult] = useState<any>(null)
  const [tokLoading, setTokLoading] = useState(false)

  const [waPhone, setWaPhone] = useState('')
  const [waResult, setWaResult] = useState<any>(null)
  const [waLoading, setWaLoading] = useState(false)

  const extractUsername = (url: string) => {
    try { return new URL(url).pathname.replace('/', '').split('?')[0] }
    catch { return url.replace('https://ngl.link/', '').split('?')[0] }
  }

  const handleNgl = async () => {
    setNglLoading(true); setNglResult(null)
    const res = await fetch(`/api/nglspam?username=${extractUsername(nglUrl)}&pesan=${encodeURIComponent(nglPesan)}&jumlah=${nglJumlah}`)
    setNglResult(await res.json()); setNglLoading(false)
  }

  const handleIg = async () => {
    setIgLoading(true); setIgResult(null)
    const res = await fetch(`/api/stalkg?username=${igUser}`)
    setIgResult(await res.json()); setIgLoading(false)
  }

  const handleTok = async () => {
    setTokLoading(true); setTokResult(null)
    const res = await fetch(`/api/stalktok?username=${tokUser}`)
    setTokResult(await res.json()); setTokLoading(false)
  }

  const handleWa = async () => {
    setWaLoading(true); setWaResult(null)
    const res = await fetch(`/api/wacheck?phone=${waPhone}`)
    setWaResult(await res.json()); setWaLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#e0e5ec', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ ...neu.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e0e5ec', boxShadow: '4px 4px 8px #b8bec7, -4px -4px 8px #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', color: '#555' }}>E</div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: '#333' }}>Egii Apii</div>
            <div style={{ fontSize: '11px', color: '#888' }}>by SugengTeam</div>
          </div>
        </div>
        <div style={{ background: '#e0e5ec', borderRadius: '20px', padding: '4px 12px', boxShadow: 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff', fontSize: '11px', color: '#888' }}>v1.0.0</div>
      </div>

      <div style={{ marginBottom: '24px', paddingLeft: '4px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#333', margin: '0 0 6px' }}>API Documentation</h1>
        <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Base URL: <code style={{ background: '#e0e5ec', boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', color: '#555' }}>egii-2.vercel.app</code></p>
      </div>

      <Card color="#4CAF50" path="/api/nglspam" name="NGL Spam" desc="Kirim pesan anonim ke NGL link target" example="GET /api/nglspam?username=egiuu&pesan=hai&jumlah=10">
        <div>
          <label style={neu.label}>NGL Link</label>
          <input style={neu.input} placeholder="https://ngl.link/egiuu1" value={nglUrl} onChange={e => setNglUrl(e.target.value)} />
          {nglUrl && <p style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>Username: <span style={{ color: '#4CAF50', fontWeight: '600' }}>{extractUsername(nglUrl)}</span></p>}
        </div>
        <div><label style={neu.label}>Pesan</label><input style={neu.input} placeholder="hai 👋" value={nglPesan} onChange={e => setNglPesan(e.target.value)} /></div>
        <div><label style={neu.label}>Jumlah (max 50)</label><input type="number" style={neu.input} placeholder="5" value={nglJumlah} onChange={e => setNglJumlah(e.target.value)} /></div>
        <Btn onClick={handleNgl} disabled={nglLoading || !nglUrl || !nglPesan} loading={nglLoading} label="Send NGL Spam" />
        <Result data={nglResult} color="#4CAF50" />
      </Card>

      <Card color="#E1306C" path="/api/stalkg" name="Stalk Instagram" desc="Ambil info publik akun Instagram" example="GET /api/stalkg?username=cristiano">
        <div><label style={neu.label}>Username Instagram</label><input style={neu.input} placeholder="cristiano" value={igUser} onChange={e => setIgUser(e.target.value)} /></div>
        <Btn onClick={handleIg} disabled={igLoading || !igUser} loading={igLoading} label="Stalk Instagram" />
        <Result data={igResult} color="#E1306C" />
      </Card>

      <Card color="#000000" path="/api/stalktok" name="Stalk TikTok" desc="Ambil info publik akun TikTok" example="GET /api/stalktok?username=khaby.lame">
        <div><label style={neu.label}>Username TikTok</label><input style={neu.input} placeholder="khaby.lame" value={tokUser} onChange={e => setTokUser(e.target.value)} /></div>
        <Btn onClick={handleTok} disabled={tokLoading || !tokUser} loading={tokLoading} label="Stalk TikTok" />
        <Result data={tokResult} color="#333" />
      </Card>

      <Card color="#25D366" path="/api/wacheck" name="WA Check" desc="Cek nomor HP aktif di WhatsApp atau tidak" example="GET /api/wacheck?phone=08xxxxxxxxxx">
        <div><label style={neu.label}>Nomor HP</label><input style={neu.input} placeholder="08xxxxxxxxxx" value={waPhone} onChange={e => setWaPhone(e.target.value)} /></div>
        <Btn onClick={handleWa} disabled={waLoading || !waPhone} loading={waLoading} label="Check WhatsApp" />
        <Result data={waResult} color="#25D366" />
      </Card>

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Egii Apii — Made by SugengTeam</p>
    </main>
  )
}
