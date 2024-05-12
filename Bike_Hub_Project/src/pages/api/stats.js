import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { month } = req.query;
  const date = new Date(month);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();

  try {
    // Convert timestamps to JavaScript Date objects
    const startOfMonth = new Date(year, monthIndex, 1);
    const endOfMonth = new Date(year, monthIndex + 1, 1);

    // Use Date objects directly in Prisma queries
    const ordersCount = await prisma.order.count({
      where: {
        created_at: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    const monthlySales = await prisma.order.aggregate({
      _sum: {
        billing_total: true,
      },
      where: {
        created_at: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
    });

    res.status(200).json({
      ordersCount,
      monthlySales: monthlySales._sum.billing_total || 0,  // Adjusted field name to `billing_total` to match your model
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
