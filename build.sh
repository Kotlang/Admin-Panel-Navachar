rm -Rf src/generated
mkdir src/generated
cd social-model
protoc --js_out=import_style=commonjs,binary:../src/generated \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:../src/generated \
    *.proto
cd ..

cd auth-model
protoc --js_out=import_style=commonjs,binary:../src/generated \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:../src/generated \
    *.proto
cd ..

cd localization-model
protoc --js_out=import_style=commonjs,binary:../src/generated \
    --grpc-web_out=import_style=typescript,mode=grpcwebtext:../src/generated \
    *.proto
cd ..

# yarn build