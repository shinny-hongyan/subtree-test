let d3 = require('d3');
let TqChart = require('../lib/tqchart');

let chart1 = new TqChart({
    domid: 'domid',
    mainType: 'candle', // 'close'
    dataRange: [-1, -1], // [-1,-1]不设置两侧尽头，[100，300]设置两侧尽头
    boardNumbersMax: 5 // 最多几个画板
});

chart1.setDataOptions({
    kseries: tqsdk.getKLine('SHFE.au2006')
});

// 1 绘制k线图
chart1.draw();
tqsdk.on('rtn_data', chart1.draw);

// 切换为 日内
chart1.setMainType('close');
chart1.setDataRange(leftid, rightid);
chart1.draw();
tqsdk.on('rtn_data', chart1.draw);

// 2 计算指标
let indma = chart1.addIndicator('ma', { id: 'ma3', color: 'red', width: '3', n: '5' });
chart1.show('ma3');
chart1.hide('ma3');
chart1.removeIndicator('ma3'); // indma

// 3 外部序列
let ind = chart1.addSeries('sar', {
    target: 'SHFE.cu1910-60',
    type: 'line',
    board: 'main|sub',
    datasets: []
});
chart1.showSeries('sar');
chart1.hideSeries('sar');
chart1.removeSeries('sar');

// 4 绘制矩形
chart1.addShape('xxxxid', {
    target: 'SHFE.cu1910-60',
    type: 'line' / 'vline' / 'hline' / 'rect' / '',
    color,
    width,
    x, // id | dt1 | px
    y, // value | px
    erasable: true,
    tooltip: 'kaicang'
});
chart1.removeShape('xxxxid');

// 5 高亮and移动到某处
chart1.fous();

// 6 画图
chart1.pause();
chart1.convertPointToValue(); // 将px值转为 x-id，y-value
chart1.addShape('xxxxid', {
    target: 'SHFE.cu1910-60',
    type: 'line' / 'vline' / 'hline' / 'rect' / '',
    color,
    width,
    x, // px
    y, // px
    erasable: true
});

// 缩放
chart1.resize();
chart1.move();
