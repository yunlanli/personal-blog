import matter from 'gray-matter'

import { download_v1, getToken, list_folder_v1 } from './dropbox.js'
import { setCursor } from './state.js'


const filenameComponents = new RegExp('(?<name>[^.]+)\.(?<suffix>[^.]+$)')
const dbxPostsPath = (fn) => `/org/${fn}`


export async function dbxGetSortedPostsData() {
  const accessToken = await getToken()
  const params = {
    accessToken,
    req: { path: '/org' }
  }
  const dropboxData = await list_folder_v1(params)
  const comparator = (a, b) => a.date < b.date ? 1 : -1

  // update cursor value
  setCursor(dropboxData.cursor)

  return dropboxData.entries
    .map(({ name, client_modified })  => {
      return {
        id: name,
        title: name.match(filenameComponents).groups.name,
        date: client_modified.split('T')[0] // TODO: a clean way of dealing with date
      }
    })
    .sort(comparator)
}

export async function dbxGetAllPostIds() {
  const accessToken = await getToken()
  const params = {
    accessToken,
    req: { path: '/org' }
  }
  const dropboxData = await list_folder_v1(params)

  // update cursor value
  setCursor(dropboxData.cursor)

  return dropboxData.entries.map(({ name })  => {
    return {
      params: {
        id: name
      }
    }
  })
}

export async function dbxGetPostData(id) {
  const accessToken = await getToken()
  const params = {
    accessToken,
    req: { path: dbxPostsPath(id) }
  }
  const fileContents = await download_v1(params)
  const fn = id.match(filenameComponents).groups
  console.log(typeof(fileContents))

  // file has been deleted
  if (fileContents == null)
    return null

  if (fn.suffix == 'html') {
    // use time of last modification as the date of the article
    return {
      id,
      content: fileContents,
      title: fn.name,
      date: '2022-05-31', // TODO: embed date info in [id]
      ext: 'html'
    }
  } else if (fn.suffix == 'md') {
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      content: matterResult.content,
      ...matterResult.data,
      ext: 'md'
    }
  } else {
    // unknown file extension: log and use 404 page
    console.log(`dbxGetPostData(${id}): unknown file extension ${fn.suffix}`)
    return null
  }

}
