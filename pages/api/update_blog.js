import { getCursor, setCursor } from '../../lib/state.js'
import { getToken, list_folder_continue_v1 } from '../../lib/dropbox.js'


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
    try {
      let lastCursor = getCursor()
      console.log(`last cursor: ${lastCursor}`)

      let accessToken = await getToken()
      let params = {
        accessToken,
        req: { cursor: lastCursor }
      }
      let delta = await list_folder_continue_v1(params)

      setCursor(delta.cursor)
      console.log(`webhook delta: \n${JSON.stringify(delta)}`)


      // revalidate `/posts` on demand
      await res.unstable_revalidate('/posts')
      console.log('OK - revalidated /posts')

      // revalidate individual blog post
      for (let item of delta.entries) {
        let postUrl = `/posts/${item.name}`
        let tag = item['.tag']

        if (tag === 'deleted') {
          await res.unstable_revalidate(postUrl)
          console.log(`OK - revalidate ${postUrl}`)
        } else if (tag === 'file') {
          await res.unstable_revalidate(postUrl)
          console.log(`OK - revalidated ${postUrl}`)
        } else {
          console.log(`Unknown tag ${tag} - revalidate ${postUrl}`)
        }
      }

      return res.json({ revalidated: true })
    } catch (err) {
      console.log('Revalidated /posts...FAIL')
      console.error(err)
      return res.status(500).send('Error revalidating')
    }
  } else {
    return res.status(501).send('Not implemented')
  }
}
