package main

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	mongoOptions "go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

var mongoDB *mongo.Database
var s3Client *s3.Client

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	connectToMongo()
	connectToS3()

	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/colognes", listColognes)
	router.POST("/colognes", createCologne)
	router.GET("/colognes/:cologne", getCologne)
	router.PUT("/colognes/:cologne", updateCologne)
	router.DELETE("/colognes/:cologne", deleteCologne)

	// Attributes
	router.POST("/colognes/:cologne/attributes", addAttributes)
	router.DELETE("/colognes/:cologne/attributes", deleteAttributes)
	router.GET("/search", searchAttributes)

	err = router.Run(":9001")
	if err != nil {
		log.Fatal(err)
	}
}

func connectToMongo() {
	apiOptions := mongoOptions.ServerAPI(mongoOptions.ServerAPIVersion1)
	clientOptions := mongoOptions.Client().ApplyURI(os.Getenv("MONGODB_URL")).SetServerAPIOptions(apiOptions)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("colognes-golang")
	mongoDB = db
}

func connectToS3() {
	awsAccessKey := os.Getenv("AWS_ACCESS_KEY")
	awsAccessSecret := os.Getenv("AWS_ACCESS_SECRET")
	awsCredentials := credentials.NewStaticCredentialsProvider(awsAccessKey, awsAccessSecret, "")
	options := s3.Options{
		Region:      "us-east-2",
		Credentials: aws.NewCredentialsCache(awsCredentials),
	}

	s3Client = s3.New(options)
}
