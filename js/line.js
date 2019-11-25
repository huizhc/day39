function createLine(canvasWr, data, axisH = 850, axisL = 450) {
    clearLine(canvasWr);
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    let iheight = axisL / 0.95;
    let iwidth = axisH / 0.95;
    // 定义好每一个数据点的半径，颜色，线的颜色，宽度
    // 定义好没两个数据点之间的横向间隔距离
    let cir = 3;
    let cicolor = '#fff';
    let licolor = '#60acfc';
    let stroke = 2;
    let space = axisH * .06;
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
    ctx.fillStyle = cicolor;
    ctx.strokeStyle = licolor;
    ctx.lineJoin = 'round';
    //用于存储上一个连接点的x,y
    let preX = '';
    let preY = '';
    // 连接圆的数组
    let circleArr = [];
    for (let i = 0; i < data.length; i ++) {
        // 每个点在纵轴上的高度
        let ciL = axisL - (data[i] * scale);
        let icircle = new Path2D();
        icircle.arc(space * i, ciL, cir, 0, Math.PI * 2, true);
        circleArr.push(icircle);
        if (i !== 0) {
            ctx.beginPath();
            ctx.moveTo(preX, preY);
            ctx.lineTo(space * i, ciL);
            ctx.stroke();
        }
        preX = space * i;
        preY = ciL;
    }
    //最后画圆，这样就不会被线盖住
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