package main

type Cologne struct {
	Id                string `bson:"_id"`
	Name              string `bson:"name"`
	Manufacturer      string `bson:"manufacturer,omitempty"`
	Purchased         bool   `bson:"purchased,omitempty"`
	PurchasedQuantity int64  `bson:"purchased_quantity,omitempty"`
	Picture           string `bson:"picture,omitempty"`
}
