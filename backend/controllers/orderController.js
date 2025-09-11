import { Order, Customer } from '../models/index.js';

// Get all orders for tenant with optional date range filter
export const getAllOrders = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { startDate, endDate } = req.query;
    
    const filter = { tenantId };
    if (startDate && endDate) {
      filter.orderDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const orders = await Order.findAll({
      where: filter,
      include: [{ model: Customer, attributes: ['name', 'email'] }],
      order: [['orderDate', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { orderDate, amount, customerId } = req.body;
    const order = await Order.create({ orderDate, amount, customerId, tenantId });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
