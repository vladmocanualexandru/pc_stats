const SHOW_BOUNDS_RECTANGLE = false

const REFRESH_RATE = 40 // in Hz; should be divider of 1000

const GAUGE_OFFSET_X = 15
const GAUGE_OFFSET_Y = 10
const GAUGE_SPACING_X = 15
const GAUGE_SPACING_Y = 20

const GAUGE_SIZE=160
const RING_WIDTH=20

const NEEDLE_BODY_LENGTH = 80
const NEEDLE_TAIL_LENGTH = 20

const POLL_URL = $("body").attr("data-pollUrl");
const GAUGES = {
    "ramLoad": {
        "meta":{
            "line":0, 
            "col":0,
            "labels": ['RAM','LOAD', '%'],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FF00FF'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 20,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 70
        }]
    },
    "cpuLoad": {
        "meta":{
            "line":0, 
            "col":1,
            "labels": ['CPU', 'LOAD', '%'],
            "maxValueRecordEnabled": true,
            "type": "cpuLoad"
        },
        "data":[
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FF9900'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 95
        }]
    },
    "cpuTemp": {
        "meta":{
            
            "line":0, 
            "col":2,
            "labels": ['CPU','TEMP','°C'],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FF9900'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        }]
    },
    "fps": {
        "meta":{
            
            "line":0, 
            "col":3,
            "labels": ['FPS','',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#00ffff'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 240,
            "minAlertThreshold": 45,
            "maxAlertThreshold": 99999
        }]
    },
    "gpuLoadCore": {
        "meta":{
            
            "line":1, 
            "col":0,
            "labels": ['GPU','CORE','%'],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#76B900'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 95
        }]
    },
    "gpuLoadMem": {
        "meta":{
            
            "line":1, 
            "col":1,
            "labels": ['GPU','MEM','%'],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#76B900'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 95
        }]
    },
    "gpuTemp": {
        "meta":{
            
            "line":1, 
            "col":2,
            "labels": ['GPU','TEMP','°C'],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#76B900'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 30,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        }]
    },
    "powerConsumption": {
        "meta":{
            
            "line":1, 
            "col":3,
            "labels": ['LOAD','', 'W'],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FFFF00'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 100,
            "maxValue": 500,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 450
        }]
    },
}

const GAUGE_LOGIC = {
    "single": drawGauge_single,
    "cpuLoad": drawGauge_cpuLoad
}

const TIME_DATA = {
    "hours":-1,
    "minutes":-1
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
            brokenConnection = false
            
            setDataValue(GAUGES['cpuLoad']['data'][0], data['cpuLoad'])
            setDataValue(GAUGES['gpuLoadCore']['data'][0], data['gpuLoadCore'])
            setDataValue(GAUGES['gpuLoadMem']['data'][0], data['gpuLoadMemory'])
            setDataValue(GAUGES['fps']['data'][0], data['fps'])
            
            setDataValue(GAUGES['cpuTemp']['data'][0], data['cpuTemp'])
            setDataValue(GAUGES['gpuTemp']['data'][0], data['gpuTemp'])
            setDataValue(GAUGES['ramLoad']['data'][0], data['ramLoad'])
            setDataValue(GAUGES['powerConsumption']['data'][0], data['powerConsumption'])
            TIME_DATA["hours"] = data['time'][0]
            TIME_DATA["minutes"] = data['time'][1]
            
            // setDataValue(GAUGES['cpuRamLoad']['data'][0], data['cpuLoad'])
            // setDataValue(GAUGES['cpuRamLoad']['data'][1], data['ramLoad'])
        },
        error: function(e1,e2,e3,e4){
            brokenConnection = true
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
let alertTestModeEnabled = false
let brokenConnection = false

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
    let meta = gauge['meta']
    let gaugeData =  gauge['data']

    if ("type" in meta) {
        GAUGE_LOGIC[meta["type"]](meta, gaugeData)
    }
    else {
        drawGauge_single(meta, gaugeData)
    }
}

