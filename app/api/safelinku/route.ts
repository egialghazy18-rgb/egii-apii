import { NextRequest, NextResponse } from 'next/server'
import chromium from '@sparticuz/chromium'
import playwright from 'playwright-core'

export const maxDuration = 60

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ status: false, message: 'Parameter url wajib diisi' }, { status: 400 })
  }

  let browser = null
  try {
    browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true
    })

    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })

    const finalUrl = page.url()

    return NextResponse.json({
      status: true,
      input: url,
      result: finalUrl,
      author: 'Egii Apii'
    })

  } catch (e: any) {
    return NextResponse.json({ status: false, message: e.message }, { status: 500 })
  } finally {
    if (browser) await browser.close()
  }
}
