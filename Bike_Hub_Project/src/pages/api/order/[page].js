import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    try {
        const totalOrders = await prisma.order.count();
        const orders = await prisma.order.findMany({
            skip: skip,
            take: pageSize,
            orderBy: {
                created_at: 'desc'
            }
        });

        const results = orders.map(order => ({
            ...order,
            idStr: order.id.toString().padStart(5, '0'),
            shipmentStatus: order.shipped ? 'Delivered' : 'Pending'
        }));

        res.status(200).json({
            orders: results,
            totalOrders,
            totalPages: Math.ceil(totalOrders / pageSize)
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
