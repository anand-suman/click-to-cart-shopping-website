const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    try{
        const response = await fetch(SummaryApi.categoryWiseProduct.url,{
            method : SummaryApi.categoryWiseProduct.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                category : category
            })
        })

        if(!response.ok){
            return { data : [] }
        }

        const dataResponse = await response.json()
        return {
            data : Array.isArray(dataResponse?.data) ? dataResponse.data : []
        }
    }catch(err){
        return { data : [] }
    }
}

export default fetchCategoryWiseProduct