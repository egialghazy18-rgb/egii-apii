'use client'
import { useState } from 'react'

export default function Home() {
  const [nglUrl, setNglUrl] = useState('')
  const [pesan, setPesan] = useState('')
  const [jumlah, setJumlah] = useState('5')
  const [nglResult, setNglResult] = useState<any>(null)
  const [nglLoading, setNglLoading] = useState(false)

  const extractUsername = (url: string) => {
    try {
      const u = new URL(url)
      return u.pathname.replace('/', '').split('?')[0]
    } catch {
      return url.replace('https://ngl.link/', '').split('?')[0]
    }
  }

  const handleNgl = async () => {
    setNglLoading(true)
    setNglResult(null)
    const username = extractUsername(nglUrl)
    const res = await fetch(`/api/nglspam?username=${username}&pesan=${encodeURIComponent(pesan)}&jumlah=${jumlah}`)
    const data = await res.json()
    setNglResult(data)
    setNglLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#e0e5ec',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px 16px'
    }}>
      {/* Header */}
      <div style={{
        background: '#e0e5ec',
        borderRadius: '20px',
        padding: '20px 24px',
        marginBottom: '24px',
        boxShadow: '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '12px',
            background: '#e0e5ec',
            boxShadow: '4px 4px 8px #b8bec7, -4px -4px 8px #ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '18px', color: '#555'
          }}>E</div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: '#333' }}>Egii Apii</div>
            <div style={{ fontSize: '11px', color: '#888' }}>by SugengTeam</div>
          </div>
        </div>
        <div style={{
          background: '#e0e5ec',
          borderRadius: '20px',
          padding: '4px 12px',
          boxShadow: 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff',
          fontSize: '11px', color: '#888'
        }}>v1.0.0</div>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: '24px', paddingLeft: '4px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#333', margin: '0 0 6px' }}>API Documentation</h1>
        <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>
          Base URL: <code style={{
            background: '#e0e5ec',
            boxShadow: 'inset 2px 2px 4px #b8bec7, inset -2px -2px 4px #ffffff',
            padding: '2px 8px', borderRadius: '6px', fontSize: '12px', color: '#555'
          }}>egii-apii-production-a7f7.up.railway.app</code>
        </p>
      </div>

      {/* NGL Spam Card */}
      <div style={{
        background: '#e0e5ec',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '8px 8px 16px #b8bec7, -8px -8px 16px #ffffff',
        marginBottom: '20px'
      }}>
        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            background: '#e0e5ec',
            boxShadow: '3px 3px 6px #b8bec7, -3px -3px 6px #ffffff',
            borderRadius: '8px', padding: '3px 10px',
            fontSize: '11px', fontWeight: '700', color: '#4CAF50'
          }}>GET</div>
          <code style={{ fontSize: '13px', color: '#444', fontWeight: '600' }}>/api/nglspam</code>
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#999' }}>NGL Spam</span>
        </div>

        <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
          Kirim pesan anonim ke NGL link target secara cepat dan stabil
        </p>

        {/* Example */}
        <div style={{
          background: '#e0e5ec',
          boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff',
          borderRadius: '12px', padding: '10px 14px',
          fontSize: '11px', color: '#888', marginBottom: '20px',
          fontFamily: 'monospace'
        }}>
          GET /api/nglspam?username=egiuu&pesan=hai&jumlah=10
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>NGL Link</label>
            <input
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#e0e5ec',
                boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff',
                border: 'none', borderRadius: '12px',
                padding: '12px 14px', fontSize: '13px', color: '#444',
                outline: 'none'
              }}
              placeholder="https://ngl.link/egiuu1"
              value={nglUrl}
              onChange={e => setNglUrl(e.target.value)}
            />
            {nglUrl && (
              <p style={{ fontSize: '11px', color: '#888', marginTop: '6px', paddingLeft: '4px' }}>
                Username: <span style={{ color: '#4CAF50', fontWeight: '600' }}>{extractUsername(nglUrl)}</span>
              </p>
            )}
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Pesan</label>
            <input
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#e0e5ec',
                boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff',
                border: 'none', borderRadius: '12px',
                padding: '12px 14px', fontSize: '13px', color: '#444',
                outline: 'none'
              }}
              placeholder="hai 👋"
              value={pesan}
              onChange={e => setPesan(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Jumlah (max 100)</label>
            <input
              type="number"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#e0e5ec',
                boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff',
                border: 'none', borderRadius: '12px',
                padding: '12px 14px', fontSize: '13px', color: '#444',
                outline: 'none'
              }}
              placeholder="5"
              value={jumlah}
              onChange={e => setJumlah(e.target.value)}
            />
          </div>

          <button
            onClick={handleNgl}
            disabled={nglLoading || !nglUrl || !pesan}
            style={{
              background: '#e0e5ec',
              boxShadow: nglLoading || !nglUrl || !pesan
                ? 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff'
                : '6px 6px 12px #b8bec7, -6px -6px 12px #ffffff',
              border: 'none', borderRadius: '12px',
              padding: '14px', fontSize: '14px', fontWeight: '700',
              color: nglLoading || !nglUrl || !pesan ? '#aaa' : '#444',
              cursor: nglLoading || !nglUrl || !pesan ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {nglLoading ? 'Sending...' : 'Send Request'}
          </button>

          {nglResult && (
            <div style={{
              background: '#e0e5ec',
              boxShadow: 'inset 4px 4px 8px #b8bec7, inset -4px -4px 8px #ffffff',
              borderRadius: '12px', padding: '14px'
            }}>
              <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Response</p>
              <pre style={{ fontSize: '12px', color: '#4CAF50', margin: 0, overflow: 'auto' }}>
                {JSON.stringify(nglResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '16px' }}>
        Egii Apii — Made by SugengTeam
      </p>
    </main>
  )
}
