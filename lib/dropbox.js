import axios from 'axios'


/******************************************************************************
 *   Environment Variables
 *****************************************************************************/

const Code = process.env.DropboxAuthorizationCode
const AppKey = process.env.DropboxAppKey
const AppSecret = process.env.DropboxAppSecret
const RefreshToken = process.env.DropboxRefreshToken


/******************************************************************************
 *   OAuth
 *****************************************************************************/

export function generateToken() {
  return axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/oauth2/token',
    auth: {
      username: AppKey,
      password: AppSecret
    },
    data: `code=${Code}&grant_type=authorization_code`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function renewToken(refreshToken) {
  return axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/oauth2/token',
    auth: {
      username: AppKey,
      password: AppSecret
    },
    data: `refresh_token=${refreshToken}&grant_type=refresh_token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export async function getToken() {
  return await renewToken(RefreshToken)
    .then(response => {
      console.log(`OK - GET api.dropboxapi.com /oauth2/token`)

      return response.data.access_token
    })
    .catch(err => console.error(err))
}


/******************************************************************************
 *   Content API Wrappers
 *****************************************************************************/

export async function list_folder_v1(params) {
  return await axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/list_folder',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${params.accessToken}`
    },
    data: params.req
  })
    .then(response => {
      console.log(`OK - POST api.dropboxapi.com .../list_folder (${params.req.path})`)
      console.log(`ls ${params.req.path}: ${response.data.entries.map(v => v.name)}`)

      return response.data
    })
    .catch(err => console.error(err))
}

export async function list_folder_continue_v1(params) {
  return await axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/list_folder/continue',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${params.accessToken}`
    },
    data: params.req
  })
    .then(response => {
      console.log(`OK - POST api.dropboxapi.com .../list_folder/continue`)

      return response.data
    })
    .catch(err => console.error(err))
}

export async function download_v1(params) {
  return axios({
    method: 'post',
    url: 'https://content.dropboxapi.com/2/files/download',
    headers:{
      'Content-Type': 'text/plain; charset=utf-8',
      'Authorization': `Bearer ${params.accessToken}`,
      'Dropbox-API-Arg': `{"path":"${params.req.path}"}`
    }
  })
  .then(response => {
    console.log(`OK - POST content.dropboxapi.com [ download ${params.req.path} ]`)

    return response.data
  })
  .catch(err => console.error(err))
}

export async function get_last_cursor_v1(params) {
  return axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/list_folder/get_latest_cursor',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${params.accessToken}`,
    },
    data: params.req
  })
  .then(response => {
    console.log(`OK - POST api.dropboxapi.com .../get_latest_cursor`)

    return response.data.cursor
  })
  .catch(err => console.error(err))
}
