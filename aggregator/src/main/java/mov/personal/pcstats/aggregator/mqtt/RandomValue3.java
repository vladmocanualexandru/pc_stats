package mov.personal.pcstats.aggregator.mqtt;

public class RandomValue3 extends SingleValueTopic{
    private Double value = -1.0; 

    @Override
    protected String getTopic() {
        return "hass-sensor-out/random_1_100_3";
    }

    @Override
    protected void payloadReceived(byte[] payload) {
        value = Double.parseDouble(new String(payload));
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
