const addToCartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")

const getCartController = async(req,res)=>{
    try{
        console.log("GET /api/cart route hit!")
        const currentUser = req.userId

        if(!currentUser){
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }

        // Use populate like the original implementation to maintain compatibility
        const cartItems = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        // If populate doesn't work (productId is String, not ObjectId), manually fetch products
        const cartWithProducts = await Promise.all(
            cartItems.map(async(item) => {
                // Check if productId is populated (object) or not (string)
                if(item.productId && typeof item.productId === 'object' && item.productId._id){
                    // Already populated, return as is
                    return item
                } else {
                    // Not populated, manually fetch the product
                    let product = null
                    try {
                        // Try as ObjectId first
                        product = await productModel.findById(item.productId)
                        // If that doesn't work, try as string
                        if(!product && item.productId){
                            product = await productModel.findOne({ _id: item.productId })
                        }
                    } catch(err) {
                        console.error("Error fetching product for cart item:", err)
                    }
                    
                    // Replace the string productId with the populated object
                    if(product){
                        item.productId = product
                    }
                    return item
                }
            })
        )

        // Calculate total
        let total = 0
        cartWithProducts.forEach(item => {
            // If productId is populated, it will be an object with sellingPrice
            if(item.productId && typeof item.productId === 'object' && item.productId.sellingPrice){
                total += item.productId.sellingPrice * (item.quantity || 0)
            }
        })

        res.json({
            data : cartWithProducts,
            total: total,
            success : true,
            error : false
        })

    }catch(err){
        console.error("Error in getCartController:", err)
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCartController

