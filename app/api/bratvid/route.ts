import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('text') || 'brat'

  try {
    const { generateBratVideo } = require('../../../bratgen.js')
    const outPath = await generateBratVideo({ text, theme: 'white', blur: 0, format: 'mp4', holdDuration: 1.5, fastProgress: true })
    
    const { readFileSync, unlinkSync } = require('fs')
    const video = readFileSync(outPath)
    unlinkSync(outPath)

    return new NextResponse(video, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="bratvid.mp4"'
      }
    })
  } catch (err: any) {
    return NextResponse.json({ 
      status: false, 
      message: err.message,
      stack: err.stack,
      code: err.code
    }, { status: 500 })
  }
}