function drawGauge_single(meta, dataSet) {
    let data = dataSet[0]

    let col = meta['col']
    let line = meta['line']
    let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
    let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2

    ctx.lineWidth = RING_WIDTH-15
    ctx.lineCap = 'round'

    // let startParkRad = degreesToRads(35)
    // let endParkRad = degreesToRads(55)
    let startRad = degreesToRads(45)
    let endRad = degreesToRads(270)

    let value = data['value']
    
    let alertEnabled = false
    if (value<data['minAlertThreshold'] || value>data['maxAlertThreshold']) {
        alertEnabled = true
    } 

    alertEnabled = alertEnabled || alertTestModeEnabled
 
    if (meta['maxValueRecordEnabled']) {
        let maxValueBubbleRad = Math.min(endRad, startRad + Math.max(data['maxRecordedValue'] - data['minValue'], 1) / (data['maxValue'] - data['minValue']) * (endRad - startRad))
        
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + 10, maxValueBubbleRad, maxValueBubbleRad)
        // ctx.strokeStyle = '#555555'
        ctx.strokeStyle = data['getColor']()
        ctx.stroke();

        // ctx.lineWidth = RING_WIDTH-17

        // ctx.beginPath();
        // ctx.moveTo(gaugeX-Math.sin(maxValueBubbleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH, gaugeY+Math.cos(maxValueBubbleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH);
        // ctx.lineTo(gaugeX+Math.cos(maxValueBubbleRad)*NEEDLE_BODY_LENGTH, gaugeY+Math.sin(maxValueBubbleRad)*NEEDLE_BODY_LENGTH);
        // ctx.stroke();

        ctx.lineWidth = RING_WIDTH-15
    }

    let valueAngleRad = Math.PI / 12;
    if (data['value']>-1) {
        valueAngleRad = Math.min(endRad, startRad + Math.max(data['value'] - data['minValue'], 1) / (data['maxValue'] - data['minValue']) * (endRad - startRad))
    }
    ctx.beginPath()
    ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + 10, startRad, valueAngleRad)
    ctx.strokeStyle = data['getColor']()
    ctx.stroke();

    if (alertEnabled) {
        ctx.beginPath()
        ctx.arc(gaugeX+75, gaugeY-74, 13, 0, 2 * Math.PI)
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    ctx.lineWidth = RING_WIDTH-17

    ctx.beginPath();
    ctx.moveTo(gaugeX-Math.sin(valueAngleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH, gaugeY+Math.cos(valueAngleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH);
    ctx.lineTo(gaugeX+Math.cos(valueAngleRad)*NEEDLE_BODY_LENGTH, gaugeY+Math.sin(valueAngleRad)*NEEDLE_BODY_LENGTH);
    ctx.stroke();

    ctx.beginPath()
    ctx.arc(gaugeX, gaugeY, 5, 0, 2 * Math.PI)
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath()
    ctx.arc(gaugeX, gaugeY, 5, 0, 2 * Math.PI)
    ctx.strokeStyle = data['getColor']()
    ctx.stroke();



    ctx.font = "16px b612"
    ctx.fillStyle = (showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':data['getColor']()
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][0], gaugeX+46, gaugeY+33)
    
    ctx.font = "16px b612"
    ctx.fillStyle = (showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':data['getColor']()
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][1], gaugeX+46, gaugeY+53)

    let label = data['getDataLabel'](showMaxModeEnabled?data['maxRecordedValue']:data['value'])
    label += meta['labels'][2]

    ctx.font = "20px b612"
    ctx.fillStyle = (showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':data['getColor']()
    ctx.textAlign = "center"
    ctx.fillText(label, gaugeX+46, gaugeY+80)

}

function drawGauge_cpuLoad(meta, dataSet) {
    let needleBodyLength = 70
    let gaugeSize = 142

    let data = dataSet[0]

    let col = meta['col']
    let line = meta['line']
    let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
    let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2

    ctx.lineWidth = RING_WIDTH-15
    ctx.lineCap = 'round'

    // let startParkRad = degreesToRads(35)
    // let endParkRad = degreesToRads(55)
    let startRad = degreesToRads(45)
    let endRad = degreesToRads(270)

    let value = data['value']
    
    let alertEnabled = false
    if (value<data['minAlertThreshold'] || value>data['maxAlertThreshold']) {
        alertEnabled = true
    } 

    alertEnabled = alertEnabled || alertTestModeEnabled
 
    if (meta['maxValueRecordEnabled']) {
        let maxValueBubbleRad = startRad + Math.max(data['maxRecordedValue'] - data['minValue'], 1) / (data['maxValue'] - data['minValue']) * (endRad - startRad)
        
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, gaugeSize / 2 + 10, maxValueBubbleRad, maxValueBubbleRad)
        // ctx.strokeStyle = '#555555'
        ctx.strokeStyle = data['getColor']()
        ctx.stroke();

        // ctx.lineWidth = RING_WIDTH-17

        // ctx.beginPath();
        // ctx.moveTo(gaugeX-Math.sin(maxValueBubbleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH, gaugeY+Math.cos(maxValueBubbleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH);
        // ctx.lineTo(gaugeX+Math.cos(maxValueBubbleRad)*NEEDLE_BODY_LENGTH, gaugeY+Math.sin(maxValueBubbleRad)*NEEDLE_BODY_LENGTH);
        // ctx.stroke();

        ctx.lineWidth = RING_WIDTH-15
    }

    let valueAngleRad = Math.PI / 12;
    if (data['value']>-1) {
        valueAngleRad = Math.min(endRad, startRad + Math.max(data['value'] - data['minValue'], 1) / (data['maxValue'] - data['minValue']) * (endRad - startRad))
    }
    ctx.beginPath()
    ctx.arc(gaugeX, gaugeY, gaugeSize / 2 + 10, startRad, valueAngleRad)
    ctx.strokeStyle = data['getColor']()
    ctx.stroke();

    if (alertEnabled) {
        ctx.beginPath()
        ctx.arc(gaugeX+75, gaugeY-74, 13, 0, 2 * Math.PI)
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    ctx.lineWidth = RING_WIDTH-17


    ctx.beginPath();
    ctx.moveTo(gaugeX-Math.sin(valueAngleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH, gaugeY+Math.cos(valueAngleRad+Math.PI/2)*NEEDLE_TAIL_LENGTH);
    ctx.lineTo(gaugeX+Math.cos(valueAngleRad)*needleBodyLength, gaugeY+Math.sin(valueAngleRad)*needleBodyLength);
    ctx.stroke();

    ctx.beginPath()
    ctx.arc(gaugeX, gaugeY, 5, 0, 2 * Math.PI)
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath()
    ctx.arc(gaugeX, gaugeY, 5, 0, 2 * Math.PI)
    ctx.strokeStyle = data['getColor']()
    ctx.stroke();



    ctx.font = "16px b612"
    ctx.fillStyle = (showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':data['getColor']()
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][0], gaugeX+46, gaugeY+33)
    
    ctx.font = "16px b612"
    ctx.fillStyle = (showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':data['getColor']()
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][1], gaugeX+46, gaugeY+53)

    let label = data['getDataLabel'](showMaxModeEnabled?data['maxRecordedValue']:data['value'])
    label += meta['labels'][2]

    ctx.font = "20px b612"
    ctx.fillStyle = (showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':data['getColor']()
    ctx.textAlign = "center"
    ctx.fillText(label, gaugeX+46, gaugeY+80)

}

function drawTime() {
    let label = String(Math.round(TIME_DATA["hours"])).padStart(2, '0') + ':' + String(Math.round(TIME_DATA["minutes"])).padStart(2, '0')

    $("#timeCell").html(label)

    // ctx.font = "32px Arial"
    // ctx.fillStyle = "white"
    // ctx.textAlign = "center"
    // ctx.fillText(label, 400, 443)
}

function updateGauges(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // bounds rectangle
    if (SHOW_BOUNDS_RECTANGLE) {
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    for (label in GAUGES) {
        adjustGaugesData(label)
        drawGauge(label)
    }
}

function toggleAlert(){
    alertTestModeEnabled = !alertTestModeEnabled
}

function toggleMaxValuesView(elem){
    let je = $(elem)
    showMaxModeEnabled = !showMaxModeEnabled

    if (showMaxModeEnabled) {
        je.html('HIDE MAX')
    } else {
        je.html('SHOW MAX')
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
    drawTime()
    
    if (cycles%REFRESH_RATE==0) {
        pollForData()
    }
    cycles+=1
}

setInterval(tick, 1000/REFRESH_RATE)