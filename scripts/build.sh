#!/usr/bin/env bash

set -e
set -u
set -o pipefail
set -x

go tool templ generate
npm run build
npm run tailwind
go build -o ./tmp/main cmd/server/main.go
