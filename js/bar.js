function createSvg(svgWr, data, lineW = 850, lineH = 450) {
    //清除先前的svg
    clearSvg(svgWr);
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    let iheight = lineH / 0.85;
    let iwidth = lineW / 0.85;
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    // 定义好柱子颜色，轴的颜色
    let rectW = lineW * .03;
    let spaceW = lineW * .08; 
    // 开始位置
    let start = 15;
    let colorArr = ['60acfc', '32d3eb', '5bc49f', 'feb64d', 'ff7c7c',
     '9287e7','60acfc', '32d3eb', '5bc49f', 'feb64d', 'ff7c7c', '9287e7'];
    // 拿到柱状图中的最大值Max
    let max = Math.max(...data);
    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    let scale = lineH / max;
    //创建svg画布
    let svgHTML = '<svg width="' + iwidth + '" \
        height="' + iheight + '\
        " version="1.1" \
        xmlns="http://www.w3.org/2000/svg"></svg>'
    svgWr.insertAdjacentHTML('afterbegin', svgHTML);
    // 绘制横轴及纵轴
    let xlineHTML = '<line x1="0" y1="'+ lineH +'" \
        x2="' + lineW + '" y2="' + lineH + '"\
        stroke-width="2" fill="transparent" stroke="#000"/>';

    let ylineHTML = '<line x1="0" y1="0" \
        x2="0" y2="' + lineH + '"\
        stroke-width="5" fill="transparent" stroke="#000"/>';

    let svg = document.querySelector('svg');
    svg.insertAdjacentHTML('afterbegin', xlineHTML);
    svg.insertAdjacentHTML('afterbegin', ylineHTML);
    // 遍历数据 {
    //     计算将要绘制柱子的高度和位置
    //     绘制每一个柱子
    // }
    let monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    let fontSize = 14;
    let rectHTML = '';
    for (let i = 0; i < data.length; i ++) {
        let step = (spaceW * i + start)
        let rectH = scale * data[i];
        rectHTML += '<rect x= "' + step + '\
        " y= "' + (lineH - rectH) + '" \
        width= "' + rectW + '" height= "' + rectH + '" \
        fill= "#' + colorArr[i] + '" />' + 
        '<text font-size="' + fontSize + '" x="'+ (step - fontSize / 2) +
        '" y="' + (lineH + fontSize) + '">' + monthArr[i] + '</text>';
    }
    svg.insertAdjacentHTML('beforeend', rectHTML);
}

function clearSvg (svgWr) {
    let svg = svgWr.querySelector('svg');
    if (svg) {
        svg.remove();
    }
}