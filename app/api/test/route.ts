import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { createCanvas } = require('@napi-rs/canvas')
    const canvas = createCanvas(100, 100)
    return NextResponse.json({ status: true, message: 'canvas works!' })
  } catch (err: any) {
    return NextResponse.json({ 
      status: false, 
      message: err.message,
      code: err.code
    })
  }
}
