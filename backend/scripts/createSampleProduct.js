const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('../config/db');
const productModel = require('../models/productModel');

async function run() {
  try {
    await connectDB();

    const sample = {
      productName: 'boAt Airdopes 171',
      brandName: 'boAt',
      category: 'earbuds',
      productImage: [
        // Public image URL so no local upload is required
        'https://images.unsplash.com/photo-1611079843773-8f3cf2e2f0a0?q=80&w=1200&auto=format&fit=crop',
      ],
      description:
        'True wireless earbuds with IWP technology and Bluetooth v5.1.',
      price: 2499,
      sellingPrice: 1499,
    };

    const created = await productModel.create(sample);
    console.log('Sample product created with id:', created._id.toString());
    process.exit(0);
  } catch (err) {
    console.error('Failed to create sample product:', err);
    process.exit(1);
  }
}

run();
