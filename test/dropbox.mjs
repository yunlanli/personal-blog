import axios from 'axios'
import https from 'https'
import { URL } from 'url'


const accessToken = process.env.DropboxAccessToken
console.log(`dropbox access token: ${accessToken}`)


function https_list_folder_v1(params) {
  let url = 'https://api.dropboxapi.com/2/files/list_folder'
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${params.accessToken}`
    }
  }
  let data = JSON.stringify({
    'path': `${params.req.path}`
  })

  let req = https.request(url, options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
    res.setEncoding('utf8')

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', (e) =>{
    console.error(e)
  })

  req.write(data)
  req.end()
}

function https_download_v1(params) {
  let url = 'https://content.dropboxapi.com/2/files/download'
  let options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${params.accessToken}`,
      'Dropbox-API-Arg': `{"path":"${params.req.path}"}`
    }
  }

  let req = https.request(url, options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
    res.setEncoding('utf8')

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', (e) =>{
    console.error(e)
  })

  req.end()
}

function axios_download_v1(params) {
  axios({
    method: 'post',
    url: 'https://content.dropboxapi.com/2/files/download',
    headers:{
      'Content-Type': 'text/plain; charset=utf-8',
      'Authorization': `Bearer ${params.accessToken}`,
      'Dropbox-API-Arg': `{"path":"${params.req.path}"}`
    }
  })
  .then(response => {
    console.log(`statusCode: ${response.status}`)
    console.log(response.data)
  })
  .catch(err => console.error(err))
}

function axios_list_folder_v1(params) {
  axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/list_folder',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${params.accessToken}`
    },
    data: {
      'path': `${params.req.path}`
    }
  })
    .then(response => {
      console.log(`statusCode: ${response.status}`)
      console.log(response.data)
    })
    .catch(err => console.error(err))
}


// Test
axios_list_folder_v1({ accessToken, req: { path: '/org' } })
axios_download_v1({
  accessToken,
  req: {
    path: '/org/20220527152942-flp_result.org'
  }
})
