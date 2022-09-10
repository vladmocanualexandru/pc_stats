# PC Stats
Monitor PC stats on a RaspberryPI, located in the same network. 

## Approach: 
- OpenHardwareMonitor running on monitored PC (Remote Web Server mode on; gathers system data)
- SpringBoot aggregator project deployed on monitored PC (gathers data from OpenHardwareMonitor and converts it to displayable format)
- SpringBoot HTML client project deployed on monitored PC (gathers data from aggregator and renders HTML UI)
- HTML browser on RaspberryPI 3, displays HTML client page
- OHWM, SB aggregator and SB html client start with monitored PC
- RaspberryPI opens SB HTML client index page in fullscreen on boot

## Deployment as Windows services:

Source: https://dzone.com/articles/spring-boot-as-a-windows-service-in-5-minutes

Source: https://github.com/winsw/winsw/releases

### Setup
- download appropriate winsw exe and rename the same as jar
- create xml file with the same name
```
<?xml version="1.0" encoding="UTF-8"?>
<service>
    <id>my_service</id>
    <name>My Service</name>
    <description>My Service Windows Service</description>
    <executable>java</executable>
    <arguments>-jar "my_service.jar"</arguments>
    <logmode>rotate</logmode>
</service>
```
- install service by running custom exe
```
my_service.exe install
``` 
- manage services using Windows Service application
- uninstall service by running custom exe
```
my_service.exe uninstall
``` 

### Deployment of PC Stats components as Windows services
- build latest PC Stats aggregator jar, copy it inside deployment folder and rename it to "aggregator.jar"
- build latest PC Stats HTML client jar, copy it inside deployment folder and rename it to "client_html.jar"
- install services using dedicated winsw exes
```
aggregator.exe install
client_html.exe install
```