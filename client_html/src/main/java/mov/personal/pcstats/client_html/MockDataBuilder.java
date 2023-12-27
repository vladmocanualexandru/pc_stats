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
                
                status.setGpuLoadCore(Math.random()*100);
                status.setGpuLoadMemory(Math.random()*100);
                status.setGpuTemp(Math.random()*80 + 20);
                
                status.setRamLoad(Math.random()*100);

                status.setFps((int)Math.round(Math.random()*180));

                status.setCpuFan((int)Math.round(Math.random()*2100));
                status.setGpuFan((int)Math.round(Math.random()*1400));

                status.getTime()[0] = (int)Math.round(Math.random()*23);
                status.getTime()[1] = (int)Math.round(Math.random()*59);;
                status.getTime()[2] = 0;

                status.setPowerConsumption((int)Math.round(Math.random()*800));

                return status;
	}

	public SystemStatus buildStatus(SystemStatus status) {

                if (!useSubtleVariation) return buildStatus();

		status.setCpuLoad(Math.max(0, Math.min(100, status.getCpuLoad()+(Math.random()*10-5))));
                status.setCpuTemp(Math.max(20, Math.min(100, status.getCpuTemp()+(Math.random()*8-4))));

                status.setGpuLoadCore(Math.max(0, Math.min(100, status.getGpuLoadCore()+(Math.random()*10-5))));
                status.setGpuLoadMemory(Math.max(0, Math.min(100, status.getGpuLoadMemory()+(Math.random()*10-5))));
                status.setGpuTemp(Math.max(20, Math.min(100, status.getGpuTemp()+(Math.random()*8-4))));
                
                status.setRamLoad(Math.max(0, Math.min(100, status.getRamLoad()+(Math.random()*10-5))));
                
                status.setFps((int)Math.max(0, Math.min(180, status.getFps()+(Math.random()*18-9))));

                status.setCpuFan((int)Math.max(0, Math.min(3000, status.getCpuFan()+(Math.random()*200-100))));
                status.setGpuFan((int)Math.max(0, Math.min(3000, status.getGpuFan()+(Math.random()*200-100))));
                
                int hours = status.getTime()[0];
                int minutes = status.getTime()[1] + 10;
                if (minutes >= 60) { minutes -= 60; hours = (hours+1)%24; }

                status.getTime()[0] = hours;
                status.getTime()[1] = minutes;
                
                return status;
	}

}
