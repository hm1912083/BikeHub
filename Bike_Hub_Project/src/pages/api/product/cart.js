import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const ip_address =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  switch (req.method) {
    case "POST":
      const { product_id, name, price, quantity, slug, image } = req.body;

      try {
        const whereClause = {
          product_id: product_id,
          ip_address: ip_address,
        };

        const duplicateItem = await prisma.cart.findFirst({
          where: whereClause,
        });

        if (duplicateItem) {
          return res
            .status(409)
            .json({ message: "Item is already in your cart" });
        }

        const newItemData = {
          product_id: product_id,
          name: name,
          price: price,
          quantity: quantity,
          // slug:slug,
          image: image,
          ip_address: ip_address,
        };

        const newItem = await prisma.cart.create({
          data: newItemData,
        });

        return res.status(200).json(newItem);
      } catch (error) {
        return res.status(500).json({
          message: "Failed to add item to cart",
          error: error.message,
        });
      }

    case "GET":
      try {
        if (!ip_address) {
          return res.status(400).json({ message: "IP address is required" });
        }

        // Fetch all cart items for the given IP address
        const cartItems = await prisma.cart.findMany({
          where: {
            ip_address: ip_address,
          },
        });

        if (cartItems.length === 0) {
          return res
            .status(404)
            .json({ message: "No cart items found for this IP address" });
        }

        return res.status(200).json(cartItems);
      } catch (error) {
        return res.status(500).json({
          message: "Failed to retrieve cart items",
          error: error.message,
        });
      }

    case "DELETE":
      try {
        if (!ip_address) {
          return res.status(400).json({ message: "IP address is required" });
        }
        const { id } = req.body;

        const deleteResponse = await prisma.cart.deleteMany({
          where: {
            product_id: id,
            ip_address: ip_address,
          },
        });

        if (deleteResponse.count === 0) {
          return res.status(404).json({
            message: "No cart item found with the provided identifiers",
          });
        }

        return res.status(200).json({
          message: "Cart item removed successfully",
          count: deleteResponse.count,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Failed to remove cart item",
          error: error.message,
        });
      }

    case "PATCH":
      try {
        if (!ip_address) {
          return res.status(400).json({ message: "IP address is required" });
        }
        const { product_id, quantity } = req.body;

        const result = await prisma.cart.updateMany({
          where: {
            product_id,
            ip_address,
          },
          data: {
            quantity,
          },
        });

        if (result.count === 0) {
          return res.status(404).json({
            message: "No cart item found with the provided identifiers",
          });
        }

        return res
          .status(200)
          .json({ message: "Quantity updated successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Failed to update quantity", error: error.message });
      }

    default:
      return res.status(405).end();
  }
}
