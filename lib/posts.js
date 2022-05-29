import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'


const filenameComponents = new RegExp('(?<name>[^.]+)\.(?<suffix>[^.]+$)')
const postsDirectory = path.join(process.cwd(), 'posts')

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
