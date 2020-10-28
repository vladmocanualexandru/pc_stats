var POLL_PERIOD = 1000;
var pollUrl = $("body").attr("data-pollUrl");

function pollForData(){
   
    $.get(pollUrl, function(data){
        console.log(data);

        // $("#cpuLoadP").text(data.cpuLoad);
        let value = data.cpuLoad*270/100-45
        $("#cpuLoadDial").css("transform", `rotate(${value}deg)`);
        $("#cpuLoadDialShadow").css("transform", `rotate(${value}deg)`);

        // $("#gpuLoadP").text(data.gpuLoad);
        value = data.gpuLoad*270/100-45
        $("#gpuLoadDial").css("transform", `rotate(${value}deg)`);
        $("#gpuLoadDialShadow").css("transform", `rotate(${value}deg)`);

        // $("#ramLoadP").text(data.ramLoad);
        value = data.ramLoad*270/100-45
        $("#ramLoadDial").css("transform", `rotate(${value}deg)`);
        $("#ramLoadDialShadow").css("transform", `rotate(${value}deg)`);

        value = ((data.cpuTemp-20)/80)*270-45
        $("#cpuTempDial").css("transform", `rotate(${value}deg)`);
        $("#cpuTempDialShadow").css("transform", `rotate(${value}deg)`);

        value = ((data.gpuTemp-20)/80)*270-45
        $("#gpuTempDial").css("transform", `rotate(${value}deg)`);
        $("#gpuTempDialShadow").css("transform", `rotate(${value}deg)`);


        setTimeout(pollForData, POLL_PERIOD);
    })
    
}

setTimeout(pollForData, POLL_PERIOD)