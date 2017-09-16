const { MONGO_URL } = process.env
const db = require('mongojs')(MONGO_URL, ['lambdalyticsCount'])
const app = require('express')()
const requestIp = require('request-ip')
const got = require('got')

app.use(requestIp.mw())

app.get('/', (req, res) => {
  const ref = req.headers.referer
  if (true) {
    got(`freegeoip.net/json/${req.clientIp}`)
        .then(({body}) => {
          body = JSON.parse(body)
          const location = body.country_code + '/' + body.city
          db.lambdalyticsCount.save({
            site: ref,
            ip: req.clientIp || 'unknown',
            location,
            time: Date.now()
          })
        })
  }
  res.set('cache-control', 'max-age=600')
  res.end()
})

app.listen(8888)
