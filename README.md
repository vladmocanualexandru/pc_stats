# pc_stats
Monitor PC stats on a RaspberryPI, located in the same network. 

Approach: 
- OpenHardwareMonitor running on monitored PC (Remote Web Server mode on; gathers system data)
- SpringBoot aggregator project deployed on monitored PC (gathers data from OpenHardwareMonitor and converts it to displayable format)
- SpringBoot HTML client project deployed on monitored PC (gathers data from aggregator and renders HTML UI)
- HTML browser on RaspberryPI 3, displays HTML client page
- OHWM, SB aggregator and SB html client start with monitored PC
- RaspberryPI opens SB HTML client index page in fullscreen on boot
