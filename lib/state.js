import fs from 'fs'
import path from 'path'


const dbxState = path.join(process.cwd(), '.dropbox')

export function setCursor(value) {
  if (fs.existsSync(dbxState)) {
    let contents = JSON.parse(fs.readFileSync(dbxState))

    // modify cursor value
    contents.cursor = value

    fs.writeFileSync(dbxState, JSON.stringify(contents), { flag: 'w+' }, err => {
      console.error(err)
    })
  } else {
    let contents = JSON.stringify({ cursor: value })
    fs.writeFileSync(dbxState, contents, { flag: 'w+' }, err => {
      console.error(err)
    })
  }
}

export function getCursor() {
  let cursor = null

  if (fs.existsSync(dbxState)) {
    let contents = JSON.parse(fs.readFileSync(dbxState))
    if (contents.cursor)
      cursor = contents.cursor
  }

  return cursor
}
