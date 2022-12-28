package main

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"strconv"
)

func listColognes(c *gin.Context) {
	colognesCollection := mongoDB.Collection("colognes")
	cursor, err := colognesCollection.Find(c, bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var colognes []Cologne
	err = cursor.All(c, &colognes)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, &colognes)
}

func createCologne(c *gin.Context) {
	colognes := mongoDB.Collection("colognes")
	purchased, err := strconv.ParseBool(c.PostForm("purchased"))
	if err != nil {
		log.Fatal(err)
	}

	purchasedQuantity, err := strconv.ParseInt(c.PostForm("purchased_quantity"), 10, 10)
	if err != nil {
		log.Fatal(err)
	}

	cologne := Cologne{
		Name:              c.PostForm("name"),
		Manufacturer:      c.PostForm("manufacturer"),
		Purchased:         purchased,
		PurchasedQuantity: purchasedQuantity,
	}
	insertOneResult, err := colognes.InsertOne(c, cologne)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, insertOneResult)
}

func getCologne(c *gin.Context) {

}

func updateCologne(c *gin.Context) {

}

func deleteCologne(c *gin.Context) {

}
