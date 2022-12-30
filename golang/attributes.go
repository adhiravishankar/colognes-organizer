package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"log"
)

func addAttributes(c *gin.Context) {
	attributesCollection := mongoDB.Collection("attributes")
	cologne := c.Param("cologne")
	attributesArray := c.PostFormArray("attributes")

	var attributes []interface{}
	for _, attribute := range attributesArray {
		attributes = append(attributes, Attributes{Cologne: cologne, Attribute: attribute, Id: uuid.New().String()})
	}

	insertManyResult, err := attributesCollection.InsertMany(c, attributes)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertManyResult.InsertedIDs)
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
