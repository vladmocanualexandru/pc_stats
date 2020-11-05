package mov.personal.pcstats.aggregator;

import mov.personal.pcstats.commons.SystemInfo;
import mov.personal.pcstats.commons.SystemStatus;

public interface SystemDataCollector {
    public void enrichSystemInfo(SystemInfo systemInfo);
    public void enrichSystemStatus(SystemStatus systemStatus);
}
