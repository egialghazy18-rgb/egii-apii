import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text') || 'brat'
  const theme = searchParams.get('theme') || 'white'
  const format = searchParams.get('format') || 'mp4'

  try {
    const res = await fetch(`http://localhost:5001/bratvid?text=${encodeURIComponent(text)}&theme=${theme}&format=${format}`)
    const buffer = await res.arrayBuffer()
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': format === 'gif' ? 'image/gif' : 'video/mp4',
        'Content-Disposition': `attachment; filename="bratvid.${format}"`
      }
    })
  } catch (err: any) {
    return NextResponse.json({ status: false, message: err.message }, { status: 500 })
  }
}
