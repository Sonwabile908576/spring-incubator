package entelect.training.incubator.spring.loyalty.ws;

import java.math.BigDecimal;

public class CaptureRewardsResponse {

    private BigDecimal balance;
    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}
