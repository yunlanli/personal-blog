FROM node:16.15.1-alpine

RUN addgroup -g 101 userapp && adduser -D -G userapp -u 10001 nextjs
WORKDIR /home/user/nextjs
USER nextjs

# WORKDIR /opt/personal-blog
COPY --chown=nextjs . personal-blog/

WORKDIR personal-blog
RUN npm install
RUN --mount=type=secret,id=dbx_app_key,uid=10001,gid=101,mode=0440 \
    --mount=type=secret,id=dbx_app_secret,uid=10001,gid=101,mode=0440 \
    --mount=type=secret,id=dbx_access_token,uid=10001,gid=101,mode=0440 \
    --mount=type=secret,id=dbx_refresh_token,uid=10001,gid=101,mode=0440 \
    --mount=type=secret,id=dbx_authorization_code,uid=10001,gid=101,mode=0440 \
    --mount=type=secret,id=personal_blog_secret,uid=10001,gid=101,mode=0440 \
    . ./scripts/setenv.sh && npm run build

ENTRYPOINT ["scripts/run.sh", "scripts/setenv.sh"]
CMD ["--port=8000"]
