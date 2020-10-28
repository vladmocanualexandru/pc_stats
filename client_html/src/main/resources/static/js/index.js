var POLL_PERIOD = 1000;
var pollUrl = $("body").attr("data-pollUrl");

function pollForData(){
    $.get(pollUrl, function(data){
        console.log(data);

        $("#cpuLoadP").text(data.cpuLoad);
        let value = data.cpuLoad*270/100-45
        $("#cpuLoadDial").css("transform", `rotate(${value}deg)`);

        $("#gpuLoadP").text(data.gpuLoad);
        value = data.gpuLoad*270/100-45
        $("#gpuLoadDial").css("transform", `rotate(${value}deg)`);

        $("#ramLoadP").text(data.ramLoad);
        value = data.ramLoad*270/100-45
        $("#ramLoadDial").css("transform", `rotate(${value}deg)`);


        setTimeout(pollForData, POLL_PERIOD);
    })
}

setTimeout(pollForData, POLL_PERIOD)