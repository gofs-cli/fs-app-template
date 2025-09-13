FROM golang:1.25.1
RUN apt-get update && apt-get install -y nodejs npm git make bash
RUN go install github.com/a-h/templ/cmd/templ@latest
RUN go install golang.org/x/tools/gopls@latest
