const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try{
        const sessionUserId = req.userId

        const hasPermission = await uploadProductPermission(sessionUserId)
        if(!hasPermission){
            throw new Error("Permission denied")
        }
    
        // Build product payload from multipart/form-data
        const files = req.files || []
        const imagePaths = files.map((f)=> `/uploads/products/${f.filename}`)
        console.log('[upload] fields:', req.body)
        console.log('[upload] files:', files.map(f=> ({ fieldname: f.fieldname, filename: f.filename, size: f.size })))

        // Coerce and validate numeric fields to avoid NaN persistence
        const price = parseFloat(req.body.price)
        const sellingPrice = parseFloat(req.body.sellingPrice)

        if (!Number.isFinite(price) || !Number.isFinite(sellingPrice)) {
            throw new Error("Invalid price or selling price")
        }

        const productName = (req.body.productName || "").trim()
        const brandName = (req.body.brandName || "").trim()
        const category = (req.body.category || "").trim()
        const description = (req.body.description || "").trim()

        if (!productName || !brandName || !category || !description) {
            throw new Error("Missing required fields")
        }

        if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
            throw new Error("Please upload at least one product image")
        }

        const payload = {
            productName,
            brandName,
            category,
            productImage: imagePaths,
            description,
            price,
            sellingPrice
        }
        console.log('[upload] payload to save:', payload)

        const uploadProduct = new productModel(payload)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController