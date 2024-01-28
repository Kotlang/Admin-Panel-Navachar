package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	pb "github.com/lauquik/admin-panel/generated/social"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/metadata"
)

func main() {
	http.HandleFunc("/upload", handleFileUpload)
	fmt.Println("started server at 8082")
	log.Fatal(http.ListenAndServe(":8082", nil))
}

func handleFileUpload(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// Handle OPTIONS request for CORS preflight
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	bearerToken := r.Header.Get("Authorization")
	if bearerToken == "" {
		http.Error(w, "Authorization header is required", http.StatusBadRequest)
		return
	}

	bearerToken = strings.TrimPrefix(bearerToken, "Bearer ")
	file, handler, err := r.FormFile("myFile")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	uploadPath, err := uploadPostMediaToServer(bearerToken, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Determine the MIME type
	var mimeType string
	switch filepath.Ext(handler.Filename) {
	case ".jpg", ".jpeg", ".png":
		mimeType = "image"
	case ".mkv", ".mp4":
		mimeType = "video"
	default:
		mimeType = "unknown"
	}

	// Create a response struct
	type response struct {
		URL      string `json:"url"`
		MimeType string `json:"mimetype"`
	}

	resp := response{
		URL:      uploadPath,
		MimeType: mimeType,
	}

	respJSON, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(respJSON)
}

func uploadPostMediaToServer(bearerToken string, imageData []byte) (string, error) {
	var opts []grpc.DialOption
	serverAddress := os.Getenv("SOCIAL_SERVER_ADDRESS")
	opts = append(opts, grpc.WithUnaryInterceptor(unaryInterceptor(bearerToken)))
	opts = append(opts, grpc.WithStreamInterceptor(streamInterceptor(bearerToken)))
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	conn, err := grpc.Dial(serverAddress, opts...)
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()
	client := pb.NewUserPostClient(conn)

	path, err := uploadPostMedia(client, imageData)
	if err != nil {
		return "", err
	}
	return path, nil
}

// unaryInterceptor adds a bearer token to each request
func unaryInterceptor(bearerToken string) grpc.UnaryClientInterceptor {
	return func(
		ctx context.Context,
		method string,
		req, reply interface{},
		cc *grpc.ClientConn,
		invoker grpc.UnaryInvoker,
		opts ...grpc.CallOption,
	) error {
		// Add the bearer token to the context
		newCtx := metadata.AppendToOutgoingContext(ctx, "authorization", "Bearer "+bearerToken)

		// Proceed with the request
		return invoker(newCtx, method, req, reply, cc, opts...)
	}
}

func uploadPostMedia(client pb.UserPostClient, imageData []byte) (string, error) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	stream, err := client.UploadPostMedia(ctx)
	if err != nil {
		return "", err
	}

	// Send the image data as a chunk
	if err := stream.Send(&pb.UploadPostMediaRequest{ChunkData: imageData}); err != nil {
		return "", err
	}

	response, err := stream.CloseAndRecv()
	if err != nil {
		return "", err
	}
	return response.GetUploadPath(), nil
}

func streamInterceptor(bearerToken string) grpc.StreamClientInterceptor {
	return func(ctx context.Context, desc *grpc.StreamDesc, cc *grpc.ClientConn, method string, streamer grpc.Streamer, opts ...grpc.CallOption) (grpc.ClientStream, error) {
		newCtx := metadata.AppendToOutgoingContext(ctx, "authorization", "Bearer "+bearerToken)
		return streamer(newCtx, desc, cc, method, opts...)
	}
}
