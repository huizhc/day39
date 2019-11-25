//解析hash值
function reHash (hash) {
    return decodeURIComponent(hash.slice(1));
}
//添加hash
function inHash(val) {
    let hash = reHash(window.location.hash);
    if (window.location.hash === '') {
        window.location.hash = val;
        //不添加重复的项
    } else if (hash.indexOf(val) === -1) {
        window.location.hash  = hash + '&' + val;
    }
}
//移除hash值
function exHash (val) {
    let hash = reHash(window.location.hash);
    window.location.hash = hash.replace(new RegExp('&\?' + val), '').replace(/^&/,'');
}

window.addEventListener('hashchange', function () {
    hashTrans();
})

//hash值改变时的动作
function hashTrans () {
    //如果hash值为空则退出
    if (window.location.hash === '') return;
    let hash = reHash(window.location.hash);
    let reCh = regionWr.querySelectorAll('input');
    let poCh = productWr.querySelectorAll('input')
    let checkbox = [].concat(...reCh).concat(...poCh);
    for (let i = 0; i < checkbox.length; i ++) {
        let val = checkbox[i].value;
        if (hash.indexOf(val) !== -1) {
            //未选中则选中
            if (!checkbox[i].checked) {
                checkbox[i].click();
            }
        } else {
            //选中则取消
            if (checkbox[i].checked) {
                checkbox[i].click();
            }
        }
    }
}