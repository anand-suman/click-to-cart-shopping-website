const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
    try{
        const { productId, qty } = req?.body
        const currentUser = req.userId

        if(!productId){
            return res.status(400).json({
                message : "Product ID is required",
                success : false,
                error : true
            })
        }

        // Check if product already exists in cart for this user
        const isProductAvailable = await addToCartModel.findOne({ 
            productId, 
            userId: currentUser 
        })

        console.log("isProductAvailabl   ",isProductAvailable)

        if(isProductAvailable){
            // Update quantity if product already exists
            isProductAvailable.quantity = (isProductAvailable.quantity || 1) + (qty || 1)
            const saveProduct = await isProductAvailable.save()
            
            return res.json({
                data : saveProduct,
                message : "Cart updated",
                success : true,
                error : false
            })
        }

        const payload  = {
            productId : productId,
            quantity : qty || 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()


        return res.json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })
        

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = addToCartController