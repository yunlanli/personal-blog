export default async function handler(req, res) {
  console.log(`${req.method} -> ${req.url}`)
  console.log(req.query)

  if (req.query.secret !== process.env.MY_BLOG_SECRET_TOKEN) {
    console.log('invalid secret token')
    return res.status(401).json({ message: 'Invalid secret token' })
  }

  if (req.method === 'GET') {
    // handle dropbox's intial *verification request* for using webhooks
    if (req.query.challenge) {
      console.log(`-> verification request: echo back ${req.query.challenge}`)

      res.setHeader('Content-Type', 'text/plain')
      res.setHeader('X-Content-Type-Options', 'nosniff')
      return res.end(req.query.challenge)
    } else {
      console.log('invalid verification request without query parameter _challenge_')
      return res.status(401).json({ message: 'missing query param challenge' })
    }
  } else if (req.method === 'POST') {
    // revalidate `/posts` on demand
    try {
      console.log(`Received Dropbox's webhook, with data: \n${JSON.stringify(req.body)}`)

      await res.unstable_revalidate('/posts')
      console.log('Revalidated /posts...OK')

      // TODO: revalidate individual blog post

      return res.json({ revalidated: true })
    } catch (err) {
      console.log('Revalidated /posts...FAIL')
      return res.status(500).send('Error revalidating')
    }
  } else {
    return res.status(501).send('Not implemented')
  }
}
