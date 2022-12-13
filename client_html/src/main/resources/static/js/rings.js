const SHOW_BOUNDS_RECTANGLE = false

const REFRESH_RATE = 40 // in Hz; should be divider of 1000

const GAUGE_OFFSET_X = 15
const GAUGE_OFFSET_Y = 10
const GAUGE_SPACING_X = 15
const GAUGE_SPACING_Y = 20

const GAUGE_SIZE=160
const RING_WIDTH=20

const POLL_URL = $("body").attr("data-pollUrl");
const GAUGES = {
    // "ramLoad": {
    //     "meta":{
    //         "type":"single",
    //         "line":0, 
    //         "col":0,
    //         "labels": ['RAM','LOAD', '', '%'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#FF00FF'},
    //         "getDataLabel": (data) => { return Math.round(data)}, 
    //         "minValue": 0,
    //         "maxValue": 100,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 75
    //     }]
    // },
    // "cpuLoad": {
    //     "meta":{
    //         "type":"single",
    //         "line":0, 
    //         "col":1,
    //         "labels": ['CPU','LOAD','','%'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[
    //     {
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#FF0000'},
    //         // "getColor": () => {return '#ED1C24'},
    //         "getDataLabel": (data) => { return Math.round(data)}, 
    //         "minValue": 0,
    //         "maxValue": 100,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 999
    //     }]
    // },
    "cpuRamLoad": {
        "meta":{
            "type":"double",
            "line":0, 
            "col":0,
            "labels": ['LOAD','CPU %','','RAM %', ''],
            "maxValueRecordEnabled": true,
        },
        "data":[
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FF0000'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 999
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#BC00BC'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 75
        }]
    },
    "gpuLoad": {
        "meta":{
            "type":"double",
            "line":0, 
            "col":1,
            "labels": ['GPU','CORE %','','MEM %',''],
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
            "maxAlertThreshold": 999
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#4D7700'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 999
        }]
    },
    "net": {
        "meta":{
            "type":"double",
            "line":0, 
            "col":2,
            "labels": ['MB/s','DOWN','','UP',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#00FFFF'},
            "getDataLabel": (data) => { return (data/1024).toFixed(2)}, 
            "minValue": 0,
            "maxValue": 12000,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 99999
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#00A8A8'},
            "getDataLabel": (data) => { return (data/1024).toFixed(2)}, 
            "minValue": 0,
            "maxValue": 12000,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 99999
        }]
    },
    // "cpuTemp": {
    //     "meta":{
    //         "type":"single",
    //         "line":0, 
    //         "col":2,
    //         "labels": ['CPU','TEMP','','°C'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#FF0000'},
    //         // "getColor": () => {return '#ED1C24'},
    //         "getDataLabel": (data) => { return Math.round(data)}, 
    //         "minValue": 45,
    //         "maxValue": 100,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 80
    //     }]
    // },
    "misc": {
        "meta":{
            "type":"double",
            "line":0, 
            "col":3,
            "labels": ['MISC','FPS','','LOAD W',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FF6700'},
            // "getColor": () => {return '#EEEEEE'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 300,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 9999
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FFDC00'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 0,
            "maxValue": 600,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 400
        }]
    },
    "cpuGpuTemp": {
        "meta":{
            "type":"double",
            "line":1, 
            "col":0,
            "labels": ['TEMP','CPU °C','','GPU °C',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#FF0000'},
            // "getColor": () => {return '#ED1C24'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#4D7700'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        }]
    },
    "moboChipsetTemp": {
        "meta":{
            "type":"double",
            "line":1, 
            "col":1,
            "labels": ['TEMP','MOBO °C','','CHIP °C',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#8700FF'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#5500A5'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 80
        }]
    },
    "ssd1Temp": {
        "meta":{
            "type":"double",
            "line":1, 
            "col":2,
            "labels": ['SSD 1','TEMP1 °C','','TEMP2 °C',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#0087FF'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#0060B5'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        }]
    },
    "ssd2Temp": {
        "meta":{
            "type":"double",
            "line":1, 
            "col":3,
            "labels": ['SSD 2','TEMP1 °C','','TEMP2 °C',''],
            "maxValueRecordEnabled": true,
        },
        "data":[{
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#0087FF'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        },
        {
            "value":-1,
            "target":-1,
            "delta":-1,
            "maxRecordedValue":-1,
            "getColor": () => {return '#0060B5'},
            "getDataLabel": (data) => { return Math.round(data)}, 
            "minValue": 40,
            "maxValue": 100,
            "minAlertThreshold": 0,
            "maxAlertThreshold": 90
        }]
    },

    // "fps": {
    //     "meta":{
    //         "type":"single",
    //         "line":0, 
    //         "col":3,
    //         "labels": ['FPS','','',''],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#FF6700'},
    //         // "getColor": () => {return '#EEEEEE'},
    //         "getDataLabel": (data) => { return Math.round(data)}, 
    //         "minValue": 0,
    //         "maxValue": 300,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 9999
    //     }]
    // },
    // "powerConsumption": {
    //     "meta":{
    //         "type":"single",
    //         "line":1, 
    //         "col":3,
    //         "labels": ['LOAD','', '', 'W'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#FFDC00'},
    //         "getDataLabel": (data) => { return Math.round(data)}, 
    //         "minValue": 0,
    //         "maxValue": 600,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 400
    //     }]
    // },


    // "gpuLoadMem": {
    //     "meta":{
    //         "type":"single",
    //         "line":1, 
    //         "col":0,
    //         "labels": ['GPU','MEM','','%'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#76B900'},
    //         "minValue": 0,
    //         "maxValue": 100,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 90
    //     }]
    // },
    // "gpuLoadCore": {
    //     "meta":{
    //         "type":"single",
    //         "line":1, 
    //         "col":1,
    //         "labels": ['GPU','CORE','','%'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#76B900'},
    //         "minValue": 0,
    //         "maxValue": 100,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 90
    //     }]
    // },
    // "gpuTemp": {
    //     "meta":{
    //         "type":"single",
    //         "line":1, 
    //         "col":2,
    //         "labels": ['GPU','TEMP', '', '°C'],
    //         "maxValueRecordEnabled": true,
    //     },
    //     "data":[{
    //         "value":-1,
    //         "target":-1,
    //         "delta":-1,
    //         "maxRecordedValue":-1,
    //         "getColor": () => {return '#76B900'},
    //         "getDataLabel": (data) => { return Math.round(data)}, 
    //         "minValue": 40,
    //         "maxValue": 100,
    //         "minAlertThreshold": 0,
    //         "maxAlertThreshold": 80
    //     }]
    // },

    // "time": {
    //     "meta":{
    //         "type":"time",
    //         "line":1, 
    //         "col":3,
    //         "labels": ['','','','',''],
    //         "maxValueRecordEnabled": false,
    //     },
    //     "data":[
    //         {
    //             "value":-1,
    //             "target":-1,
    //             "delta":-1,
    //             "maxRecordedValue":-1,
    //             "getColor": getHoursColor,
    //             "minValue": 0,
    //             "maxValue": 24,
    //             "minAlertThreshold": 0,
    //             "maxAlertThreshold": 24
    //         },
    //         {
    //             "value":-1,
    //             "target":-1,
    //             "delta":-1,
    //             "maxRecordedValue":-1,
    //             "getColor": getMinutesColor,
    //             "minValue": 0,
    //             "maxValue": 60,
    //             "minAlertThreshold": 0,
    //             "maxAlertThreshold": 60
    //         },
    //         {
    //             "value":-1,
    //             "target":-1,
    //             "delta":-1,
    //             "maxRecordedValue":-1,
    //             "getColor": getSecondsColor,
    //             "minValue": 0,
    //             "maxValue": 60,
    //             "minAlertThreshold": 0,
    //             "maxAlertThreshold": 60
    //         }
    //     ]
    // }

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

            // setDataValue(GAUGES['ramLoad']['data'][0], data['ramLoad'])
            // setDataValue(GAUGES['cpuLoad']['data'][0], data['cpuLoad'])

            setDataValue(GAUGES['cpuRamLoad']['data'][0], data['cpuLoad'])
            setDataValue(GAUGES['cpuRamLoad']['data'][1], data['ramLoad'])
            // setDataValue(GAUGES['cpuTemp']['data'][0], data['cpuTemp'])
            
            
            
            setDataValue(GAUGES['gpuLoad']['data'][0], data['gpuLoadCore'])
            setDataValue(GAUGES['gpuLoad']['data'][1], data['gpuLoadMemory'])
            
            setDataValue(GAUGES['net']['data'][0], data['bandwidthDownRate'])
            setDataValue(GAUGES['net']['data'][1], data['bandwidthUpRate'])
            
            
            // setDataValue(GAUGES['gpuLoadCore']['data'][0], data['gpuLoadCore'])
            // setDataValue(GAUGES['gpuLoadMem']['data'][0], data['gpuLoadMemory'])
            
            // setDataValue(GAUGES['gpuTemp']['data'][0], data['gpuTemp'])
            
            setDataValue(GAUGES['misc']['data'][0], data['fps'])
            setDataValue(GAUGES['misc']['data'][1], data['powerConsumption'])

            setDataValue(GAUGES['cpuGpuTemp']['data'][0], data['cpuTemp'])
            setDataValue(GAUGES['cpuGpuTemp']['data'][1], data['gpuTemp'])
            
            setDataValue(GAUGES['moboChipsetTemp']['data'][0], data['moboTemp'])
            setDataValue(GAUGES['moboChipsetTemp']['data'][1], data['chipsetTemp'])
            
            setDataValue(GAUGES['ssd1Temp']['data'][0], data['ssd1Temp1'])
            setDataValue(GAUGES['ssd1Temp']['data'][1], data['ssd1Temp2'])

            setDataValue(GAUGES['ssd2Temp']['data'][0], data['ssd2Temp1'])
            setDataValue(GAUGES['ssd2Temp']['data'][1], data['ssd2Temp2'])

            // setDataValue(GAUGES['moboChipsetTemp']['data'][0], data['gpuTemp'])
            // setDataValue(GAUGES['moboChipsetTemp']['data'][1], data['gpuTemp'])
            // setDataValue(GAUGES['fps']['data'][0], data['fps'])
            // setDataValue(GAUGES['powerConsumption']['data'][0], data['powerConsumption'])

            TIME_DATA["hours"] = data['time'][0]
            TIME_DATA["minutes"] = data['time'][1]
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

const GAUGE_LOGIC={
    'single':drawGauge_single,
    'double':drawGauge_double,
}

function drawGauge(label) {
    let gauge =  GAUGES[label]
    let meta = gauge['meta']
    let gaugeData =  gauge['data']

    GAUGE_LOGIC[meta['type']](meta, gaugeData)
}

function drawGauge_single(meta, dataSet) {
    let data = dataSet[0]

    let col = meta['col']
    let line = meta['line']
    let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
    let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2

    ctx.lineWidth = RING_WIDTH-10
    ctx.lineCap = 'round'

    let startRad = degreesToRads(35)
    let endRad = degreesToRads(325)

    let value = data['value']
    
    let alertEnabled = false
    if (value<data['minAlertThreshold'] || value>data['maxAlertThreshold']) {
        alertEnabled = true
    } 

    alertEnabled = alertEnabled || alertTestModeEnabled
    if (alertEnabled) {
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + RING_WIDTH, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    } else {
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2 + 10, startRad, endRad)
        ctx.strokeStyle = '#111111'
        ctx.stroke();

        if (meta['maxValueRecordEnabled']) {
            let maxValueBubbleRad = startRad + Math.max(data['maxRecordedValue'] - data['minValue'], 1) / (data['maxValue'] - data['minValue']) * (endRad - startRad)
            
            ctx.beginPath()
            ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + 10, maxValueBubbleRad, maxValueBubbleRad)
            ctx.strokeStyle = '#444444'
            ctx.stroke();
        }

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + 10, startRad, startRad + Math.max(data['value'] - data['minValue'], 1) / (data['maxValue'] - data['minValue']) * (endRad - startRad))
        ctx.strokeStyle = data['getColor']()
        ctx.stroke();
    }
    
    ctx.font = "14px Arial"
    ctx.fillStyle = alertEnabled?"#000000":'#999999'
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][1], gaugeX, gaugeY-35)

    // let label = Math.round(showMaxModeEnabled?data['maxRecordedValue']:data['value'])
    let label = data['getDataLabel'](showMaxModeEnabled?data['maxRecordedValue']:data['value'])
    label += meta['labels'][2]

    ctx.font = "46px Arial"
    ctx.fillStyle = alertEnabled?'#000000':((showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':'#ffffff')
    ctx.textAlign = "center"
    ctx.fillText(label, gaugeX, gaugeY+16)

    ctx.font = "14px Arial"
    ctx.fillStyle = alertEnabled?"#000000":'#999999'
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][3], gaugeX, gaugeY+45)

    ctx.font = "18px Arial"
    ctx.fillStyle = alertEnabled?"#000000":'#ffffff'
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][0], gaugeX, gaugeY+80)
}

