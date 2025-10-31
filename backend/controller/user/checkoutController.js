const addToCartModel = require("../../models/cartProduct")
const productModel = require("../../models/productModel")

const checkoutController = async(req,res)=>{
    try{
        const { cartItems } = req?.body
        const currentUser = req.userId

        if(!cartItems || !Array.isArray(cartItems) || cartItems.length === 0){
            return res.status(400).json({
                message : "Cart items are required",
                error : true,
                success : false
            })
        }

        // Calculate total from cart items
        let total = 0
        const itemsWithDetails = []

        for(const item of cartItems){
            // Handle both string ID and object ID
            const productId = item.productId || item._id
            const product = await productModel.findById(productId)
            if(product){
                const qty = item.qty || item.quantity || 1
                const itemTotal = product.sellingPrice * qty
                total += itemTotal
                itemsWithDetails.push({
                    productId: productId,
                    productName: product.productName,
                    price: product.sellingPrice,
                    qty: qty,
                    subtotal: itemTotal
                })
            }
        }

        // Create mock receipt
        const receipt = {
            total: total,
            timestamp: new Date().toISOString(),
            items: itemsWithDetails,
            orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            userId: currentUser
        }

        res.json({
            message : "Checkout successful",
            success : true,
            error : false,
            data : receipt
        })

    }catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = checkoutController

