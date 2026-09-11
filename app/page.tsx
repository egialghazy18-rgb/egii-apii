'use client'
import { useState } from 'react'

export default function Home() {
  const [nglUrl, setNglUrl] = useState('')
  const [pesan, setPesan] = useState('')
  const [jumlah, setJumlah] = useState('5')
  const [nglResult, setNglResult] = useState<any>(null)
  const [nglLoading, setNglLoading] = useState(false)

  const [bratText, setBratText] = useState('')
  const [bratLoading, setBratLoading] = useState(false)
  const [bratUrl, setBratUrl] = useState('')

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

  const handleBrat = async () => {
    setBratLoading(true)
    setBratUrl('')
    const res = await fetch(`/api/bratvid?text=${encodeURIComponent(bratText)}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    setBratUrl(url)
    setBratLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black text-sm font-bold">E</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">Egii Apii</span>
          <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">v1.0.0</span>
        </div>
        <span className="text-xs text-zinc-600">by SugengTeam</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">API Documentation</h1>
          <p className="text-zinc-500 text-sm">Simple, fast, free. Base URL: <code className="text-white bg-zinc-900 px-2 py-0.5 rounded">https://egii-api.vercel.app</code></p>
        </div>

        {/* NGL Spam Card */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <div className="bg-zinc-900 px-5 py-4 flex items-center gap-3">
            <span className="text-xs font-bold bg-emerald-500 text-black px-2 py-0.5 rounded">GET</span>
            <code className="text-sm">/api/nglspam</code>
            <span className="text-xs text-zinc-500 ml-auto">NGL Spam</span>
          </div>
          <div className="px-5 py-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 mb-4">Kirim pesan anonim ke NGL link target</p>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-400 mb-5">
              <span className="text-zinc-600">GET </span>/api/nglspam?username=egiuu&pesan=hai&jumlah=5
            </div>

            {/* Try It */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">NGL Link</label>
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition"
                  placeholder="https://ngl.link/egiuu1"
                  value={nglUrl}
                  onChange={e => setNglUrl(e.target.value)}
                />
                {nglUrl && (
                  <p className="text-xs text-zinc-600 mt-1">Username: <span className="text-emerald-400">{extractUsername(nglUrl)}</span></p>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Pesan</label>
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition"
                  placeholder="hai 👋"
                  value={pesan}
                  onChange={e => setPesan(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Jumlah (max 100)</label>
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition"
                  placeholder="5"
                  type="number"
                  value={jumlah}
                  onChange={e => setJumlah(e.target.value)}
                />
              </div>
              <button
                onClick={handleNgl}
                disabled={nglLoading || !nglUrl || !pesan}
                className="w-full bg-white text-black font-semibold text-sm py-2.5 rounded-lg hover:bg-zinc-200 transition disabled:opacity-30"
              >
                {nglLoading ? 'Sending...' : 'Send Request'}
              </button>
              {nglResult && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Response</p>
                  <pre className="text-xs text-emerald-400 overflow-auto">{JSON.stringify(nglResult, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Brat Video Card */}
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <div className="bg-zinc-900 px-5 py-4 flex items-center gap-3">
            <span className="text-xs font-bold bg-blue-500 text-black px-2 py-0.5 rounded">GET</span>
            <code className="text-sm">/api/bratvid</code>
            <span className="text-xs text-zinc-500 ml-auto">Brat Video</span>
          </div>
          <div className="px-5 py-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 mb-4">Generate brat style video dengan animasi + efek cahaya. Support emoji iPhone 🍎</p>
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-400 mb-5">
              <span className="text-zinc-600">GET </span>/api/bratvid?text=ahoy 😹
            </div>

            {/* Try It */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-1">Text + Emoji</label>
                <input
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-zinc-600 transition"
                  placeholder="ahoy 😹🍎"
                  value={bratText}
                  onChange={e => setBratText(e.target.value)}
                />
                <p className="text-xs text-zinc-600 mt-1">Tip: emoji iPhone otomatis dirender 🍎😹🔥</p>
              </div>
              <button
                onClick={handleBrat}
                disabled={bratLoading || !bratText}
                className="w-full bg-blue-500 text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-blue-600 transition disabled:opacity-30"
              >
                {bratLoading ? 'Generating...' : 'Generate Brat Video'}
              </button>
              {bratUrl && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-3">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Preview</p>
                  <video src={bratUrl} controls autoPlay loop className="w-full rounded-lg" />
                  <a
                    href={bratUrl}
                    download="bratvid.mp4"
                    className="block w-full text-center bg-zinc-800 text-white text-sm py-2 rounded-lg hover:bg-zinc-700 transition"
                  >
                    Download MP4
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-700 pt-4">Egii Apii — Made by SugengTeam</p>
      </div>
    </main>
  )
}
