//获取所有的checkbox
function getCheck () {
    let reCh = regionWr.querySelectorAll('input');
    let poCh = productWr.querySelectorAll('input')
    let checkbox = [].concat(...reCh).concat(...poCh);
    return checkbox;
}
//修改查询
function setQuery () {
    let checkbox = getCheck();
    //获取所有选中的checkbox
    let state = [];
    for (let i = 0; i < checkbox.length; i ++) {
        if (checkbox[i].checked) {
            state.push(checkbox[i].value);
        }
    }
    history.pushState(null, null, '?=' + state.join('&'));
}

function historyCh () {
    //获得查询字符串
    let query = decodeURIComponent(location.href).split('?=')[1];
    let checkbox = getCheck();
    if (typeof query !== 'undefined') {
        for (let i = 0; i < checkbox.length; i ++) {
            let val = checkbox[i].value;
            if (query.indexOf(val) !== -1) {
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
    } else {
        //默认全部勾选
        let def = checkbox.map((el, int) => {
            return el.value;
        })
        history.replaceState(null, null, '?=' + def.join('&'));
        historyCh(def);
    }
}

window.addEventListener('popstate', function () {
    historyCh();
})