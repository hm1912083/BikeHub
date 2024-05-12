import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const page = req.query.page || 1;
    const pageSize = 10;  // Number of items per page
    const skip = (page - 1) * pageSize;

    try {
        const totalProducts = await prisma.product.count();
        const products = await prisma.product.findMany({
            skip: skip,
            take: pageSize,
            include: {
                category: true  // Assuming you have a relation setup in Prisma schema
            }
        });

        res.status(200).json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / pageSize)
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
