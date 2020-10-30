var POLL_PERIOD = 1000;
var pollUrl = $("body").attr("data-pollUrl");
var noCpuCores;

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

function updateCoreStatus(loads){
    for (let index = 0; index < noCpuCores; index++) {
        let load = loads[index];
        if (load > -1) { 
            load = Math.round(loads[index]/10);

            if (load<10) {
                $(`#coreStatus${index}`).attr("src", `/pcstats_client/images/core_status/nixie_${load}.png`);
            } else {
                $(`#coreStatus${index}`).attr("src", "/pcstats_client/images/core_status/nixie_dash.png");
            }
        } else {
            $(`#coreStatus${index}`).attr("src", "/pcstats_client/images/core_status/nixie_dot.png");
        }
    }
}

function pollForData(){
   
    $.ajax({
        url: pollUrl,
        success: function(data){
            // console.log(data);
            
            updateDial("cpuLoadDial", data.cpuLoad, v=>{return v*270/100-45});
            updateDial("cpuTempDial", data.cpuTemp, v=>{return Math.max(0,v-20)*270/80-45});
            updateDial("cpuFanDial", data.cpuFan, v=>{return v*270/3000-45});

            updateDial("gpuCoreLoadDial", data.gpuLoadCore, v=>{return v*270/100-45});
            updateDial("gpuMemLoadDial", data.gpuLoadMemory, v=>{return v*270/100-45});
            updateDial("gpuTempDial", data.gpuTemp, v=>{return Math.max(0,v-20)*270/80-45});
            updateDial("gpuFanDial", data.gpuFan, v=>{return v*270/3000-45});
            
            updateDial("ramLoadDial", data.ramLoad, v=>{return v*270/100-45});
            
            updateDial("wattLoadDial", data.watts, v=>{return Math.max(0,(v-100))*270/600-45});

            updateCoreStatus(data.cpuCoreLoads);

            setTimeout(pollForData, POLL_PERIOD);
        },
        error: function(e1,e2,e3,e4){
            console.log(e1,e2,e3,e4);
            disableAllDials();
            disableCoreStatus();
    
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

function startGaugesAnimation(){
    dialIds.forEach(dialId => {
        rotateDial(dialId, 270-45);
    });

    setTimeout(pollForData, 1000);
}

function disableCoreStatus(){
    $(".nixieTube").attr("src", "/pcstats_client/images/core_status/nixie_dot.png");
}

function startCoreStatusAnimation(currentStep){
    
    setTimeout(function(){
        $(`#coreStatus${currentStep}`).attr("src", "/pcstats_client/images/core_status/nixie_dot.png");
        
        if (currentStep<7) {
            startCoreStatusAnimation(currentStep+1);
        } 

    }, 100);
}

noCpuCores = $("body").attr("data-noCpuCores");

startGaugesAnimation();
startCoreStatusAnimation(0);