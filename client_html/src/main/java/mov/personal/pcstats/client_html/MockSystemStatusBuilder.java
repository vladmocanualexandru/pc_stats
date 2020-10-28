package mov.personal.pcstats.client_html;

import mov.personal.pcstats.commons.SystemStatus;

public class MockSystemStatusBuilder {

	public static SystemStatus build() {
        SystemStatus status = new SystemStatus();

        status.setCpuLoad(Math.random()*100);
        status.setGpuLoad(Math.random()*100);
        status.setRamLoad(Math.random()*100);

        status.setCpuTemp(Math.random()*80 + 20);
        status.setGpuTemp(Math.random()*80 + 20);
        
        return status;
	}

}
