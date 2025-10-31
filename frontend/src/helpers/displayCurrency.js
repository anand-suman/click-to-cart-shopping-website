const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : 'INR',
        minimumFractionDigits : 2
    })

    const value = Number(num)
    if(!Number.isFinite(value)){
        return formatter.format(0)
    }
    return formatter.format(value)
}

export default displayINRCurrency