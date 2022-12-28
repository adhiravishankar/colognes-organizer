package main

type Cologne struct {
	Id                string `bson:"_id"`
	Name              string `bson:"name"`
	Manufacturer      string `bson:"manufacturer,omitempty"`
	Purchased         bool   `bson:"purchased,omitempty"`
	PurchasedQuantity int64  `bson:"purchased_quantity,omitempty"`
	Picture           string `bson:"picture,omitempty"`
	Notes             string `bson:"notes,omitempty"`
}

type Attributes struct {
	Id        string `bson:"_id"`
	Attribute string `bson:"attribute,omitempty"`
	Cologne   string `bson:"cologne_id,omitempty"`
}
