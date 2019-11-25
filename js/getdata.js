//提取checkbox中的value
function checkVal (checkbox) {
    let value = [];
    //此处忽略了全选按钮
    for (let i = 1; i < checkbox.length; i ++) {
        if (checkbox[i].checked) {
            value.push(checkbox[i].value);
        }
    }
    return value;
}
//获取数据
function getData () {
    let regionCh = regionWr.querySelectorAll('input');
    let productCh = productWr.querySelectorAll('input');
    let regionVal = checkVal(regionCh);
    let productVal = checkVal(productCh);
    let data = sourceData.filter((el, ind) => {
        return regionVal.some((val, i) => {return val === el.region;})
        && productVal.some((val, i) => {return val === el.product;})
    })
    data = data.map(function (el, index) {
        return [el['product'], el['region'], ...el['sale']];
    })
    return data;
}
