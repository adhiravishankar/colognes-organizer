package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strings"
)

func addAttributes(c *gin.Context) {
	attributesCollection := mongoDB.Collection("attributes")
	cologne := c.Param("cologne")

	var attributesArray []string
	err := c.BindJSON(&attributesArray)
	if err != nil {
		_ = c.AbortWithError(500, err)
	}

	var attributes []interface{}
	for _, attribute := range attributesArray {
		lowerAttribute := strings.ToLower(attribute)
		id := uuid.New().String()
		attributes = append(attributes, Attributes{Cologne: cologne, Attribute: lowerAttribute, Id: id})
	}

	_, err = attributesCollection.InsertMany(c, attributes)
	if err != nil {
		_ = c.AbortWithError(500, err)
	}
	c.JSON(200, attributes)
}

func getAttributes(c *gin.Context) []Attributes {
	attributesCollection := mongoDB.Collection("attributes")
	cursor, err := attributesCollection.Find(c, bson.D{{"cologne_id", c.Param("cologne")}})
	if err != nil {
		log.Fatal(err)
	}
	var attributes []Attributes
	err = cursor.All(c, &attributes)
	if err != nil {
		log.Fatal(err)
	}

	return attributes
}

func deleteAttributes(c *gin.Context) {

}

func searchAttributes(c *gin.Context) {

}
