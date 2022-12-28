package main

import (
	"github.com/gin-gonic/gin"
	"log"
)

func addAttributes(c *gin.Context) {
	attributesCollection := mongoDB.Collection("attributes")
	cologne := c.Param("cologne")
	attributesArray := c.PostFormArray("attributes")

	var attributes []interface{}
	for _, attribute := range attributesArray {
		attributes = append(attributes, Attributes{Cologne: cologne, Attribute: attribute})
	}

	insertManyResult, err := attributesCollection.InsertMany(c, attributes)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertManyResult.InsertedIDs)
}

func deleteAttributes(c *gin.Context) {

}

func searchAttributes(c *gin.Context) {

}
