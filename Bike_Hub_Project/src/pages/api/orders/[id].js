import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        order_products: {
          include: {
            product: true,
          },
        },
        user: true, // If you also want to include the user details
      },
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Failed to fetch order:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