function drawGauge_double(meta, dataSet) {
    let data0 = dataSet[0]
    let data1 = dataSet[1]

    let col = meta['col']
    let line = meta['line']

    let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
    let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH) + GAUGE_SIZE/2+RING_WIDTH/2

    ctx.lineWidth = RING_WIDTH-10
    ctx.lineCap = 'round'

    let startRad = degreesToRads(35)
    let endRad = degreesToRads(325)
    
    let alertEnabled = false
    if (data0['value']<data0['minAlertThreshold'] || data0['value']>data0['maxAlertThreshold'] || 
        data1['value']<data1['minAlertThreshold'] || data1['value']>data1['maxAlertThreshold']) {
            alertEnabled = true
    } 

    alertEnabled = alertEnabled || alertTestModeEnabled
    if (alertEnabled) {
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + RING_WIDTH, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
    } else {
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2 + 10, startRad, endRad)
        ctx.strokeStyle = '#111111'
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2 - 5, startRad, endRad)
        ctx.strokeStyle = '#111111'
        ctx.stroke();

        if (meta['maxValueRecordEnabled']) {
            let maxValueBubbleRad = startRad + Math.max(data1['maxRecordedValue'] - data1['minValue'], 1) / (data1['maxValue'] - data1['minValue'])*(endRad-startRad)
            
            ctx.beginPath()
            ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2+10, maxValueBubbleRad, maxValueBubbleRad)
            ctx.strokeStyle = '#444444'
            ctx.stroke();

            maxValueBubbleRad = startRad + Math.max(data0['maxRecordedValue'] - data0['minValue'], 1) / (data0['maxValue'] - data0['minValue'])*(endRad-startRad)

            ctx.beginPath()
            ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-5, maxValueBubbleRad, maxValueBubbleRad)
            ctx.strokeStyle = '#444444'
            ctx.stroke();
        }
        
        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2+10, startRad, startRad + Math.max(data1['value'] - data1['minValue'], 1) / (data1['maxValue'] - data1['minValue'])*(endRad-startRad))
        ctx.strokeStyle = data1['getColor']()
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-5, startRad, startRad + Math.max(data0['value'] - data0['minValue'], 1) / (data0['maxValue'] - data0['minValue'])*(endRad-startRad))
        ctx.strokeStyle = data0['getColor']()
        ctx.stroke();

    }

    ctx.font = "14px Arial"
    ctx.fillStyle = alertEnabled?"#000000":'#999999'
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][1], gaugeX, gaugeY-35)

    // let label = Math.round(showMaxModeEnabled?data0['maxRecordedValue']:data0['value'])
    let label = data0['getDataLabel'](showMaxModeEnabled?data0['maxRecordedValue']:data0['value'])
    label += meta['labels'][2]

    ctx.font = "24px Arial"
    ctx.fillStyle = alertEnabled?"#000000":((showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':'#ffffff')
    ctx.textAlign = "center"
    ctx.fillText(label, gaugeX, gaugeY-6)


    // label = Math.round(showMaxModeEnabled?data1['maxRecordedValue']:data1['value'])
    label = data1['getDataLabel'](showMaxModeEnabled?data1['maxRecordedValue']:data1['value'])
    label += meta['labels'][4]

    ctx.font = "24px Arial"
    ctx.fillStyle = alertEnabled?"#000000":((showMaxModeEnabled&&meta['maxValueRecordEnabled'])?'#999999':'#ffffff')
    ctx.textAlign = "center"
    ctx.fillText(label, gaugeX, gaugeY+23)

    ctx.font = "14px Arial"
    ctx.fillStyle = alertEnabled?"#000000":'#999999'
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][3], gaugeX, gaugeY+45)

    ctx.font = "18px Arial"
    ctx.fillStyle = alertEnabled?"#000000":'#ffffff'
    ctx.textAlign = "center"
    ctx.fillText(meta['labels'][0], gaugeX, gaugeY+80)

}

