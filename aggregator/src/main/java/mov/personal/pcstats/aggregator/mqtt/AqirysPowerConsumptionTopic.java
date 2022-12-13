package mov.personal.pcstats.aggregator.mqtt;

import org.json.JSONObject;

public class AqirysPowerConsumptionTopic extends SingleValueTopic{
    private Double value = -1.0; 

    @Override
    protected String getTopic() {
        return "zigbee2mqtt/Outlet | aqirys @ study";
    }

    @Override
    protected void payloadReceived(byte[] payload) {
        String jsonData = new String(payload);
        JSONObject jsonObject = new JSONObject(jsonData);

        value = jsonObject.getDouble("power");
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
