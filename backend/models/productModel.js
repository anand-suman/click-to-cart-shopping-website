const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName : { type: String, required: true, trim: true },
    brandName : { type: String, required: true, trim: true },
    category : { type: String, required: true, trim: true },
    productImage : { type: [String], default: [] },
    description : { type: String, required: true, trim: true },
    price : { type: Number, required: true, min: 0 },
    sellingPrice : { type: Number, required: true, min: 0 }
},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

module.exports = productModel