import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

async function kirimSatu(username: string, pesan: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.tellonym.me/tells', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'TellonymApp/3.44.0 (Android; en)',
        'Origin': 'https://tellonym.me',
        'Referer': `https://tellonym.me/${username}`,
        'tellonym-client': 'android:3.44.0',
        'x-requested-with': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        tell: pesan,
        senderStatus: 0,
        username
      })
    })
    const body = await res.json()
    console.log('Status:', res.status, 'Body:', JSON.stringify(body))
    return res.ok
  } catch (e) {
    console.log('Error:', e)
    return false
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const pesan = searchParams.get('pesan')
  const jumlah = Math.min(parseInt(searchParams.get('jumlah') || '1'), 50)

  if (!username || !pesan) {
    return NextResponse.json({ status: false, message: 'Parameter username dan pesan wajib diisi' }, { status: 400 })
  }

  let berhasil = 0
  let gagal = 0

  for (let i = 0; i < jumlah; i++) {
    const ok = await kirimSatu(username, pesan)
    if (ok) berhasil++
    else gagal++
    await new Promise(r => setTimeout(r, 300 + Math.random() * 200))
  }

  return NextResponse.json({
    status: true,
    username,
    pesan,
    target: jumlah,
    berhasil,
    gagal,
    author: 'Egii Apii'
  })
}
