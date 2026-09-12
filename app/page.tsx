'use client'
import { useState } from 'react'

const neu = { background: '#e0e5ec', borderRadius: '20px', padding: '20px', boxShadow: '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff', marginBottom: '20px' } as React.CSSProperties
const neu2 = { background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', borderRadius: '12px', padding: '10px 14px', fontSize: '13px', color: '#888', marginBottom: '8px' } as React.CSSProperties
const neuInput = { background: '#e0e5ec', boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff', borderRadius: '12px', padding: '14px', fontSize: '14px', color: '#444', outline: 'none', border: 'none', width: '100%' } as React.CSSProperties

function Btn({ onClick, disabled, loading, label, color }: any) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: '100%', background: disabled ? '#e0e5ec' : color, color: disabled ? '#aaa' : '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '700', fontSize: '14px', cursor: disabled ? 'not-allowed' : 'pointer', boxShadow: disabled ? 'none' : '4px 4px 8px #b8bec7, -2px -2px 6px #ffffff', marginTop: '8px' }}>
      {loading ? 'Loading...' : label}
    </button>
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
        <div>📡 <b>Operator:</b> {d.operator}</div>
        <div>🗺️ <b>Wilayah:</b> {d.region}</div>
        {d.whatsapp && <div style={{ marginTop: '8px', textAlign: 'center' }}><a href={d.wa_link} target="_blank" style={{ color: '#25D366', fontWeight: '700', textDecoration: 'none' }}>💬 Chat via WhatsApp</a></div>}
      </div>
    </div>
  )
}

function IgCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.full_name} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.is_private && <div style={{ color: '#f44', fontSize: '11px' }}>🔒 Private</div>}
      {d.bio && <div style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>{d.bio}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
        {[{val: d.followers, label: 'Followers'},{val: d.following, label: 'Following'},{val: d.posts, label: 'Posts'}].map(({val,label}) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '700', color: '#E1306C' }}>{val}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>{label}</div>
          </div>
        ))}
      </div>
      <a href={d.ig_url} target="_blank" style={{ color: '#E1306C', fontWeight: '700', textDecoration: 'none' }}>📸 Buka Instagram</a>
    </div>
  )
}

function TokCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.profile_pic && <img src={d.profile_pic} alt="profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: '4px 4px 8px #b8bec7' }} onError={(e: any) => e.target.style.display = 'none'} />}
      <div style={{ fontWeight: '700', fontSize: '16px', color: '#333' }}>{d.nickname} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px', fontStyle: 'italic' }}>{d.bio}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginTop: '10px' }}>
        {[{val: Number(d.followers).toLocaleString(), label: 'Followers'},{val: Number(d.following).toLocaleString(), label: 'Following'},{val: Number(d.videos).toLocaleString(), label: 'Videos'},{val: Number(d.likes).toLocaleString(), label: 'Likes'}].map(({val,label}) => (
          <div key={label} style={{ background: '#e0e5ec', borderRadius: '10px', padding: '8px 4px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333' }}>{val}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RobloxCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.profile_pic && <img src={d.profile_pic} alt="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: '4px 4px 8px #b8bec7' }} onError={(e: any) => e.target.style.display = 'none'} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.display_name} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.is_banned && <div style={{ color: '#f44', fontSize: '11px', marginBottom: '4px' }}>🔨 Akun Dibanned</div>}
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '8px 0', fontStyle: 'italic' }}>{d.bio}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', margin: '10px 0' }}>
        {[{val: d.friends, label: 'Friends'},{val: d.followers, label: 'Followers'},{val: d.following, label: 'Following'}].map(({val,label}) => (
          <div key={label} style={{ background: '#e0e5ec', borderRadius: '10px', padding: '8px 4px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333' }}>{Number(val).toLocaleString()}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>📅 Bergabung pada {d.created}</div>
      <a href={d.profile_url} target="_blank" style={{ color: '#e53935', fontWeight: '700', textDecoration: 'none' }}>🎮 Buka Profil Roblox</a>
    </div>
  )
}

function GithubCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.avatar && <img src={d.avatar} alt="avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: '4px 4px 8px #b8bec7' }} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name || d.username}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '6px 0', fontStyle: 'italic' }}>{d.bio}</div>}
      {d.location && <div style={{ fontSize: '12px', color: '#888' }}>📍 {d.location}</div>}
      {d.company && <div style={{ fontSize: '12px', color: '#888' }}>🏢 {d.company}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', margin: '10px 0' }}>
        {[{val: d.followers, label: 'Followers'},{val: d.following, label: 'Following'},{val: d.public_repos, label: 'Repos'},{val: d.total_stars, label: 'Stars'}].map(({val,label}) => (
          <div key={label} style={{ background: '#e0e5ec', borderRadius: '10px', padding: '8px 4px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>
            <div style={{ fontWeight: '700', fontSize: '13px', color: '#333' }}>{Number(val).toLocaleString()}</div>
            <div style={{ fontSize: '10px', color: '#888' }}>{label}</div>
          </div>
        ))}
      </div>
      {d.top_repos?.length > 0 && (
        <div style={{ textAlign: 'left', marginTop: '8px' }}>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', marginBottom: '6px' }}>⭐ TOP REPOS</div>
          {d.top_repos.map((r: any) => (
            <a key={r.name} href={r.url} target="_blank" style={{ display: 'block', textDecoration: 'none', background: '#e0e5ec', borderRadius: '10px', padding: '8px 10px', marginBottom: '6px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>
              <div style={{ fontWeight: '700', fontSize: '12px', color: '#333' }}>{r.name}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{r.language || 'Unknown'} • ⭐ {r.stars}</div>
            </a>
          ))}
        </div>
      )}
      <div style={{ fontSize: '11px', color: '#888', margin: '8px 0' }}>📅 Bergabung pada {d.joined}</div>
      <a href={d.profile_url} target="_blank" style={{ color: '#333', fontWeight: '700', textDecoration: 'none' }}>🐙 Buka GitHub</a>
    </div>
  )
}

function ErrorCard({ data }: any) {
  if (!data || data.status !== false) return null
  return (
    <div style={{ ...neu2, marginTop: '12px', color: '#f44', textAlign: 'center' }}>
      ❌ {data.message}
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('stalk')

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

  const [robloxUser, setRobloxUser] = useState('')
  const [robloxResult, setRobloxResult] = useState<any>(null)
  const [robloxLoading, setRobloxLoading] = useState(false)

  const [githubUser, setGithubUser] = useState('')
  const [githubResult, setGithubResult] = useState<any>(null)
  const [githubLoading, setGithubLoading] = useState(false)

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
  const handleRoblox = async () => {
    setRobloxLoading(true); setRobloxResult(null)
    const res = await fetch(`/api/stalkroblox?username=${robloxUser}`)
    setRobloxResult(await res.json()); setRobloxLoading(false)
  }
  const handleGithub = async () => {
    setGithubLoading(true); setGithubResult(null)
    const res = await fetch(`/api/stalkgithub?username=${githubUser}`)
    setGithubResult(await res.json()); setGithubLoading(false)
  }
  const handleWa = async () => {
    setWaLoading(true); setWaResult(null)
    const res = await fetch(`/api/wacheck?phone=${waPhone}`)
    setWaResult(await res.json()); setWaLoading(false)
  }

  const tabs = [
    { id: 'stalk', label: '👤 Stalk' },
    { id: 'spam', label: '💬 Spam' },
    { id: 'tools', label: '🔧 Tools' },
    { id: 'dev', label: '👨‍💻 Dev' },
  ]

  const tabColors: any = { stalk: '#5c6bc0', spam: '#4CAF50', tools: '#25D366', dev: '#ff7043' }

  return (
    <main style={{ minHeight: '100vh', background: '#e0e5ec', fontFamily: 'system-ui, sans-serif', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ ...neu, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: '700', fontSize: '18px', color: '#333' }}>Egii Apii</div>
          <div style={{ fontSize: '11px', color: '#888' }}>by SugengTeam</div>
        </div>
        <div style={{ fontSize: '11px', color: '#888' }}>v1.0.0</div>
      </div>

      {/* Tab Nav */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab === t.id ? tabColors[t.id] : '#e0e5ec', color: activeTab === t.id ? '#fff' : '#888', border: 'none', borderRadius: '14px', padding: '10px 4px', fontWeight: '700', fontSize: '11px', cursor: 'pointer', boxShadow: activeTab === t.id ? '4px 4px 8px #b8bec7' : 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* STALK TAB */}
      {activeTab === 'stalk' && (
        <>
          {/* IG */}
          <div style={neu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: '#E1306C' }}>GET</div>
              <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/stalkg</code>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>Instagram</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>USERNAME INSTAGRAM</label>
                <input style={neuInput} placeholder="cristiano" value={igUser} onChange={e => setIgUser(e.target.value)} />
              </div>
              <Btn onClick={handleIg} disabled={igLoading || !igUser} loading={igLoading} label="🔍 Stalk Instagram" color="#E1306C" />
              <IgCard data={igResult} />
              <ErrorCard data={igResult} />
            </div>
          </div>

          {/* TikTok */}
          <div style={neu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: '#333' }}>GET</div>
              <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/stalktok</code>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>TikTok</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>USERNAME TIKTOK</label>
                <input style={neuInput} placeholder="khaby.lame" value={tokUser} onChange={e => setTokUser(e.target.value)} />
              </div>
              <Btn onClick={handleTok} disabled={tokLoading || !tokUser} loading={tokLoading} label="🔍 Stalk TikTok" color="#333" />
              <TokCard data={tokResult} />
              <ErrorCard data={tokResult} />
            </div>
          </div>

          {/* Roblox */}
          <div style={neu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: '#e53935' }}>GET</div>
              <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/stalkroblox</code>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>Roblox</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>USERNAME ROBLOX</label>
                <input style={neuInput} placeholder="Builderman" value={robloxUser} onChange={e => setRobloxUser(e.target.value)} />
              </div>
              <Btn onClick={handleRoblox} disabled={robloxLoading || !robloxUser} loading={robloxLoading} label="🔍 Stalk Roblox" color="#e53935" />
              <RobloxCard data={robloxResult} />
              <ErrorCard data={robloxResult} />
            </div>
          </div>

          {/* GitHub */}
          <div style={neu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: '#333' }}>GET</div>
              <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/stalkgithub</code>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>GitHub</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>USERNAME GITHUB</label>
                <input style={neuInput} placeholder="torvalds" value={githubUser} onChange={e => setGithubUser(e.target.value)} />
              </div>
              <Btn onClick={handleGithub} disabled={githubLoading || !githubUser} loading={githubLoading} label="🔍 Stalk GitHub" color="#333" />
              <GithubCard data={githubResult} />
              <ErrorCard data={githubResult} />
            </div>
          </div>
        </>
      )}

      {/* SPAM TAB */}
      {activeTab === 'spam' && (
        <div style={neu}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: '#4CAF50' }}>GET</div>
            <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/nglspam</code>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>NGL Spam</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>NGL LINK</label>
              <input style={neuInput} placeholder="https://ngl.link/eguu1" value={nglUrl} onChange={e => setNglUrl(e.target.value)} />
              {nglUrl && <p style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>Username: <span style={{ color: '#4CAF50', fontWeight: '600' }}>{extractUsername(nglUrl)}</span></p>}
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>PESAN</label>
              <input style={neuInput} placeholder="hai 👋" value={nglPesan} onChange={e => setNglPesan(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>JUMLAH (MAX 50)</label>
              <input style={neuInput} type="number" placeholder="5" value={nglJumlah} onChange={e => setNglJumlah(e.target.value)} />
            </div>
            <Btn onClick={handleNgl} disabled={nglLoading || !nglUrl || !nglPesan} loading={nglLoading} label="📨 Send NGL Spam" color="#4CAF50" />
            {nglResult && <div style={neu2}><pre style={{ fontSize: '12px', color: '#4CAF50', margin: 0, overflow: 'auto' }}>{JSON.stringify(nglResult, null, 2)}</pre></div>}
          </div>
        </div>
      )}

      {/* TOOLS TAB */}
      {activeTab === 'tools' && (
        <div style={neu}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: '#25D366' }}>GET</div>
            <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/wacheck</code>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>WA Check</span>
          </div>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Cek nomor HP aktif di WhatsApp + info operator</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>NOMOR HP</label>
              <input style={neuInput} placeholder="08xxxxxxxxxx" value={waPhone} onChange={e => setWaPhone(e.target.value)} />
            </div>
            <Btn onClick={handleWa} disabled={waLoading || !waPhone} loading={waLoading} label="✅ Check WhatsApp" color="#25D366" />
            <WaCard data={waResult} />
            <ErrorCard data={waResult} />
          </div>
        </div>
      )}

      {/* DEV TAB */}
      {activeTab === 'dev' && (
        <div>
          <div style={{ ...neu, textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff7043, #5c6bc0)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '4px 4px 8px #b8bec7, -2px -2px 6px #ffffff' }}>
              👨‍💻
            </div>
            <div style={{ fontWeight: '700', fontSize: '20px', color: '#333' }}>Egiii</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Full-Stack Developer & API Builder</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {['Next.js', 'TypeScript', 'Node.js', 'API Dev'].map(skill => (
                <span key={skill} style={{ background: '#e0e5ec', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#5c6bc0', fontWeight: '700', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>{skill}</span>
              ))}
            </div>
          </div>

          <div style={neu}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333', marginBottom: '12px' }}>📖 About Me</div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
              Halo! Gua Egiii, developer yang suka bikin tools dan API yang berguna. Mulai ngoding dari iseng-iseng, sekarang udah jadi passion. Suka eksplorasi hal baru, dari web scraping, bot automation, sampe bikin API publik kayak Egii Apii ini.
            </p>
          </div>

          <div style={neu}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333', marginBottom: '12px' }}>🚀 Projects</div>
            {[
              { name: 'Egii Apii', desc: 'API publik untuk stalk sosmed, spam NGL, cek WA, dan lainnya', color: '#5c6bc0' },
              { name: 'SugengTeam', desc: 'Tim developer yang fokus bikin tools dan bot automation', color: '#ff7043' },
            ].map(p => (
              <div key={p.name} style={{ background: '#e0e5ec', borderRadius: '12px', padding: '12px', marginBottom: '10px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: p.color }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          <div style={neu}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333', marginBottom: '12px' }}>📡 API Endpoints</div>
            {[
              { path: '/api/stalkg', desc: 'Stalk Instagram', color: '#E1306C' },
              { path: '/api/stalktok', desc: 'Stalk TikTok', color: '#333' },
              { path: '/api/stalkroblox', desc: 'Stalk Roblox', color: '#e53935' },
              { path: '/api/stalkgithub', desc: 'Stalk GitHub', color: '#333' },
              { path: '/api/wacheck', desc: 'Cek WhatsApp', color: '#25D366' },
              { path: '/api/nglspam', desc: 'NGL Spam', color: '#4CAF50' },
            ].map(e => (
              <div key={e.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', background: '#e0e5ec', borderRadius: '10px', padding: '10px', boxShadow: '3px 3px 6px #b8bec7, -2px -2px 4px #ffffff' }}>
                <div style={{ background: e.color, borderRadius: '6px', padding: '2px 8px', fontSize: '10px', fontWeight: '700', color: '#fff' }}>GET</div>
                <code style={{ fontSize: '12px', color: '#444' }}>{e.path}</code>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#888' }}>{e.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Egii Apii — Made by SugengTeam</p>
    </main>
  )
}
