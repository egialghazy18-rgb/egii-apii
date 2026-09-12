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

function Avatar({ src, size = 80 }: { src: string, size?: number }) {
  return <img src={src} alt="avatar" style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', boxShadow: '4px 4px 8px #b8bec7' }} onError={(e: any) => e.target.style.display = 'none'} />
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
      <StatGrid items={[{val: d.followers, label: 'Followers'},{val: d.following, label: 'Following'},{val: d.posts, label: 'Posts'}]} />
      <a href={d.ig_url} target="_blank" style={{ color: '#E1306C', fontWeight: '700', textDecoration: 'none' }}>📸 Buka Instagram</a>
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
      {d.bio && <div style={{ fontSize: '12px', color: '#555', marginBottom: '10px', fontStyle: 'italic' }}>{d.bio}</div>}
      <StatGrid items={[{val: Number(d.followers).toLocaleString(), label: 'Followers'},{val: Number(d.following).toLocaleString(), label: 'Following'},{val: Number(d.videos).toLocaleString(), label: 'Videos'},{val: Number(d.likes).toLocaleString(), label: 'Likes'}]} />
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
      {d.is_banned && <div style={{ color: '#f44', fontSize: '11px', marginBottom: '4px' }}>🔨 Akun Dibanned</div>}
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '8px 0', fontStyle: 'italic' }}>{d.bio}</div>}
      <StatGrid items={[{val: Number(d.friends).toLocaleString(), label: 'Friends'},{val: Number(d.followers).toLocaleString(), label: 'Followers'},{val: Number(d.following).toLocaleString(), label: 'Following'}]} />
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
      {d.avatar && <Avatar src={d.avatar} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name || d.username}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '6px 0', fontStyle: 'italic' }}>{d.bio}</div>}
      {d.location && <div style={{ fontSize: '12px', color: '#888' }}>📍 {d.location}</div>}
      {d.company && <div style={{ fontSize: '12px', color: '#888' }}>🏢 {d.company}</div>}
      <StatGrid items={[{val: Number(d.followers).toLocaleString(), label: 'Followers'},{val: Number(d.following).toLocaleString(), label: 'Following'},{val: Number(d.public_repos).toLocaleString(), label: 'Repos'},{val: Number(d.total_stars).toLocaleString(), label: 'Stars'}]} />
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

function TwitterCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.avatar && <Avatar src={d.avatar} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name} {d.is_verified && '✅'}</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '4px' }}>@{d.username}</div>
      {d.bio && <div style={{ fontSize: '12px', color: '#555', margin: '6px 0' }}>{d.bio}</div>}
      <StatGrid items={[{val: Number(d.followers).toLocaleString(), label: 'Followers'},{val: Number(d.following).toLocaleString(), label: 'Following'},{val: Number(d.tweets).toLocaleString(), label: 'Tweets'}]} />
      <a href={d.profile_url} target="_blank" style={{ color: '#1DA1F2', fontWeight: '700', textDecoration: 'none' }}>🐦 Buka Twitter</a>
    </div>
  )
}

