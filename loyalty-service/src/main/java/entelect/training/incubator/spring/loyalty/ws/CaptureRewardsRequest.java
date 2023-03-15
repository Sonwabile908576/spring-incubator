package entelect.training.incubator.spring.loyalty.ws;

import java.math.BigDecimal;

public class CaptureRewardsRequest {

    private String passportNumber;
    private BigDecimal amount;
    public String getPassportNumber() {
        return this.passportNumber;
    }

    public BigDecimal getAmount() {
        return this.amount;
    }
}
