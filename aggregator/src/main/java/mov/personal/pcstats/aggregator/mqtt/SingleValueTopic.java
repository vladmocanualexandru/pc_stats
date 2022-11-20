package mov.personal.pcstats.aggregator.mqtt;

public abstract class SingleValueTopic {
    protected abstract String getTopic();
    protected abstract void payloadReceived(byte[] payload);

}
