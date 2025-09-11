import { Product } from '../models/index.js';

// Get all products for tenant
export const getAllProducts = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const products = await Product.findAll({ where: { tenantId } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const { name, price } = req.body;
    const product = await Product.create({ name, price, tenantId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
