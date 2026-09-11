const http = require('http')
const { generateBratVideo } = require('./bratgen.js')
const { readFileSync, unlinkSync } = require('fs')
const { URL } = require('url')

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  
  if (url.pathname !== '/bratvid') {
    res.writeHead(404)
    res.end(JSON.stringify({ status: false, message: 'Not found' }))
    return
  }

  const text = url.searchParams.get('text') || 'brat'
  const theme = url.searchParams.get('theme') || 'white'
  const format = url.searchParams.get('format') || 'mp4'

  try {
    const outPath = await generateBratVideo({ text, theme, blur: 0, format, holdDuration: 1.5, fastProgress: true })
    const video = readFileSync(outPath)
    unlinkSync(outPath)
    res.writeHead(200, {
      'Content-Type': format === 'gif' ? 'image/gif' : 'video/mp4',
      'Content-Disposition': `attachment; filename="bratvid.${format}"`
    })
    res.end(video)
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: false, message: err.message }))
  }
})

server.listen(5001, () => console.log('Bratgen server running on port 5001'))
