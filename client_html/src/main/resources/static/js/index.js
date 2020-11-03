var POLL_PERIOD = 1000;
var pollUrl = $("body").attr("data-pollUrl");
var noCpuCores;

var dialIds = [
    {id: "cpuLoadDial", maxRotation: 270}, 
    {id: "cpuFanDial", maxRotation: 270}, 
    {id: "cpuTempDial", maxRotation: 270}, 
    {id: "gpuCoreLoadDial", maxRotation: 270}, 
    {id: "gpuMemLoadDial", maxRotation: 270}, 
    {id: "gpuFanDial", maxRotation: 270}, 
    {id: "gpuTempDial", maxRotation: 270}, 
    {id: "ramLoadDial", maxRotation: 270},
    {id: "wattLoadDial", maxRotation: 270},
    {id: "timeDial", maxRotation: 348}]

var diskIds = ["dayMomentDisk"]

function updateDial(dialId, value, formula){
    if (value == -1) {
        disableDial(dialId);
    } else {
        rotateDial(dialId, formula(value));
    }
}

function changeCoreStatus(index, newValue) {
    let currentCore = $(`#coreStatus${index}`);
    let currentState = $(`#coreStatus${index}`).attr("src");

    if (currentState!=newValue) {
        currentCore.attr("src", newValue);
    }
}

function updateCoreStatus(loads){
    for (let index = 0; index < noCpuCores; index++) {
        let load = loads[index];
        if (load > -1) { 
            load = Math.round(loads[index]/10);
            let newState;
            if (load<10) {
                newState = `/pcstats_client/images/core_status/nixie_${load}.png`;
                // $(`#coreStatus${index}`).attr("src", `/pcstats_client/images/core_status/nixie_${load}.png`);
            } else {
                newState = `/pcstats_client/images/core_status/nixie_dash.png`;
                // $(`#coreStatus${index}`).attr("src", "/pcstats_client/images/core_status/nixie_dash.png");
            }

            changeCoreStatus(index, newState);
        } else {
            $(`#coreStatus${index}`).attr("src", "/pcstats_client/images/core_status/nixie_dot.png");
        }
    }
}

function updateTimeGauge(timeStr){
    let tokens = timeStr.split(":");
    let hours = Number(tokens[0]);
    let minutes = Number(tokens[1]);

    if (hours==-1) disableDial("timeDial")
    else rotateDial("timeDial", 15 + ((hours+4)%12)*30 + (Math.floor(minutes/15)*7.5) -46);

    let diskDegrees = 0-hours*15;
    $(`#dayMomentDisk`).css("transform", `rotate(${diskDegrees}deg)`);

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

            updateTimeGauge(data.time);
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
    dialIds.forEach(dial => {
        disableDial(dial.id)
    })
}

function startGaugesAnimation(){
    dialIds.forEach(dial => {
        rotateDial(dial.id, dial.maxRotation-45);
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

$("#animationToggle").change(function(event, jt){
    let state = jt.val() == "true";
    
    if (state) {
        $(".dial-container").addClass("animated");
    } else {
        $(".dial-container").removeClass("animated");
    }
});

noCpuCores = $("body").attr("data-noCpuCores");

$(".dial-container").addClass("animated");

startGaugesAnimation();
startCoreStatusAnimation(0);
