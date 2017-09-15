const { MONGO_URL } = process.env
const db = require('mongojs')(MONGO_URL, ['lambdalyticsCount'])
const app = require('express')()
const requestIp = require('request-ip')

app.use(requestIp.mw())

app.get('/', (req, res) => {
  const ref = req.headers.referer
  if (ref) {
    db.lambdalyticsCount.save({
      site: ref,
      ip: req.clientIp || 'unknown',
      time: Date.now()
    })
  }
  res.set('cache-control', 'max-age=600')
  res.end()
})

app.listen(8888)
