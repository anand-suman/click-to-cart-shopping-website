const addToCartModel = require("../../models/cartProduct")

const deleteCartItemController = async(req,res)=>{
    try{
        const currentUserId = req.userId 
        const cartItemId = req.params.id

        if(!cartItemId){
            return res.status(400).json({
                message : "Cart item ID is required",
                error : true,
                success : false
            })
        }

        // Verify that the cart item belongs to the current user
        const cartItem = await addToCartModel.findOne({ 
            _id: cartItemId,
            userId: currentUserId 
        })

        if(!cartItem){
            return res.status(404).json({
                message : "Cart item not found",
                error : true,
                success : false
            })
        }

        const deleteProduct = await addToCartModel.deleteOne({ 
            _id : cartItemId,
            userId: currentUserId 
        })

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.status(400).json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteCartItemController

