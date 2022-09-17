const REFRESH_RATE = 20 // in Hz; should be divider of 1000

const GAUGE_OFFSET_X = 15
const GAUGE_OFFSET_Y = 10
const GAUGE_SPACING_X = 15
const GAUGE_SPACING_Y = 20

const GAUGE_SIZE=160
const RING_WIDTH=20

const POLL_URL = $("body").attr("data-pollUrl");
const GAUGES = {
    "ramLoad": {
        "position":{"line":0, "col":0},
        "meta":{
            "labelTop": 'RAM',
            "labelBottom": 'LOAD %',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FFDC00'},
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 75
        }]
    },
    "cpuLoad": {
        "position":{"line":0, "col":1},
        "meta":{
            "labelTop": 'CPU',
            "labelBottom": 'LOAD %',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#ED1C24'},
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        }]
    },
    "cpuTemp": {
        "position":{"line":0, "col":2},
        "meta":{
            "labelTop": 'CPU',
            "labelBottom": 'TEMP °C',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#ED1C24'},
            "minValue": 45,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        }]
    },
    "fps": {
        "position":{"line":0, "col":3},
        "meta":{
            "labelTop": '',
            "labelBottom": 'FPS',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#EEEEEE'},
            "minValue": 0,
            "maxValue": 300,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 9999
        }]
    },
    "gpuLoadCore": {
        "position":{"line":1, "col":0},
        "meta":{
            "labelTop": 'GPU',
            "labelBottom": 'CORE %',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#76B900'},
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        }]
    },
    "gpuLoadMemory": {
        "position":{"line":1, "col":1},
        "meta":{
            "labelTop": 'GPU',
            "labelBottom": 'MEM %',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#76B900'},
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        }]
    },
    "gpuTemp": {
        "position":{"line":1, "col":2},
        "meta":{
            "labelTop": 'GPU',
            "labelBottom": 'TEMP °C',
            "maxValueRecordEnabled": true,
            "startRad":degreesToRads(30),
            "endRad":degreesToRads(330),
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#76B900'},
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        }]
    },
    "time": {
        "position":{"line":1, "col":3},
        "meta":{
            "labelTop": '',
            "labelBottom": '',
            "maxValueRecordEnabled": false,
            "startRad":degreesToRads(180),
            "endRad":degreesToRads(540),
        },
        "data":[
            {
                "value":-1,
                "target":-1,
                "delta":-1,
                "maxRecordedValue":-1,
                "getColor": getHoursColor,
                "minValue": 0,
                "maxValue": 24,
                "minAlertThreshold": 0,
                "maxAlertThreshold": 24
            },
            {
                "value":-1,
                "target":-1,
                "delta":-1,
                "maxRecordedValue":-1,
                "getColor": getMinutesColor,
                "minValue": 0,
                "maxValue": 60,
                "minAlertThreshold": 0,
                "maxAlertThreshold": 60
            },
            {
                "value":-1,
                "target":-1,
                "delta":-1,
                "maxRecordedValue":-1,
                "getColor": getSecondsColor,
                "minValue": 0,
                "maxValue": 60,
                "minAlertThreshold": 0,
                "maxAlertThreshold": 60
            }
        ]
    }

}

function getHoursColor() {
    let hours = GAUGES['time']['data'][0]['value']
    if (hours>=6 && hours<=18) {
        return '#FEBD89'
    } else {
        return '#9C3448'
    }
}

function getMinutesColor() {
    let hours = GAUGES['time']['data'][0]['value']
    if (hours>=6 && hours<=18) {
        return '#FE9138'
    } else {
        return '#5F2151'
    }
}

function getSecondsColor() {
    let hours = GAUGES['time']['data'][0]['value']
    if (hours>=6 && hours<=18) {
        return '#FF7400'
    } else {
        return '#361456'
    }
}

function setDataValue(gaugeData, value){
    gaugeData['target'] = value
    gaugeData['delta'] = (gaugeData['target']-gaugeData['value'])/REFRESH_RATE
}

function pollForData(){
    jQuery.ajax({
        url: POLL_URL,
        success: function(data){

            setDataValue(GAUGES['ramLoad']['data'][0], data['ramLoad'])
            setDataValue(GAUGES['cpuLoad']['data'][0], data['cpuLoad'])
            setDataValue(GAUGES['cpuTemp']['data'][0], data['cpuTemp'])
            setDataValue(GAUGES['fps']['data'][0], data['fps'])
            setDataValue(GAUGES['gpuLoadCore']['data'][0], data['gpuLoadCore'])
            setDataValue(GAUGES['gpuLoadMemory']['data'][0], data['gpuLoadMemory'])
            setDataValue(GAUGES['gpuTemp']['data'][0], data['gpuTemp'])

            setDataValue(GAUGES['time']['data'][0], data['time'][0])
            setDataValue(GAUGES['time']['data'][1], data['time'][1])
            setDataValue(GAUGES['time']['data'][2], data['time'][2])

        },
        error: function(e1,e2,e3,e4){
            console.log(e1,e2,e3,e4);
        }
    });
    
}

function degreesToRads(degrees){
    return Math.PI*(degrees+90)/180
}

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let showMaxModeEnabled = false

function adjustGaugesData(label){

    for (seriesIndex in GAUGES[label]['data']) {
        let series = GAUGES[label]['data'][seriesIndex]

        let delta = series['delta']
        let target = series['target']

        series['value'] += delta
        let value = series['value']
        
        if ((delta > 0 && value>=target) || (delta < 0 && value<=target)) {
            series['delta'] = 0
            series['value'] = target
        } 

        series['maxRecordedValue'] = Math.max(series['maxRecordedValue'], series['value'])
    }
 
}

function drawGauge(label) {
    let gauge =  GAUGES[label]
    let gaugeData =  gauge['data']

    if (gaugeData.length == 1) {
        drawGauge_single(gauge, gaugeData[0])
    } else if (gaugeData.length == 2) {
        drawGauge_double(gauge, gaugeData[0], gaugeData[1])
    } else if (gaugeData.length == 3) {
        drawGauge_triple(gauge, gaugeData[0], gaugeData[1], gaugeData[2])
    }
    
}

function drawGauge_single(gauge, data) {
    let col = gauge['position']['col']
    let line = gauge['position']['line']
    let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
    let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH) + GAUGE_SIZE/2+RING_WIDTH/2

    ctx.lineWidth = RING_WIDTH
    ctx.lineCap = 'round'

    let value = data['value']
    
    let alertEnabled = false
    if (value<data['minAlertThreshold'] || value>data['maxAlertThreshold']) {
        alertEnabled = true
    } 

    if (alertEnabled) {
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + RING_WIDTH, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    } else {
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2, gauge['meta']['startRad'], gauge['meta']['endRad'])
        ctx.strokeStyle = '#111111'
        ctx.stroke();

        if (gauge['meta']['maxValueRecordEnabled']) {
            ctx.beginPath()
            ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2, gauge['meta']['startRad'], gauge['meta']['startRad'] + Math.max(data['maxRecordedValue'] - data['minValue'], 0) / (data['maxValue'] - data['minValue']) * (gauge['meta']['endRad'] - gauge['meta']['startRad']))
            ctx.strokeStyle = '#444444'
            ctx.stroke();
        }

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2, gauge['meta']['startRad'], gauge['meta']['startRad'] + Math.max(data['value'] - data['minValue'], 0) / (data['maxValue'] - data['minValue']) * (gauge['meta']['endRad'] - gauge['meta']['startRad']))
        ctx.strokeStyle = data['getColor']()
        ctx.stroke();
    }

    ctx.font = "14px Arial"
    ctx.fillStyle = alertEnabled?'#000000':((showMaxModeEnabled&&gauge['meta']['maxValueRecordEnabled'])?'#999999':'#ffffff')
    ctx.textAlign = "center"
    ctx.fillText(gauge['meta']['labelTop'], gaugeX, gaugeY-35)
    
    ctx.font = "46px Arial"
    ctx.fillStyle = alertEnabled?'#000000':((showMaxModeEnabled&&gauge['meta']['maxValueRecordEnabled'])?'#999999':'#ffffff')
    ctx.textAlign = "center"
    ctx.fillText(Math.round(showMaxModeEnabled?data['maxRecordedValue']:data['value']), gaugeX, gaugeY+16)


    ctx.font = "14px Arial"
    ctx.fillStyle = alertEnabled?'#000000':((showMaxModeEnabled&&gauge['meta']['maxValueRecordEnabled'])?'#999999':'#ffffff')
    ctx.textAlign = "center"
    ctx.fillText(gauge['meta']['labelBottom'], gaugeX, gaugeY+45)
}

function drawGauge_double(gauge, data1, data2) {

}

function drawGauge_triple(gauge, data1, data2, data3) {
    let col = gauge['position']['col']
    let line = gauge['position']['line']

    let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
    let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH) + GAUGE_SIZE/2+RING_WIDTH/2

    ctx.lineWidth = RING_WIDTH-10
    ctx.lineCap = 'round'
    
    let alertEnabled = false
    if (data1['value']<data1['minAlertThreshold'] || data1['value']>data1['maxAlertThreshold'] || 
        data2['value']<data2['minAlertThreshold'] || data2['value']>data2['maxAlertThreshold'] ||
        data3['value']<data3['minAlertThreshold'] || data3['value']>data3['maxAlertThreshold'] ) {

            alertEnabled = true

    } 

    if (alertEnabled) {
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + RING_WIDTH, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    } else {
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2+10, gauge['meta']['startRad'], gauge['meta']['endRad'])
        ctx.strokeStyle = '#111111'
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-5, gauge['meta']['startRad'], gauge['meta']['endRad'])
        ctx.strokeStyle = '#111111'
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-20, gauge['meta']['startRad'], gauge['meta']['endRad'])
        ctx.strokeStyle = '#111111'
        ctx.stroke();
        
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2+10, gauge['meta']['startRad'], gauge['meta']['startRad'] + data3['value']/data3['maxValue']*(gauge['meta']['endRad']-gauge['meta']['startRad']))
        ctx.strokeStyle = data3['getColor']()
        ctx.stroke();
        
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-5, gauge['meta']['startRad'], gauge['meta']['startRad'] + data2['value']/data2['maxValue']*(gauge['meta']['endRad']-gauge['meta']['startRad']))
        ctx.strokeStyle = data2['getColor']()
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-20, gauge['meta']['startRad'], gauge['meta']['startRad'] + data1['value']/data1['maxValue']*(gauge['meta']['endRad']-gauge['meta']['startRad']))
        ctx.strokeStyle = data1['getColor']()
        ctx.stroke();
    }

    ctx.font = "36px Arial"
    ctx.fillStyle = alertEnabled?"#000000":"white";
    ctx.textAlign = "center"
    ctx.fillText(String(Math.round(data1['value'])), gaugeX, gaugeY-5) //.padStart(2, '0')

    ctx.font = "36px Arial"
    ctx.fillStyle = alertEnabled?"#000000":"white";
    ctx.textAlign = "center"
    ctx.fillText(String(Math.round(data2['value'])), gaugeX, gaugeY+33)
}

function updateGauges(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // bounds rectangle
    // ctx.beginPath();
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.lineWidth = "1";
    // ctx.strokeStyle = "red";
    // ctx.stroke();

    for (label in GAUGES) {
        adjustGaugesData(label)
        drawGauge(label)
    }

}

function toggleMaxValuesView(elem){
    showMaxModeEnabled = !showMaxModeEnabled

    if (showMaxModeEnabled) {
        elem.setHTML('HIDE MAX')
    } else {
        elem.setHTML('SHOW MAX')
    }
}

function resetMaxValues(){
    for (label in GAUGES) {
        for (seriesIndex in GAUGES[label]['data']){
            GAUGES[label]['data'][seriesIndex]['maxRecordedValue'] = 0
        }
    }
}

function reloadPage(){
    location.reload()
}

let cycles = 0
function tick() {
    updateGauges()
    
    if (cycles%REFRESH_RATE==0) {
        pollForData()
    }
    cycles+=1
}

setInterval(tick, 1000/REFRESH_RATE)