//清除表格
function clearTable () {
    let table = tableWr.getElementsByTagName('table')[0];
    if (typeof table == 'undefined') return;
    table.remove();
}
//渲染表格
function createTable (data) {
    clearTable();
    let table = document.createElement('table');
    //输出表头
    let tharr = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]; 
    let htr = document.createElement('tr');
    for (let i = 0; i < tharr.length; i ++) {
        let ith = document.createElement('th');
        let txt = document.createTextNode(tharr[i]);
        ith.appendChild(txt);
        htr.appendChild(ith);
    }
    table.appendChild(htr);
    tableWr.appendChild(table);
    //输出内容单元格
    if (typeof data === 'undefined' || data.length === 0) return;
    for (let i = 0; i < data.length; i ++) {
        let tr = document.createElement('tr');
        let itr = data[i];
        for (let j = 0; j < itr.length; j ++) {
            let td = document.createElement('td');
            //为单元格添加自定义参数na
            if (j === 0) {
                td.na = 'product';
            } else if (j === 1) {
                td.na = 'region';
            } else {
                td.na = j - 2;
                //使用缓存的数据
                let temp = localStorage.getItem(itr[0] + itr[1] + (j - 2));
                if (temp) {
                    itr[j] = temp;
                }
            }
            let te = document.createTextNode(itr[j]);
            td.appendChild(te);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    // 为tr添加联动图形事件
    table.addEventListener('mouseover', function (e) {
        if (e.target.tagName === 'TD') {
            let tr = e.target.parentNode;
            tableReact(tr);
        }
    })
    // 监听td点击事件
    table.addEventListener('click', function (e) {
        if (e.target.tagName === 'TD') {
            if (e.target.na !== 'product' && e.target.na !== 'region') {
                let td = e.target;
                createInput(td);
            }
        }
    })
}

//表格增强
function tableX () {
    let relen = regionWr.checkedlen;
    let prlen = productWr.checkedlen;
    let table = tableWr.querySelector('table');
    let tr = table.querySelectorAll('tr');
    //当地区选择一项，商品选择多项时,交换第一二列位置
    if (relen === 1 && prlen !== 1) {  
        for (let i = 0; i < tr.length; i ++) {
            let txt = tr[i].children[0].textContent;
            tr[i].children[0].textContent = tr[i].children[1].textContent
            tr[i].children[1].textContent = txt;
        }
        // 合并单元格
        aliketd(tr);    
    }
    //商品当选择一项，地区选择多项时
    if (prlen === 1 && relen !== 1) {
        aliketd(tr);
    }
    if (prlen !== 1 && relen !== 1) {
        aliketd(tr);
    }
}
// 合并第一列相同内容的单元格
function aliketd (tr) {
    let pre = null;
    for (let i = 0; i < tr.length; i ++) {
        let now = tr[i].children[0];
        if (pre !== null && pre.textContent === now.textContent) {
            rowSpan(pre, now);
        } else {
            pre = now;
        }
    }
}
//单元格合并（接收两个要合并的单元格作为参数）
function rowSpan (fronttd, backtd) {
    let f_rowspan = fronttd.getAttribute('rowspan');
    if (f_rowspan) {
        f_rowspan = Number(f_rowspan) + 1;
        fronttd.setAttribute('rowspan', f_rowspan); 
    } else {
        fronttd.setAttribute('rowspan', 2);
    }
    backtd.style.display = 'none';
}
//表格联动图形
function tableReact (tr) {
    let data = [];
    //只取月份数据
    for (let i = 2; i < tr.children.length; i ++) {
        data.push(Number(tr.children[i].childNodes[0].nodeValue));
    }
    //创建柱状图和折线图
    createSvg(svgWr, data, 500, 300);
    createLine(canvasWr, data, 500, 300);
}

//单元格编辑
function createInput (td) {
    clearEdit();
    let month = td.na;
    let tdf = td.parentNode.children[0];
    let tds = td.parentNode.children[1];
    let product = '';
    let region = '';
    //判断是表示商品信息的单元格还是表示地区信息单元格
    if (tdf.na === 'product') {
        product = tdf.textContent;
        region = tds.textContent;
    } else {
        region = tdf.textContent;
        product = tds.textContent;
    }
    // 创建input元素
    let val = td.textContent;
    // 创建容器元素
    let edit = document.createElement('div');
    edit.setAttribute('id', 'edit');
    let input = document.createElement('input');
    input.setAttribute('value', val);
    let suButton = document.createElement('button');
    suButton.setAttribute('id', 'suButton')
    suButton.style.float = 'left';
    let clButton = document.createElement('button');
    clButton.setAttribute('id', 'clButton')
    clButton.style.float = 'left';
    let sutxt = document.createTextNode('确定');
    let cltxt = document.createTextNode('取消');
    suButton.appendChild(sutxt);
    clButton.appendChild(cltxt);
    edit.appendChild(input);
    edit.appendChild(suButton);
    edit.appendChild(clButton);
    td.appendChild(edit);
    // 把原来的文本内容隐藏
    td.oldSize = td.style.fontSize;
    td.style.fontSize = 0;
    td.classList.add('notAfter');
    //添加按钮事件
    suButton.addEventListener('click', function (e) {
        //判断是否是数字
        let val = input.value;
        if (/^\d*$/.test(val)) {
            //缓存输入的数据
            localStorage.setItem(product + region + month, input.value);
            td.childNodes[0].nodeValue = val;
            reSet(td);
        } else {
            //创建错误提示
            let tiptx = '<div id= "tip" style="background: #fff; position: fixed;">请输入正整数喔</div>';
            document.body.insertAdjacentHTML('beforeend', tiptx);
            let tip = document.querySelector('#tip');
            tip.style.left = e.clientX + 10 + 'px';
            tip.style.top = e.clientY + 10 + 'px';
            tip.timer = setTimeout(() => {
                if (tip.timer) {
                    clearTimeout(tip.timer);
                }
                tip.style.display = 'none';
            }, 2000);
        }
    })
    clButton.addEventListener('click', function () {
        reSet(td);
    });
    //监听esc键和回车键
    input.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            clButton.click();
        }
        if (e.which === 13) {
            suButton.click();
        }
    })
}

//恢复编缉前的状态
function reSet (td) {
    td.style.fontSize = td.oldSize;
    td.classList.remove('notAfter');
    let edit = document.querySelector('#edit');
    edit.remove();
}

// 清除编缉状态的单元格
function clearEdit () {
    let clButton = document.querySelector('#clButton');
    if (clButton) {
        clButton.click();
    }
}