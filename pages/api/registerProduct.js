import React from "react";
import nc from "next-connect";
import Products from "../../models/Product";
import db from "../../utils/db";
export default async function registerProduct(req, res) {
  const handler = nc();
  if (req.method === "GET") {
    res.status(200).end();
  } else if (req.method === "POST") {
    try {
      const {
        name,
        description,
        price,
        quantity,
        isFlammable,
        isFragile,
        isExplosive,
        image,
        title,
        Identity,
        isLiquid,
        isObject,
        dimensions,
        category,
      } = req.body;
      const productData = {
        name: name,
        title: title,
        slug: `${title}000${Math.floor(Math.random() * 1000)}`,
        price: price,
        image: "https://picsum.photos/seed/picsum/200/300",
        description: {
          short: description.short,
          long: description.long,
        },
        category: category,
        rating: 4.5,
        numReviews: 10,
        numOrders: 10,
        numViews: 10,
        numFavorites: 10,
        numCart: 1,
        numWishlist: 10,
        numSold: 10,
        numInStock: quantity,
        Identity: Identity,
        isObject: isObject,
        dimensions: {
          width: dimensions.width,
          height: dimensions.height,
          length: dimensions.length,
        },
        isFragile: isFragile,
        isLiquid: isLiquid,
        isFlammable: isFlammable,
        isExplosive: isExplosive,
      };
      console.log(productData);
      // handler.post(async (req, res) => {
      await db.connect();
      await Products.insertMany(productData);
      await db.disconnect();
      //   res.send("success").status(200);
      // });
      res.status(200).end();
    } catch (err) {
      res.status(err).json({});
    }
  } else {
    res.end("other request");
  }
}