// The old time gauge - kept for the proper ring sizes
//
// function drawGauge_triple(meta, dataSet) {
//     let data0 = dataSet[0]
//     let data1 = dataSet[1]
//     let data2 = dataSet[2]

//     let col = meta['col']
//     let line = meta['line']

//     let gaugeX = GAUGE_OFFSET_X+col*(GAUGE_SPACING_X+GAUGE_SIZE+RING_WIDTH)+GAUGE_SIZE/2+RING_WIDTH/2
//     let gaugeY = GAUGE_OFFSET_Y+line*(GAUGE_SPACING_Y+GAUGE_SIZE+RING_WIDTH) + GAUGE_SIZE/2+RING_WIDTH/2

//     ctx.lineWidth = RING_WIDTH-10
//     ctx.lineCap = 'round'

//     let startRad = degreesToRads(180)
//     let endRad = degreesToRads(540)
    
//     let alertEnabled = false
//     if (data0['value']<data0['minAlertThreshold'] || data0['value']>data0['maxAlertThreshold'] || 
//         data1['value']<data1['minAlertThreshold'] || data1['value']>data1['maxAlertThreshold'] ||
//         data2['value']<data2['minAlertThreshold'] || data2['value']>data2['maxAlertThreshold'] ) {
//             alertEnabled = true
//     } 

