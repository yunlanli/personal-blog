#!/bin/sh

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <path-to-setenv-script>"
    exit 1
fi

. $1
shift

npm run start -- $@
