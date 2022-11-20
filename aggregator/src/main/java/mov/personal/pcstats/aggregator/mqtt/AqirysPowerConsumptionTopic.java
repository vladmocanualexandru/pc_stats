package mov.personal.pcstats.aggregator.mqtt;

public class AqirysPowerConsumptionTopic extends SingleValueTopic{
    private Integer value = -1; 

    @Override
    protected String getTopic() {
        return "hass-sensor-out/aqirys-power-consumption";
    }

    @Override
    protected void payloadReceived(byte[] payload) {
        value = Integer.parseInt(new String(payload));
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
