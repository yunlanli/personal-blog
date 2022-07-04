#!/bin/sh

export DropboxAuthorizationCode=$(cat /run/secrets/dbx_authorization_code)
export DropboxAppKey=$(cat /run/secrets/dbx_app_key)
export DropboxAppSecret=$(cat /run/secrets/dbx_app_secret)
export DropboxAccessToken=$(cat /run/secrets/dbx_access_token)
export DropboxRefreshToken=$(cat /run/secrets/dbx_refresh_token)
export MY_BLOG_SECRET_TOKEN=$(cat /run/secrets/personal_blog_secret)

npm run build