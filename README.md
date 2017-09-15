# lambdalytics

Naive analytics implementation with close to no features.

Requires `MONGO_URL` env variable to point to a mongo database.

Stores
```
{
  ip,
  site,
  time
}
```
for each incoming request to `/` on port `8888`
