import { Customer } from '../models/index.js';

// Get all customers for tenant
export const getAllCustomers = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const customers = await Customer.findAll({ where: { tenantId } });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new customer
export const createCustomer = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { name, email } = req.body;
    const customer = await Customer.create({ name, email, tenantId });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
