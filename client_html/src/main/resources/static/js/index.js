var POLL_PERIOD = 1000;
var pollUrl = $("body").attr("data-pollUrl");

var dialIds = [
    "cpuLoadDial", 
    "cpuFanDial", 
    "cpuTempDial", 
    "gpuCoreLoadDial", 
    "gpuMemLoadDial", 
    "gpuFanDial", 
    "gpuTempDial", 
    "ramLoadDial",
    "wattLoadDial"]

function updateDial(dialId, value, formula){
    if (value == -1) {
        disableDial(dialId);
    } else {
        rotateDial(dialId, formula(value));
    }
}

function pollForData(){
   
    $.ajax({
        url: pollUrl,
        success: function(data){
            // console.log(data);
            
            updateDial("cpuLoadDial", data.cpuLoad, v=>{return v*270/100-45});
            updateDial("cpuTempDial", data.cpuTemp, v=>{return Math.max(20,v)*270/100-45});
            updateDial("cpuFanDial", data.cpuFan, v=>{return v*270/3000-45});

            updateDial("gpuCoreLoadDial", data.gpuLoadCore, v=>{return v*270/100-45});
            updateDial("gpuMemLoadDial", data.gpuLoadMemory, v=>{return v*270/100-45});
            updateDial("gpuTempDial", data.gpuTemp, v=>{return Math.max(20,v)*270/100-45});
            updateDial("gpuFanDial", data.gpuFan, v=>{return v*270/3000-45});
            
            updateDial("ramLoadDial", data.ramLoad, v=>{return v*270/100-45});
            
            updateDial("wattLoadDial", data.watts, v=>{return Math.max(100,v)*270/700-45});

            setTimeout(pollForData, POLL_PERIOD);
        },
        error: function(e1,e2,e3,e4){
            console.log(e1,e2,e3,e4);
            disableAllDials();
    
            setTimeout(pollForData, POLL_PERIOD*5);
        }
    });
    
}

function rotateDial(dialId, degrees){
    $(`#${dialId}`).css("transform", `rotate(${degrees}deg)`);
    $(`#${dialId}Shadow`).css("transform", `rotate(${degrees}deg)`);
}

function disableDial(dialId){
    $(`#${dialId}`).attr("style", "");
    $(`#${dialId}Shadow`).attr("style", "");
}

function disableAllDials(){
    dialIds.forEach(dialId => {
        disableDial(dialId)
    })
}

function startAnimation(){
    dialIds.forEach(dialId => {
        rotateDial(dialId, 270-45);
    });

    setTimeout(pollForData, 1000);
}

startAnimation();
