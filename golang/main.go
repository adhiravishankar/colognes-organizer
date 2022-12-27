package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

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
}
