import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

import { download_v1, getToken, list_folder_v1 } from './dropbox.js'
import { setCursor } from './state.js'


const filenameComponents = new RegExp('(?<name>[^.]+)\.(?<suffix>[^.]+$)')
const postsDirectory = path.join(process.cwd(), 'posts')
const dbxPostsPath = (fn) => `/org/${fn}`

function formatDate(date) {
  let month = date.getMonth()
  let day = date.getDate()

  if (month < 10)
    month = `0${month}`

  if (day < 10)
    day = `0${day}`

  return `${date.getFullYear()}-${month}-${day}`
}

// get the last modification time of file @ filePath
function getMtime(filePath) {
  let fd = fs.openSync(filePath, 'r')
  let mtime = fs.fstatSync(fd).mtime

  return formatDate(mtime)
}

export function getSortedPostsData() {
  // Sort posts by date
  return getAllPostIds()
    .map(({ params }) => getPostData(params.id))
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
}

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
  }

  // TODO: deal with unknown file extension
}

export function getAllPostIds() {
  let fileNames = fs.readdirSync(postsDirectory);

  fileNames = fileNames.filter(
    fileName => fileName.match(filenameComponents) !== null)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName
      }
    }
  })
}

export function getPostData(id) {
  const fullpath = path.join(postsDirectory, id);
  const params = id.match(filenameComponents).groups
  const fileContents = fs.readFileSync(fullpath, 'utf8')
  if (params.suffix == 'html') {
    // use time of last modification as the date of the article
    return {
      id,
      content: fileContents,
      title: params.name,
      date: getMtime(fullpath),
      ext: 'html'
    }
  } else if (params.suffix == 'md') {
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      content: matterResult.content,
      ...matterResult.data,
      ext: 'md'
    }
  }

  // TODO: deal with unknown file extension
}
