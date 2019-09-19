module.exports.findIndex = (array, element) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].product.ID === element.ID) {
            return i;
        }
    }
    return -1;
}
module.exports.countQuantity = (array)=>{
    let count = 0;
    for(let i =0; i<array.length; i++){
        count+=array[i].Quantity;
    }
    
    return count;
}

const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })

module.exports.showVNDCurrency = (price) => {
      return formatter.format(price);
}