$(shell cp -n .env.example .env)
include .env
export

run: dbup
	@go tool air
.PHONY: run

lint:
	@golangci-lint run
.PHONY: lint

build:
	@go build cmd/server/main.go
.PHONY: build

test:
	@go test -v ./...
.PHONY: test

dbup:
	@if [ -n "$$DSN" ]; then \
		docker compose -f docker/docker-compose.yml up -d postgres; \
    fi
.PHONY: dbup

dbdown:
	@docker compose -f docker/docker-compose.yml down
.PHONY: dbdown

gendata: dbdown dbup
	@go test -v -tags=gendata -count=1 ./...
.PHONY: gendata

codegen:
	@go generate ./...
.PHONY: gencode
