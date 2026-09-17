'use client'
import { useState, useEffect } from 'react'

const neu = { background: '#e0e5ec', borderRadius: '20px', padding: '20px', boxShadow: '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff', marginBottom: '20px' } as React.CSSProperties
const neu2 = { background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#888', marginBottom: '8px' } as React.CSSProperties
const neuInput = { background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', borderRadius: '12px', padding: '14px', fontSize: '14px', color: '#444', outline: 'none', border: 'none', width: '100%' } as React.CSSProperties

const STATUS_COLORS: any = {
  ok: { bg: 'linear-gradient(135deg, #00c853, #69f0ae)', text: '#fff', label: '● Online', dot: '#00e676' },
  slow: { bg: 'linear-gradient(135deg, #ff6f00, #ffd740)', text: '#fff', label: '● Lambat', dot: '#ffd740' },
  error: { bg: 'linear-gradient(135deg, #c62828, #ef5350)', text: '#fff', label: '● Error', dot: '#ef5350' },
  down: { bg: 'linear-gradient(135deg, #37474f, #78909c)', text: '#fff', label: '● Down', dot: '#78909c' },
}

function Btn({ onClick, disabled, loading, label, color }: any) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', background: disabled ? '#e0e5ec' : color, color: disabled ? '#aaa' : '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: disabled ? 'none' : '4px 4px 8px #b8bec7, -2px -2px 6px #ffffff', marginTop: '8px' }}>
      {loading ? 'Loading...' : label}
    </button>
  )
}

function StatGrid({ items }: { items: { val: any, label: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '8px', margin: '10px 0' }}>
      {items.map(({ val, label }) => (
        <div key={label} style={{ background: '#e0e5ec', borderRadius: '10px', padding: '8px 4px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff', textAlign: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '13px', color: '#333' }}>{val}</div>
          <div style={{ fontSize: '10px', color: '#888' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}

function Avatar({ src }: { src: string }) {
  return <img src={src} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: '4px 4px 8px #b8bec7', display: 'block', margin: '0 auto 10px' }} onError={(e: any) => e.target.style.display = 'none'} />
}

function ErrorCard({ data }: any) {
  if (!data || data.status !== false) return null
  return <div style={{ ...neu2, marginTop: '12px', color: '#f44', textAlign: 'center' }}>❌ {data.message}</div>
}

function Section({ path, label, color, children }: any) {
  return (
    <div style={neu}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color }}>GET</div>
        <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>{path}</code>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>{label}</span>
      </div>
      {children}
    </div>
  )
}

function IgCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.profile_pic && <Avatar src={d.profile_pic} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.full_name} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.is_private && <div style={{ color: '#f44', fontSize: '11px' }}>🔒 Private</div>}
      {d.bio && <div style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>{d.bio}</div>}
      <StatGrid items={[{ val: Number(d.followers).toLocaleString(), label: 'Followers' }, { val: Number(d.following).toLocaleString(), label: 'Following' }, { val: Number(d.posts).toLocaleString(), label: 'Posts' }]} />
      <a href={`https://instagram.com/${d.username}`} target="_blank" style={{ color: '#E1306C', fontWeight: '700', textDecoration: 'none' }}>📸 Buka Instagram</a>
    </div>
  )
}

function TokCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.profile_pic && <Avatar src={d.profile_pic} />}
      <div style={{ fontWeight: '700', fontSize: '16px', color: '#333' }}>{d.nickname} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>{d.bio}</div>}
      <StatGrid items={[{ val: Number(d.followers).toLocaleString(), label: 'Followers' }, { val: Number(d.following).toLocaleString(), label: 'Following' }, { val: Number(d.videos).toLocaleString(), label: 'Videos' }, { val: Number(d.likes).toLocaleString(), label: 'Likes' }]} />
    </div>
  )
}

function RobloxCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.profile_pic && <Avatar src={d.profile_pic} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.display_name} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.is_banned && <div style={{ color: '#f44', fontSize: '11px' }}>🔨 Dibanned</div>}
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '8px 0' }}>{d.bio}</div>}
      <StatGrid items={[{ val: Number(d.friends).toLocaleString(), label: 'Friends' }, { val: Number(d.followers).toLocaleString(), label: 'Followers' }, { val: Number(d.following).toLocaleString(), label: 'Following' }]} />
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>📅 {d.created}</div>
      <a href={d.profile_url} target="_blank" style={{ color: '#e53935', fontWeight: '700', textDecoration: 'none' }}>🎮 Buka Roblox</a>
    </div>
  )
}

function GithubCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.avatar && <Avatar src={d.avatar} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name || d.username}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '6px 0' }}>{d.bio}</div>}
      {d.location && <div style={{ fontSize: '12px', color: '#888' }}>📍 {d.location}</div>}
      <StatGrid items={[{ val: Number(d.followers).toLocaleString(), label: 'Followers' }, { val: Number(d.following).toLocaleString(), label: 'Following' }, { val: Number(d.public_repos).toLocaleString(), label: 'Repos' }, { val: Number(d.total_stars).toLocaleString(), label: 'Stars' }]} />
      {d.top_repos?.length > 0 && (
        <div style={{ textAlign: 'left', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', marginBottom: '6px' }}>⭐ TOP REPOS</div>
          {d.top_repos.map((r: any) => (
            <a key={r.name} href={r.url} target="_blank" style={{ display: 'block', textDecoration: 'none', background: '#e0e5ec', borderRadius: '10px', padding: '8px 10px', marginBottom: '6px', boxShadow: '3px 3px 6px #b8bec7' }}>
              <div style={{ fontWeight: '700', fontSize: '12px', color: '#333' }}>{r.name}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{r.language || 'Unknown'} • ⭐ {r.stars}</div>
            </a>
          ))}
        </div>
      )}
      <a href={d.profile_url} target="_blank" style={{ color: '#333', fontWeight: '700', textDecoration: 'none' }}>🐙 Buka GitHub</a>
    </div>
  )
}

function TwitterCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.avatar && <Avatar src={d.avatar} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '6px 0' }}>{d.bio}</div>}
      <StatGrid items={[{ val: Number(d.followers).toLocaleString(), label: 'Followers' }, { val: Number(d.following).toLocaleString(), label: 'Following' }, { val: Number(d.tweets).toLocaleString(), label: 'Tweets' }]} />
      <a href={d.profile_url} target="_blank" style={{ color: '#1DA1F2', fontWeight: '700', textDecoration: 'none' }}>🐦 Buka Twitter</a>
    </div>
  )
}

function ValoCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name}<span style={{ color: '#ff4655' }}>#{d.tag}</span></div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '8px' }}>Level {d.level} • {d.region}</div>
      {d.rank_icon && <img src={d.rank_icon} alt="rank" style={{ width: '48px', height: '48px', margin: '4px auto', display: 'block' }} />}
      <div style={{ fontWeight: '700', fontSize: '16px', color: '#ff4655', marginBottom: '4px' }}>{d.rank}</div>
      <StatGrid items={[{ val: d.elo, label: 'ELO' }, { val: (d.last_match_change > 0 ? '+' : '') + d.last_match_change, label: 'Last Match' }]} />
      <a href={d.profile_url} target="_blank" style={{ color: '#ff4655', fontWeight: '700', textDecoration: 'none' }}>🎯 Lihat Stats</a>
    </div>
  )
}

function MLCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏆</div>
      <div style={{ fontWeight: '700', fontSize: '16px', color: '#333' }}>{d.username}</div>
      <div style={{ fontSize: '12px', color: '#888' }}>{d.game}</div>
      <StatGrid items={[{ val: d.user_id, label: 'User ID' }, { val: d.zone_id, label: 'Zone ID' }]} />
    </div>
  )
}

function WaCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px' }}>
      <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '8px' }}>{d.whatsapp ? '✅' : '❌'}</div>
      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '15px', color: d.whatsapp ? '#25D366' : '#f44', marginBottom: '12px' }}>{d.status}</div>
      <div style={{ fontSize: '13px', color: '#555', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div>📱 <b>Nomor:</b> {d.phone_original}</div>
        <div>🌐 <b>Internasional:</b> {d.phone_intl}</div>
        {d.whatsapp && <div style={{ marginTop: '8px', textAlign: 'center' }}><a href={d.wa_link} target="_blank" style={{ color: '#25D366', fontWeight: '700', textDecoration: 'none' }}>💬 Chat via WhatsApp</a></div>}
      </div>
    </div>
  )
}

function WaChannelCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.image && <img src={d.image} alt="channel" style={{ width: 70, height: 70, borderRadius: '50%', display: 'block', margin: '0 auto 10px', objectFit: 'cover' }} onError={(e: any) => e.target.style.display = 'none'} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name}</div>
      <div style={{ fontSize: '12px', color: '#888', margin: '4px 0 8px' }}>👥 {d.subscribers} Subscriber</div>
      {d.description && <div style={{ fontSize: '12px', color: '#555' }}>{d.description}</div>}
    </div>
  )
}

function DeltaCard({ data }: any) {
  if (!data?.status) return null
  return (
    <div style={{ ...neu2, marginTop: '12px' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '28px' }}>🔑</div>
        <div style={{ fontWeight: '700', fontSize: '14px', color: '#7c3aed', marginBottom: '6px' }}>Key Berhasil Didapat!</div>
      </div>
      <div style={{ background: '#e0e5ec', borderRadius: '8px', padding: '10px 14px', boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <code style={{ flex: 1, fontSize: '12px', color: '#333', wordBreak: 'break-all' }}>{data.key}</code>
        <button onClick={() => navigator.clipboard.writeText(data.key)} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Copy</button>
      </div>
      {data.note && <div style={{ fontSize: '11px', color: '#ff9800', marginTop: '8px', textAlign: 'center' }}>⚠ {data.note}</div>}
    </div>
  )
}

function ServerTab() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [lastCheck, setLastCheck] = useState<string | null>(null)

  const check = async () => {
    setLoading(true)
    const res = await fetch('/api/status')
    const json = await res.json()
    setData(json)
    setLastCheck(new Date().toLocaleTimeString('id-ID'))
    setLoading(false)
  }

  useEffect(() => { check() }, [])

  const s = data?.summary
  const overall = !s ? 'loading' : s.down > 3 || s.error > 3 ? 'down' : s.slow > 0 || s.error > 0 || s.down > 0 ? 'slow' : 'ok'
  const overallColor = overall === 'ok' ? '#00c853' : overall === 'slow' ? '#ff6f00' : '#c62828'
  const overallLabel = overall === 'ok' ? 'Semua Sistem Normal' : overall === 'slow' ? 'Beberapa Layanan Bermasalah' : 'Sistem Bermasalah'

  return (
    <div>
      <div style={{ ...neu, textAlign: 'center', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '20px' }}>
        <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>System Status</div>
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: overallColor, margin: '0 auto 8px', boxShadow: `0 0 12px ${overallColor}` }} />
        <div style={{ fontWeight: '700', fontSize: '16px', color: '#fff', marginBottom: '4px' }}>{overallLabel}</div>
        {lastCheck && <div style={{ fontSize: '11px', color: '#666' }}>Terakhir dicek: {lastCheck}</div>}
        {s && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginTop: '16px' }}>
            {[{ val: s.ok, label: 'Online', color: '#00c853' }, { val: s.slow, label: 'Lambat', color: '#ffd740' }, { val: s.error, label: 'Error', color: '#ef5350' }, { val: s.down, label: 'Down', color: '#78909c' }].map(({ val, label, color }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '8px 4px' }}>
                <div style={{ fontWeight: '700', fontSize: '18px', color }}>{val}</div>
                <div style={{ fontSize: '10px', color: '#666' }}>{label}</div>
              </div>
            ))}
          </div>
        )}
        <button onClick={check} disabled={loading} style={{ marginTop: '16px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '8px 20px', fontSize: '12px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600' }}>
          {loading ? '⟳ Mengecek...' : '↻ Refresh'}
        </button>
      </div>
      {data?.endpoints?.map((ep: any) => {
        const sc = STATUS_COLORS[ep.status]
        return (
          <div key={ep.name} style={{ background: '#e0e5ec', borderRadius: '14px', padding: '14px 16px', marginBottom: '10px', boxShadow: '4px 4px 8px #b8bec7, -2px -2px 6px #ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: sc.dot, flexShrink: 0, boxShadow: `0 0 6px ${sc.dot}` }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#333' }}>{ep.name}</div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{ep.message}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ background: sc.bg, borderRadius: '8px', padding: '3px 10px', fontSize: '10px', fontWeight: '700', color: sc.text, marginBottom: '4px' }}>{sc.label}</div>
              <div style={{ fontSize: '10px', color: '#aaa' }}>{ep.latency}ms</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('stalk')

  const [igUser, setIgUser] = useState(''); const [igResult, setIgResult] = useState<any>(null); const [igLoading, setIgLoading] = useState(false)
  const [tokUser, setTokUser] = useState(''); const [tokResult, setTokResult] = useState<any>(null); const [tokLoading, setTokLoading] = useState(false)
  const [robloxUser, setRobloxUser] = useState(''); const [robloxResult, setRobloxResult] = useState<any>(null); const [robloxLoading, setRobloxLoading] = useState(false)
  const [githubUser, setGithubUser] = useState(''); const [githubResult, setGithubResult] = useState<any>(null); const [githubLoading, setGithubLoading] = useState(false)
  const [twitterUser, setTwitterUser] = useState(''); const [twitterResult, setTwitterResult] = useState<any>(null); const [twitterLoading, setTwitterLoading] = useState(false)
  const [valoName, setValoName] = useState(''); const [valoTag, setValoTag] = useState(''); const [valoResult, setValoResult] = useState<any>(null); const [valoLoading, setValoLoading] = useState(false)
  const [mlId, setMlId] = useState(''); const [mlZone, setMlZone] = useState(''); const [mlResult, setMlResult] = useState<any>(null); const [mlLoading, setMlLoading] = useState(false)
  const [telloUser, setTelloUser] = useState(''); const [telloPesan, setTelloPesan] = useState(''); const [telloJumlah, setTelloJumlah] = useState('5'); const [telloResult, setTelloResult] = useState<any>(null); const [telloLoading, setTelloLoading] = useState(false)
  const [telloUser, setTelloUser] = useState(''); const [telloPesan, setTelloPesan] = useState(''); const [telloJumlah, setTelloJumlah] = useState('5'); const [telloResult, setTelloResult] = useState<any>(null); const [telloLoading, setTelloLoading] = useState(false)
  const [telloUser, setTelloUser] = useState(''); const [telloPesan, setTelloPesan] = useState(''); const [telloJumlah, setTelloJumlah] = useState('5'); const [telloResult, setTelloResult] = useState<any>(null); const [telloLoading, setTelloLoading] = useState(false)
  const [nglUrl, setNglUrl] = useState(''); const [nglPesan, setNglPesan] = useState(''); const [nglJumlah, setNglJumlah] = useState('5'); const [nglResult, setNglResult] = useState<any>(null); const [nglLoading, setNglLoading] = useState(false)
  const [waPhone, setWaPhone] = useState(''); const [waResult, setWaResult] = useState<any>(null); const [waLoading, setWaLoading] = useState(false)
  const [waChanUrl, setWaChanUrl] = useState(''); const [waChanResult, setWaChanResult] = useState<any>(null); const [waChanLoading, setWaChanLoading] = useState(false)
  const [deltaUrl, setDeltaUrl] = useState(''); const [deltaResult, setDeltaResult] = useState<any>(null); const [deltaLoading, setDeltaLoading] = useState(false)

  const extractUsername = (url: string) => {
    try { return new URL(url).pathname.replace('/', '').split('?')[0] }
    catch { return url.replace('https://ngl.link/', '').split('?')[0] }
  }

  const call = async (url: string, setResult: any, setLoading: any) => {
    setLoading(true); setResult(null)
    const res = await fetch(url)
    setResult(await res.json()); setLoading(false)
  }

  const tabs = [
    { id: 'stalk', label: '👤 Stalk', color: '#5c6bc0' },
    { id: 'spam', label: '💬 Spam', color: '#4CAF50' },
    { id: 'tools', label: '🔧 Tools', color: '#25D366' },
    { id: 'server', label: '🖥️ Server', color: '#0288d1' },
    { id: 'dev', label: '👨‍💻 Dev', color: '#ff7043' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: '#e0e5ec', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      <div style={{ ...neu, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: '700', fontSize: '18px', color: '#333' }}>Egii Apii</div>
          <div style={{ fontSize: '11px', color: '#888' }}>by EgiiDev</div>
        </div>
        <div style={{ fontSize: '11px', color: '#888' }}>v1.0.0</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '6px', marginBottom: '20px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab === t.id ? t.color : '#e0e5ec', color: activeTab === t.id ? '#fff' : '#888', border: 'none', borderRadius: '12px', padding: '10px 2px', fontWeight: '700', fontSize: '10px', cursor: 'pointer', boxShadow: activeTab === t.id ? '4px 4px 8px #b8bec7' : 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'stalk' && (
        <>
          <Section path="/api/stalkg" label="Instagram" color="#E1306C">
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME INSTAGRAM</label>
            <input style={neuInput} placeholder="cristiano" value={igUser} onChange={e => setIgUser(e.target.value)} />
            <Btn onClick={() => call(`/api/stalkg?username=${igUser}`, setIgResult, setIgLoading)} disabled={igLoading || !igUser} loading={igLoading} label="🔍 Stalk Instagram" color="#E1306C" />
            <IgCard data={igResult} /><ErrorCard data={igResult} />
          </Section>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME TELLONYM</label>
              <input style={neuInput} placeholder="username" value={telloUser} onChange={e => setTelloUser(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>PESAN</label>
              <input style={neuInput} placeholder="hai 👋" value={telloPesan} onChange={e => setTelloPesan(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>JUMLAH (MAX 50)</label>
              <input style={neuInput} type="number" placeholder="5" value={telloJumlah} onChange={e => setTelloJumlah(e.target.value)} />
            </div>
            {telloResult && <div style={neu2}><pre style={{ fontSize: '12px', color: '#4CAF50', margin: 0, overflow: 'auto' }}>{JSON.stringify(telloResult, null, 2)}</pre></div>}
          </div>

          <Section path="/api/stalktok" label="TikTok" color="#333">
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME TIKTOK</label>
            <input style={neuInput} placeholder="khaby.lame" value={tokUser} onChange={e => setTokUser(e.target.value)} />
            <Btn onClick={() => call(`/api/stalktok?username=${tokUser}`, setTokResult, setTokLoading)} disabled={tokLoading || !tokUser} loading={tokLoading} label="🔍 Stalk TikTok" color="#333" />
            <TokCard data={tokResult} /><ErrorCard data={tokResult} />
          </Section>

          <Section path="/api/stalkroblox" label="Roblox" color="#e53935">
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME ROBLOX</label>
            <input style={neuInput} placeholder="Builderman" value={robloxUser} onChange={e => setRobloxUser(e.target.value)} />
            <Btn onClick={() => call(`/api/stalkroblox?username=${robloxUser}`, setRobloxResult, setRobloxLoading)} disabled={robloxLoading || !robloxUser} loading={robloxLoading} label="🔍 Stalk Roblox" color="#e53935" />
            <RobloxCard data={robloxResult} /><ErrorCard data={robloxResult} />
          </Section>

          <Section path="/api/stalkgithub" label="GitHub" color="#333">
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME GITHUB</label>
            <input style={neuInput} placeholder="torvalds" value={githubUser} onChange={e => setGithubUser(e.target.value)} />
            <Btn onClick={() => call(`/api/stalkgithub?username=${githubUser}`, setGithubResult, setGithubLoading)} disabled={githubLoading || !githubUser} loading={githubLoading} label="🔍 Stalk GitHub" color="#333" />
            <GithubCard data={githubResult} /><ErrorCard data={githubResult} />
          </Section>

          <Section path="/api/stalktwitter" label="Twitter/X" color="#1DA1F2">
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME TWITTER</label>
            <input style={neuInput} placeholder="elonmusk" value={twitterUser} onChange={e => setTwitterUser(e.target.value)} />
            <Btn onClick={() => call(`/api/stalktwitter?username=${twitterUser}`, setTwitterResult, setTwitterLoading)} disabled={twitterLoading || !twitterUser} loading={twitterLoading} label="🔍 Stalk Twitter" color="#1DA1F2" />
            <TwitterCard data={twitterResult} /><ErrorCard data={twitterResult} />
          </Section>

          <Section path="/api/stalkvalo" label="Valorant" color="#ff4655">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>NAME</label>
                <input style={neuInput} placeholder="TenZ" value={valoName} onChange={e => setValoName(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>TAG</label>
                <input style={neuInput} placeholder="0000" value={valoTag} onChange={e => setValoTag(e.target.value)} />
              </div>
            </div>
            <Btn onClick={() => call(`/api/stalkvalo?name=${valoName}&tag=${valoTag}`, setValoResult, setValoLoading)} disabled={valoLoading || !valoName || !valoTag} loading={valoLoading} label="🎯 Stalk Valorant" color="#ff4655" />
            <ValoCard data={valoResult} /><ErrorCard data={valoResult} />
          </Section>

          <Section path="/api/stalkml" label="Mobile Legends" color="#e8b800">
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USER ID</label>
                <input style={neuInput} placeholder="123456789" value={mlId} onChange={e => setMlId(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>ZONE ID</label>
                <input style={neuInput} placeholder="1234" value={mlZone} onChange={e => setMlZone(e.target.value)} />
              </div>
            </div>
            <Btn onClick={() => call(`/api/stalkml?userid=${mlId}&zoneid=${mlZone}`, setMlResult, setMlLoading)} disabled={mlLoading || !mlId || !mlZone} loading={mlLoading} label="🏆 Stalk ML" color="#e8b800" />
            <MLCard data={mlResult} /><ErrorCard data={mlResult} />
          </Section>
        </>
      )}

      {activeTab === 'spam' && (
        <Section path="/api/nglspam" label="NGL Spam" color="#4CAF50">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>NGL LINK</label>
              <input style={neuInput} placeholder="https://ngl.link/egiuu1" value={nglUrl} onChange={e => setNglUrl(e.target.value)} />
              {nglUrl && <p style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>Username: <span style={{ color: '#4CAF50', fontWeight: '600' }}>{extractUsername(nglUrl)}</span></p>}
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>PESAN</label>
              <input style={neuInput} placeholder="hai 👋" value={nglPesan} onChange={e => setNglPesan(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>JUMLAH (MAX 50)</label>
              <input style={neuInput} type="number" placeholder="5" value={nglJumlah} onChange={e => setNglJumlah(e.target.value)} />
            </div>
            <Btn onClick={() => call(`/api/nglspam?username=${extractUsername(nglUrl)}&pesan=${encodeURIComponent(nglPesan)}&jumlah=${nglJumlah}`, setNglResult, setNglLoading)} disabled={nglLoading || !nglUrl || !nglPesan} loading={nglLoading} label="📨 Send NGL Spam" color="#4CAF50" />
            {nglResult && <div style={neu2}><pre style={{ fontSize: '12px', color: '#4CAF50', margin: 0, overflow: 'auto' }}>{JSON.stringify(nglResult, null, 2)}</pre></div>}
          </div>
        </Section>
        <Section path="/api/tellospam" label="Tellonym Spam" color="#4CAF50">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>USERNAME TELLONYM</label>
              <input style={neuInput} placeholder="username" value={telloUser} onChange={e => setTelloUser(e.target.value)} />
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>PESAN</label>
              <input style={neuInput} placeholder="hai 👋" value={telloPesan} onChange={e => setTelloPesan(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>JUMLAH (MAX 50)</label>
              <input style={neuInput} type="number" placeholder="5" value={telloJumlah} onChange={e => setTelloJumlah(e.target.value)} />
            </div>
            {telloResult && <div style={neu2}><pre style={{ fontSize: '12px', color: '#4CAF50', margin: 0, overflow: 'auto' }}>{JSON.stringify(telloResult, null, 2)}</pre></div>}
          </div>
        </Section>
      )}

      {activeTab === 'tools' && (
        <>
          <Section path="/api/wacheck" label="WA Check" color="#25D366">
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Cek nomor HP aktif di WhatsApp</p>
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>NOMOR HP</label>
            <input style={neuInput} placeholder="08xxxxxxxxxx" value={waPhone} onChange={e => setWaPhone(e.target.value)} />
            <Btn onClick={() => call(`/api/wacheck?phone=${waPhone}`, setWaResult, setWaLoading)} disabled={waLoading || !waPhone} loading={waLoading} label="✅ Check WhatsApp" color="#25D366" />
            <WaCard data={waResult} /><ErrorCard data={waResult} />
          </Section>

          <Section path="/api/wachannel" label="WA Channel" color="#25D366">
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Cek info channel WhatsApp dari link</p>
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>LINK CHANNEL WA</label>
            <input style={neuInput} placeholder="https://whatsapp.com/channel/xxx" value={waChanUrl} onChange={e => setWaChanUrl(e.target.value)} />
            <Btn onClick={() => call(`/api/wachannel?url=${encodeURIComponent(waChanUrl)}`, setWaChanResult, setWaChanLoading)} disabled={waChanLoading || !waChanUrl} loading={waChanLoading} label="🔍 Cek Channel WA" color="#25D366" />
            <WaChannelCard data={waChanResult} /><ErrorCard data={waChanResult} />
          </Section>

          <Section path="/api/deltakey" label="Delta Key" color="#7c3aed">
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Bypass link Delta key system otomatis</p>
            <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>DELTA LINK</label>
            <input style={neuInput} placeholder="https://delta.link/..." value={deltaUrl} onChange={e => setDeltaUrl(e.target.value)} />
            <Btn onClick={() => call(`/api/deltakey?url=${encodeURIComponent(deltaUrl)}`, setDeltaResult, setDeltaLoading)} disabled={deltaLoading || !deltaUrl} loading={deltaLoading} label="⚡ Get Delta Key" color="#7c3aed" />
            <DeltaCard data={deltaResult} /><ErrorCard data={deltaResult} />
          </Section>
        </>
      )}

      {activeTab === 'server' && <ServerTab />}

      {activeTab === 'dev' && (
        <div>
          <div style={{ ...neu, textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff7043, #5c6bc0)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '4px 4px 8px #b8bec7' }}>👨‍💻</div>
            <div style={{ fontWeight: '700', fontSize: '20px', color: '#333' }}>Egiii</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Full-Stack Developer & API Builder</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['Next.js', 'TypeScript', 'Node.js', 'API Dev'].map(s => (
                <span key={s} style={{ background: '#e0e5ec', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#5c6bc0', fontWeight: '700', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={neu}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333', marginBottom: '12px' }}>📖 About Me</div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>Halo! Gua Egiii, developer yang suka bikin tools dan API. Project ini gua bangun sendiri sebagai bagian dari EgiiDev.</p>
          </div>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Egii Apii — Made by EgiiDev</p>
    </main>
  )
}