//     alertEnabled = alertEnabled || alertTestModeEnabled || brokenConnection
//     if (alertEnabled) {
//         ctx.beginPath();
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE / 2 + RING_WIDTH, 0, 2 * Math.PI, false);
//         ctx.fillStyle = '#FF0000';
//         ctx.fill();

//         if (brokenConnection) {
//             ctx.font = "14px Arial"
//             ctx.fillStyle = "#000000"
//             ctx.textAlign = "center"
//             ctx.fillText('SERVER', gaugeX, gaugeY-35)

//             ctx.fillText('DOWN', gaugeX, gaugeY+45)
//         }
//     } else {
//         ctx.beginPath()
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2+10, startRad, endRad)
//         ctx.strokeStyle = '#111111'
//         ctx.stroke();

//         ctx.beginPath()
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-5, startRad, endRad)
//         ctx.strokeStyle = '#111111'
//         ctx.stroke();

//         ctx.beginPath()
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-20, startRad, endRad)
//         ctx.strokeStyle = '#111111'
//         ctx.stroke();
        
//         ctx.beginPath()
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2+10, startRad, startRad + data2['value']/data2['maxValue']*(endRad-startRad))
//         ctx.strokeStyle = data2['getColor']()
//         ctx.stroke();
        
//         ctx.beginPath()
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-5, startRad, startRad + data1['value']/data1['maxValue']*(endRad-startRad))
//         ctx.strokeStyle = data1['getColor']()
//         ctx.stroke();

//         ctx.beginPath()
//         ctx.arc(gaugeX, gaugeY, GAUGE_SIZE/2-20, startRad, startRad + data0['value']/data0['maxValue']*(endRad-startRad))
//         ctx.strokeStyle = data0['getColor']()
//         ctx.stroke();
//     }

//     let label = String(Math.round(data0['value'])).padStart(2, '0') + ':' + String(Math.round(data1['value'])).padStart(2, '0')

//     ctx.font = "32px Arial"
//     ctx.fillStyle = alertEnabled?"#000000":"white";
//     ctx.textAlign = "center"
//     ctx.fillText(label, gaugeX, gaugeY+11)
// }

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
    drawTime()
    
    if (cycles%REFRESH_RATE==0) {
        pollForData()
    }
    cycles+=1
}

setInterval(tick, 1000/REFRESH_RATE)