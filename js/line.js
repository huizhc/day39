function createLine(canvasWr, data, axisH = 800, axisL = 450) {
    clearLine(canvasWr);
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    let iheight = axisL / .7;
    let iwidth = axisH / .7;
    // 定义好每一个数据点的半径，颜色，线的颜色，宽度
    // 定义好没两个数据点之间的横向间隔距离
    let cir = 3;
    let cicolor = '#fff';
    let licolor = '#60acfc';
    let stroke = 2;
    let space = axisH * .08;
    // 拿到折线图中的最大值Max
    let max = Math.max(...data);
    // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    let scale = axisL * .7 / max;
    // 绘制横轴及纵轴
    let canvas = document.createElement('canvas');
    canvas.setAttribute('width', iwidth);
    canvas.setAttribute('height', iheight);
    canvasWr.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = stroke;
    ctx.moveTo(1, 0);
    ctx.lineTo(1, axisL);
    ctx.lineTo(axisH, axisL);
    ctx.stroke();

    // 设置线和点颜色
    ctx.strokeStyle = licolor;
    ctx.lineJoin = 'round';
    //设置文本
    ctx.font = "14px serif";
    //用于存储上一个连接点的x,y
    let preX = '';
    let preY = '';
    //月份
    let monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    // 连接圆的数组
    let circleArr = [];
    
    for (let i = 0; i < data.length; i ++) {
        // 每个点在纵轴上的高度
        let ciL = axisL - (data[i] * scale);
        let step = (space * i) + 15;
        let icircle = new Path2D();
        icircle.arc(step, ciL, cir, 0, Math.PI * 2, true);
        circleArr.push(icircle);
        if (i !== 0) {
            ctx.beginPath();
            ctx.moveTo(preX, preY);
            ctx.lineTo(step, ciL);
            ctx.stroke();
        }
        preX = step;
        preY = ciL;
        ctx.fillText(monthArr[i], step - 14, axisL + 14);
    }
    //最后画圆，这样就不会被线盖住
    ctx.fillStyle = cicolor;
    circleArr.forEach(function (el, int) {
        ctx.fill(el);
        ctx.stroke(el);
    })
}

function clearLine (canvasWr) {
    let canvas = canvasWr.querySelector('canvas');
    if (canvas) {
        canvas.remove();
    }
}