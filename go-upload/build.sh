#!/bin/bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
export PATH="$PATH:$(go env GOPATH)/bin"
rm -Rf generated
mkdir generated

mkdir generated/social
cd proto
protoc --go_out=../generated/social --go_opt=paths=source_relative \
    --go-grpc_out=../generated/social --go-grpc_opt=paths=source_relative \
    *.proto
cd ..

go get -d ./...
go build -o myapp
