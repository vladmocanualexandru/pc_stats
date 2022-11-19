package mov.personal.pcstats.aggregator.mqtt;

public class AqirysPowerConsumptionTopic extends SingleValueTopic{
    private Integer value; 

    public AqirysPowerConsumptionTopic(String endpoint, String username, String password) {
        super(endpoint, username, password);
    }

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
