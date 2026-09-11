import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, unlinkSync } from 'fs'

const { generateBratVideo } = require('../../../bratgen.js')

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text') || 'brat'
  const theme = searchParams.get('theme') || 'white'
  const format = searchParams.get('format') || 'mp4'

  try {
    const outPath = await generateBratVideo({
      text,
      theme,
      blur: 0,
      format,
      holdDuration: 1.5,
      fastProgress: true
    })

    const video = readFileSync(outPath)
    unlinkSync(outPath)

    return new NextResponse(video, {
      headers: {
        'Content-Type': format === 'gif' ? 'image/gif' : 'video/mp4',
        'Content-Disposition': `attachment; filename="bratvid.${format}"`
      }
    })
  } catch (err: any) {
    return NextResponse.json({ 
      status: false, 
      message: err.message,
      stack: err.stack
    }, { status: 500 })
  }
}
