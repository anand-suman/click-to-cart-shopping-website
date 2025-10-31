const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const userModel = require('../models/userModel');

async function ensureAdmin() {
  try {
    await connectDB();

    const email = 'admin1@yopmail.com';
    const plainPassword = 'Admin@123';
    const name = 'Admin';

    let user = await userModel.findOne({ email });

    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(plainPassword, salt);

      user = new userModel({
        name,
        email,
        password,
        role: 'ADMIN',
      });
      await user.save();
      console.log('Admin user created:', email);
    } else {
      const updates = {};
      if (user.role !== 'ADMIN') updates.role = 'ADMIN';

      // Ensure password matches desired one (optional hard reset)
      const isSamePassword = bcrypt.compareSync(plainPassword, user.password);
      if (!isSamePassword) {
        const salt = bcrypt.genSaltSync(10);
        updates.password = bcrypt.hashSync(plainPassword, salt);
      }

      if (Object.keys(updates).length) {
        await userModel.updateOne({ _id: user._id }, { $set: updates });
        console.log('Existing user updated to ADMIN:', email);
      } else {
        console.log('Admin already up-to-date:', email);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error('Failed to ensure admin user:', err.message || err);
    process.exit(1);
  }
}

ensureAdmin();