function ValoCard({ data }: any) {
  if (!data?.status) return null
  const d = data.data
  return (
    <div style={{ ...neu2, marginTop: '12px', textAlign: 'center' }}>
      {d.avatar && <Avatar src={d.avatar} />}
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#333' }}>{d.name}<span style={{ color: '#ff4655' }}>#{d.tag}</span></div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '8px' }}>Level {d.level} • {d.region}</div>
      {d.rank_icon && <img src={d.rank_icon} alt="rank" style={{ width: '48px', height: '48px', margin: '4px auto' }} />}
      <div style={{ fontWeight: '700', fontSize: '16px', color: '#ff4655', marginBottom: '4px' }}>{d.rank}</div>
      <StatGrid items={[{val: d.elo, label: 'ELO'},{val: (d.last_match_change > 0 ? '+' : '') + d.last_match_change, label: 'Last Match'}]} />
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
      <div style={{ fontWeight: '700', fontSize: '16px', color: '#333', marginBottom: '4px' }}>{d.username}</div>
      <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{d.game}</div>
      <StatGrid items={[{val: d.user_id, label: 'User ID'},{val: d.zone_id, label: 'Zone ID'}]} />
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

function Section({ method = 'GET', path, label, color, children }: any) {
  return (
    <div style={neu}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ background: '#e0e5ec', boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff', borderRadius: '8px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color }}>{method}</div>
        <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>{path}</code>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>{label}</span>
      </div>
      {children}
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
  const [nglUrl, setNglUrl] = useState(''); const [nglPesan, setNglPesan] = useState(''); const [nglJumlah, setNglJumlah] = useState('5'); const [nglResult, setNglResult] = useState<any>(null); const [nglLoading, setNglLoading] = useState(false)
  const [waPhone, setWaPhone] = useState(''); const [waResult, setWaResult] = useState<any>(null); const [waLoading, setWaLoading] = useState(false)

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab === t.id ? t.color : '#e0e5ec', color: activeTab === t.id ? '#fff' : '#888', border: 'none', borderRadius: '14px', padding: '10px 4px', fontWeight: '700', fontSize: '11px', cursor: 'pointer', boxShadow: activeTab === t.id ? '4px 4px 8px #b8bec7' : 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff', transition: 'all 0.2s' }}>
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
              <input style={neuInput} placeholder="https://ngl.link/eguu1" value={nglUrl} onChange={e => setNglUrl(e.target.value)} />
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
      )}

      {activeTab === 'tools' && (
        <Section path="/api/wacheck" label="WA Check" color="#25D366">
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>Cek nomor HP aktif di WhatsApp + info operator</p>
          <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '6px', fontWeight: '600' }}>NOMOR HP</label>
          <input style={neuInput} placeholder="08xxxxxxxxxx" value={waPhone} onChange={e => setWaPhone(e.target.value)} />
          <Btn onClick={() => call(`/api/wacheck?phone=${waPhone}`, setWaResult, setWaLoading)} disabled={waLoading || !waPhone} loading={waLoading} label="✅ Check WhatsApp" color="#25D366" />
          <WaCard data={waResult} /><ErrorCard data={waResult} />
        </Section>
      )}

      {activeTab === 'dev' && (
        <div>
          <div style={{ ...neu, textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff7043, #5c6bc0)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '4px 4px 8px #b8bec7, -2px -2px 6px #ffffff' }}>👨‍💻</div>
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
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', margin: 0 }}>
              Halo! Gua Egiii, developer yang suka bikin tools dan API yang berguna. Mulai ngoding dari iseng-iseng, sekarang udah jadi passion. Suka eksplorasi hal baru, dari web scraping, bot automation, sampe bikin API publik kayak Egii Apii ini. Project ini gua bangun sendiri sebagai bagian dari EgiiDev.
            </p>
          </div>

          <div style={neu}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#333', marginBottom: '12px' }}>📡 API Endpoints</div>
            {[
              { path: '/api/stalkg', desc: 'Stalk Instagram', color: '#E1306C' },
              { path: '/api/stalktok', desc: 'Stalk TikTok', color: '#333' },
              { path: '/api/stalkroblox', desc: 'Stalk Roblox', color: '#e53935' },
              { path: '/api/stalkgithub', desc: 'Stalk GitHub', color: '#333' },
              { path: '/api/stalktwitter', desc: 'Stalk Twitter', color: '#1DA1F2' },
              { path: '/api/stalkvalo', desc: 'Stalk Valorant', color: '#ff4655' },
              { path: '/api/stalkml', desc: 'Stalk Mobile Legends', color: '#e8b800' },
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

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '8px' }}>Egii Apii — Made by EgiiDev</p>
    </main>
  )
}
