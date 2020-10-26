# pc_stats
Monitor PC stats on a RaspberryPI, located in the same network. 

Approach: SpringBoot server project on monitored PC; SpringBoot client project on RaspberryPI, that polls server and displays stats in minimalist HTML UI.

## Update 26 October 2020 

After a couple of tests I noticed the raspberrypi3 struggling to run both a browser and a springboot project. Obviously, this is not a good solution, and probably the best would be to combine the two projects in a single one (the server can also provide the UI).

For academic purposes, I will continue with the initial approach, with two springboot projects, but both will be hosted by the monitored PC.

The raspberrypi will only run a browser window, for the client's UI.