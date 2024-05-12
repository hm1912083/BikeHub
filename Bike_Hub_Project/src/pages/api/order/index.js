import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const ip_address =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  switch (req.method) {
    case "POST":
      try {
        const { formData, cartItems, total } = req.body;

        const order = await prisma.order.create({
          data: {
            billing_email: formData.email,
            billing_name: formData.name,
            billing_address: formData.address,
            billing_city: formData.city,
            billing_province: formData.province,
            billing_postalcode: formData.postalCode,
            billing_phone: formData.phone,
            billing_total: parseInt(total), // Ensure total is an integer
            shipped: false,
            order_products: {
              create: cartItems.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
              })),
            },
          },
          include: {
            order_products: {
              include: {
                product: true,
              },
            },
          },
        });

        await Promise.all(
          cartItems.map((item) =>
            Promise.all([
              prisma.product.update({
                where: { id: item.product_id },
                data: { quantity: { decrement: item.quantity } },
              }),
              prisma.cart.deleteMany({
                where: {
                  product_id: item.product_id,
                  ip_address: ip_address,
                },
              }),
            ])
          )
        );

        res.status(200).json({
          success: true,
          message: "Order created successfully!",
          order,
        });
      } catch (error) {
        console.error("Failed to create order: ", error);
        res.status(500).json({
          success: false,
          message: "Failed to create order",
          error: error.message,
        });
      }

    default:
      return res.status(405).end();
  }
}
