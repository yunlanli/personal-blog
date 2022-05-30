/* This module illustrates how to obtain and renew Dropbox access tokens */

import axios from 'axios'


/*
 * Get a new code by visiting the URL below
 * https://www.dropbox.com/oauth2/authorize?client_id=lep52a48v4bbttb&token_access_type=offline&response_type=code
 *
 * Set the code as the value for env var DropboxAuthorizationCode
 * Set the env var DropboxAppKey and DropboxAppSecret
 *
 * Run `test()` to obtain a long-lived `refresh_token`, after which we can
 * securley store it as an env var DropboxRefreshToken and pass it to
 * `renewToken` to get a new access token when the current one expires.
 *
 *
 * For details, refer to the following sites:
 *
 *   1. https://developers.dropbox.com/oauth-guide
 *   2. https://www.dropbox.com/developers/documentation/http/documentation#oauth2-authorize
 *   3. https://www.dropbox.com/developers/documentation/http/documentation#oauth2-token
 */

const Code = process.env.DropboxAuthorizationCode
const AppKey = process.env.DropboxAppKey
const AppSecret = process.env.DropboxAppSecret
const RefreshToken = process.env.DropboxRefreshToken

function generateToken() {
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

function renewToken(refreshToken) {
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

function test() {
  generateToken()
    .then(response => {
      console.log(`statusCode: ${response.status}`)
      console.log(response.data)

      return renewToken(response.data.refresh_token)
    })
    .then(response => {
      console.log(`get *refresh token*, statusCode: ${response.status}`)
      console.log(response.data)
    })
    .catch(err => console.error(err))
}

// Experiment
test()

// get a new access token
renewToken(RefreshToken)
  .then(response => {
    console.log(`statusCode: ${response.status}`)
    console.log(response.data)
  })
  .catch(err => console.error(err))
