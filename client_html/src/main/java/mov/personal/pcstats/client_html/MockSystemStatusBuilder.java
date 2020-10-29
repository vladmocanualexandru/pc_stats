package mov.personal.pcstats.client_html;

import mov.personal.pcstats.commons.SystemStatus;

public class MockSystemStatusBuilder {

	public static SystemStatus build() {
                SystemStatus status = new SystemStatus();

                status.setCpuLoad(Math.random()*100);
                status.setCpuTemp(Math.random()*80 + 20);
                status.setCpuFan(Math.random()*3000);
                
                status.setGpuLoadCore(Math.random()*100);
                status.setGpuLoadMemory(Math.random()*100);
                status.setGpuTemp(Math.random()*80 + 20);
                status.setGpuFan(Math.random()*3000);
                
                status.setRamLoad(Math.random()*100);

                status.setWatts(Math.random()*700);

                for (int i =0; i<status.getCpuCoreLoads().length; i++) {
                        status.getCpuCoreLoads()[i] = Math.random()*100;
                }
                
                return status;
	}

	public static SystemStatus build(SystemStatus status) {
		status.setCpuLoad(Math.max(0, Math.min(100, status.getCpuLoad()+(Math.random()*10-5))));
                status.setCpuTemp(Math.max(20, Math.min(100, status.getCpuTemp()+(Math.random()*8-4))));
                status.setCpuFan(Math.max(0, Math.min(3000, status.getCpuFan()+(Math.random()*300-150))));
                
                status.setGpuLoadCore(Math.max(0, Math.min(100, status.getGpuLoadCore()+(Math.random()*10-5))));
                status.setGpuLoadMemory(Math.max(0, Math.min(100, status.getGpuLoadMemory()+(Math.random()*10-5))));
                status.setGpuTemp(Math.max(20, Math.min(100, status.getGpuTemp()+(Math.random()*8-4))));
                status.setGpuFan(Math.max(0, Math.min(3000, status.getGpuFan()+(Math.random()*300-150))));
                
                status.setRamLoad(Math.max(0, Math.min(100, status.getRamLoad()+(Math.random()*10-5))));
                
                status.setWatts(Math.max(0, Math.min(700, status.getWatts()+(Math.random()*70-35))));

                for (int i =0; i<status.getCpuCoreLoads().length; i++) {
                        status.getCpuCoreLoads()[i] = Math.max(0, Math.min(100, status.getCpuCoreLoads()[i]+(Math.random()*20-10)));
                }
                
                return status;
	}

}
