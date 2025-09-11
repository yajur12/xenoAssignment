import { Order, Customer } from '../models/index.js';
import { Op, fn, col, literal } from 'sequelize';

// Dashboard metrics for a tenant
export const getDashboardMetrics = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { startDate, endDate } = req.query;
    const dateFilter = startDate && endDate ? {
      orderDate: { [Op.between]: [new Date(startDate), new Date(endDate)] }
    } : {};

    // Total customers
    const totalCustomers = await Customer.count({ where: { tenantId } });
    // Total orders
    const totalOrders = await Order.count({ where: { tenantId, ...dateFilter } });
    // Total revenue
    const totalRevenue = await Order.sum('amount', { where: { tenantId, ...dateFilter } });
    // Orders by date
    const ordersByDate = await Order.findAll({
      where: { tenantId, ...dateFilter },
      attributes: [
        [fn('DATE', col('orderDate')), 'date'],
        [fn('COUNT', col('id')), 'orderCount'],
        [fn('SUM', col('amount')), 'revenue']
      ],
      group: [literal('DATE(orderDate)')],
      order: [[literal('date'), 'ASC']]
    });
    // Top 5 customers by spend
    const topCustomers = await Order.findAll({
      where: { tenantId },
      attributes: [
        'customerId',
        [fn('SUM', col('amount')), 'totalSpent']
      ],
      group: ['customerId'],
      order: [[literal('totalSpent'), 'DESC']],
      limit: 5,
      include: [{ model: Customer, attributes: ['name', 'email'] }]
    });
    res.json({
      totalCustomers,
      totalOrders,
      totalRevenue,
      ordersByDate,
      topCustomers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
