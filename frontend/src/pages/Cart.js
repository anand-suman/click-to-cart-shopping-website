import React, { useContext, useEffect, useState } from 'react'
import SummaryApi, { backendDomin } from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Cart = () => {
    const [data,setData] = useState([])
    const [total,setTotal] = useState(0)
    const [loading,setLoading] = useState(false)
    const [checkoutLoading,setCheckoutLoading] = useState(false)
    const [receipt,setReceipt] = useState(null)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)


    const fetchData = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.cart.url,{
            method : SummaryApi.cart.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
       
        const responseData = await response.json()

        console.log("Cart response:", responseData) // Debug log

        if(responseData.success){
            setData(responseData.data || [])
            setTotal(responseData.total || 0)
        } else {
            console.error("Cart fetch error:", responseData.message)
        }
        setLoading(false)
    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])


    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }


    const decraseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(`${SummaryApi.deleteCartItem.url}/${id}`,{
            method : SummaryApi.deleteCartItem.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
            toast.success(responseData.message)
        } else {
            toast.error(responseData.message)
        }
    }

    const handleCheckout = async() => {
        if(data.length === 0){
            toast.error("Cart is empty")
            return
        }

        setCheckoutLoading(true)
        try{
            // Prepare cart items for checkout
            const cartItems = data.map(item => ({
                productId: item.product?._id || item.productId,
                qty: item.quantity
            }))

            const response = await fetch(SummaryApi.checkout.url,{
                method : SummaryApi.checkout.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify({
                    cartItems: cartItems
                })
            })

            const responseData = await response.json()

            if(responseData.success){
                setReceipt(responseData.data)
                toast.success(responseData.message)
                // Clear cart after successful checkout
                setTimeout(() => {
                    fetchData()
                }, 2000)
            } else {
                toast.error(responseData.message)
            }
        } catch(err) {
            toast.error("Checkout failed. Please try again.")
        } finally {
            setCheckoutLoading(false)
        }
    }

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + (currentValue.quantity || 0),0)
  return (
    <div className='container mx-auto'>
        
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((item,index)=>{
                           // Handle populated productId (original format) or product (new format)
                           const product = item.productId && typeof item.productId === 'object' ? item.productId : (item.product || item.productId)
                           
                           // Process image URL - add backend domain if it starts with /uploads
                           const getImageUrl = (image) => {
                               if(!image) return ''
                               if(typeof image === 'string'){
                                   return image.startsWith('/uploads') ? (backendDomin + image) : image
                               }
                               return image
                           }
                           
                           const productImage = Array.isArray(product?.productImage) 
                               ? product.productImage[0] 
                               : (product?.productImage || '')
                           const imageUrl = getImageUrl(productImage)
                           
                           return(
                            <div key={item?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={imageUrl} className='w-full h-full object-scale-down mix-blend-multiply' alt={product?.productName || 'Product'} />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(item?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.sellingPrice || 0)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency((product?.sellingPrice || 0) * (item?.quantity || 0))}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(item?._id,item?.quantity)}>-</button>
                                        <span>{item?.quantity || 0}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(item?._id,item?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(total)}</p>    
                                    </div>

                                    <button 
                                        className='bg-blue-600 p-2 text-white w-full mt-2 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed' 
                                        onClick={handleCheckout}
                                        disabled={checkoutLoading || data.length === 0}
                                    >
                                        {checkoutLoading ? 'Processing...' : 'Checkout'}
                                    </button>

                                </div>
                            )
                        }
                </div>
        </div>

        {/**Checkout Receipt Modal */}
        {
            receipt && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg max-w-md w-full mx-4'>
                        <h2 className='text-2xl font-bold mb-4'>Order Receipt</h2>
                        <div className='border-b pb-3 mb-3'>
                            <p className='text-sm text-gray-600'>Order ID: {receipt.orderId}</p>
                            <p className='text-sm text-gray-600'>Date: {new Date(receipt.timestamp).toLocaleString()}</p>
                        </div>
                        <div className='space-y-2 mb-4 max-h-60 overflow-y-auto'>
                            {receipt.items?.map((item, idx) => (
                                <div key={idx} className='flex justify-between text-sm'>
                                    <div>
                                        <p className='font-medium'>{item.productName}</p>
                                        <p className='text-gray-600'>Qty: {item.qty} × {displayINRCurrency(item.price)}</p>
                                    </div>
                                    <p className='font-medium'>{displayINRCurrency(item.subtotal)}</p>
                                </div>
                            ))}
                        </div>
                        <div className='border-t pt-3 flex justify-between font-bold text-lg'>
                            <p>Total:</p>
                            <p>{displayINRCurrency(receipt.total)}</p>
                        </div>
                        <button 
                            className='bg-blue-600 text-white w-full p-2 mt-4 rounded hover:bg-blue-700'
                            onClick={() => setReceipt(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Cart