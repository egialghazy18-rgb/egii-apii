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
      <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '15px', color: d.whatsapp ? '#25D366' : '#f44' }}>{d.status}</div>
      <div style={{ marginTop: '10px', fontSize: '13px', color: '#555' }}>
        <div>📱 <b>Nomor:</b> {d.phone_original}</div>
        <div>🌐 <b>Internasional:</b> {d.phone_intl}</div>
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

  const handleWa = async () => {
    setWaLoading(true); setWaResult(null)
    const res = await fetch(`/api/wacheck?phone=${waPhone}`)
    setWaResult(await res.json()); setWaLoading(false)
  }

  const tabs = [
    { id: 'stalk', label: '👤 Stalk', color: '#5c6bc0' },
    { id: 'spam', label: '💬 Spam', color: '#4CAF50' },
    { id: 'tools', label: '🔧 Tools', color: '#25D366' },
  ]

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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab === t.id ? t.color : '#e0e5ec', color: activeTab === t.id ? '#fff' : '#888', border: 'none', borderRadius: '14px', padding: '12px 4px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', boxShadow: activeTab === t.id ? '4px 4px 8px #b8bec7' : 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff', transition: 'all 0.2s' }}>
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
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Kirim pesan anonim ke NGL link target</p>
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
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Cek nomor HP aktif di WhatsApp atau tidak</p>
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

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Egii Apii — Made by SugengTeam</p>
    </main>
  )
}
