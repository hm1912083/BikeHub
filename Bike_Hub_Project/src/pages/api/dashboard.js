import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const categoriesCount = await prisma.category.count();
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();
    const totalPurchases = await prisma.order.aggregate({
      _sum: {
        billing_total: true,
      },
    });

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const bestSellingProductId = await prisma.orderProduct.groupBy({
      by: ["product_id"],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 1,
    });

    let bestSellingProduct = {};

    const best_selling_product_id =
      bestSellingProductId.length > 0
        ? bestSellingProductId[0].product_id
        : null;

        const quantity =
      bestSellingProductId.length > 0
        ? bestSellingProductId[0]._sum.quantity
        : null;

    if (best_selling_product_id) {
      bestSellingProduct = await prisma.product.findUnique({
        where: {
          id: best_selling_product_id,
        },
      });
      bestSellingProduct.soldSoFar = quantity
    }

    res.status(200).json({
      stats: {
        categoriesCount,
        productsCount,
        ordersCount,
        totalPurchases: totalPurchases._sum.billing_total || 0,
      },
      categories: categories,
      bestSellingProduct: bestSellingProduct,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
