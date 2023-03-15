package entelect.training.incubator.spring.loyalty.ws;

import java.math.BigDecimal;

public class CaptureRewardsRequest {

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    private String passportNumber;
    private BigDecimal amount;
    public String getPassportNumber() {
        return this.passportNumber;
    }

    public BigDecimal getAmount() {
        return this.amount;
    }
}
