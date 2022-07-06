#!/bin/sh

docker_registry=${DOCKER_REGISTRY:-docker.io}
commit_hash=$(git log -1 --format=%H)
image_name="$docker_registry/yunlanli/personal-blog"
tag="$image_name:$commit_hash"
latest="$image_name:latest"

docker build \
    --target personal-website \
    -t $tag -t $latest . \
    --secret id=dbx_app_key,src=.secrets/dbx_app_key \
    --secret id=dbx_app_secret,src=.secrets/dbx_app_secret \
    --secret id=dbx_access_token,src=.secrets/dbx_access_token \
    --secret id=dbx_refresh_token,src=.secrets/dbx_refresh_token \
    --secret id=dbx_authorization_code,src=.secrets/dbx_authorization_code \
    --secret id=personal_blog_secret,src=.secrets/personal_blog_secret \
    --label author=chnsidney@gmail.com
