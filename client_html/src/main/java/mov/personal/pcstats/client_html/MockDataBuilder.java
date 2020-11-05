package mov.personal.pcstats.client_html;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

@Component
public class MockDataBuilder {
        
        @Value("${pcstats.client-html.mock-data.use-subtle-variation}")
        Boolean useSubtleVariation;

        public SystemInfo buildInfo() {
                SystemInfo info = new SystemInfo();
                
                info.setCpuName("TEST CPU (use-mock-data=true)");
                info.setGpuName("TEST GPU (use-mock-data=true)");
                info.setPcName("TEST PC (use-mock-data=true)");
                info.setNoCpuCores((int)Math.round(Math.random()*7)+1);

                return info;
        }

	public SystemStatus buildStatus() {
                SystemStatus status = new SystemStatus();

                status.setCpuLoad(Math.random()*100);
                status.setCpuTemp(Math.random()*80 + 20);
                status.setCpuFan((int)Math.round(Math.random()*3000));

                status.setCha1Fan((int)Math.round(Math.random()*3000));
                status.setCha2Fan((int)Math.round(Math.random()*3000));
                
                status.setGpuLoadCore(Math.random()*100);
                status.setGpuLoadMemory(Math.random()*100);
                status.setGpuTemp(Math.random()*80 + 20);
                status.setGpuFan((int)Math.round(Math.random()*3000));
                
                status.setRamLoad(Math.random()*100);

                status.setFps((int)Math.round(Math.random()*180));

                status.setWatts(Math.random()*700);

                for (int i =0; i<status.getCpuCoreLoads().length; i++) {
                        status.getCpuCoreLoads()[i] = Math.random()*100;
                }

                status.setTime(String.format("%d:00:00", Math.round(Math.random()*23)));

                return status;
	}

	public SystemStatus buildStatus(SystemStatus status) {

                if (!useSubtleVariation) return buildStatus();

		status.setCpuLoad(Math.max(0, Math.min(100, status.getCpuLoad()+(Math.random()*10-5))));
                status.setCpuTemp(Math.max(20, Math.min(100, status.getCpuTemp()+(Math.random()*8-4))));
                status.setCpuFan((int)Math.round(Math.max(0, Math.min(3000, status.getCpuFan()+(Math.random()*300-150)))));

                status.setCha1Fan((int)Math.round(Math.max(0, Math.min(3000, status.getCha1Fan()+(Math.random()*300-150)))));
                status.setCha2Fan((int)Math.round(Math.max(0, Math.min(3000, status.getCha2Fan()+(Math.random()*300-150)))));
                
                status.setGpuLoadCore(Math.max(0, Math.min(100, status.getGpuLoadCore()+(Math.random()*10-5))));
                status.setGpuLoadMemory(Math.max(0, Math.min(100, status.getGpuLoadMemory()+(Math.random()*10-5))));
                status.setGpuTemp(Math.max(20, Math.min(100, status.getGpuTemp()+(Math.random()*8-4))));
                status.setGpuFan((int)Math.round(Math.max(0, Math.min(3000, status.getGpuFan()+(Math.random()*300-150)))));
                
                status.setRamLoad(Math.max(0, Math.min(100, status.getRamLoad()+(Math.random()*10-5))));
                
                status.setFps((int)Math.max(0, Math.min(180, status.getFps()+(Math.random()*18-9))));
                
                status.setWatts(Math.max(0, Math.min(700, status.getWatts()+(Math.random()*70-35))));

                for (int i =0; i<status.getCpuCoreLoads().length; i++) {
                        double load = status.getCpuCoreLoads()[i];
                        if (load>-1){
                                status.getCpuCoreLoads()[i] = Math.max(0, Math.min(100, load+(Math.random()*20-10)));
                        }
                }

                int hours = Integer.parseInt(status.getTime().split(":")[0]);
                int minutes = Integer.parseInt(status.getTime().split(":")[1])+15;
                if (minutes == 60) { minutes = 0; hours = (hours+1)%24; }
                status.setTime(String.format("%d:%d:00", hours, minutes));
                
                return status;
	}

}
