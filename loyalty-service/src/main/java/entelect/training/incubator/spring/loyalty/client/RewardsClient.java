/*
package entelect.training.incubator.spring.loyalty.client;

import entelect.training.incubator.spring.loyalty.ws.CaptureRewardsRequest;
import entelect.training.incubator.spring.loyalty.ws.CaptureRewardsResponse;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import java.math.BigDecimal;

public class RewardsClient extends WebServiceGatewaySupport {

    public CaptureRewardsResponse getReward(String passportNumber, BigDecimal amount){
        CaptureRewardsRequest request = new CaptureRewardsRequest();
        request.setPassportNumber(passportNumber);
        request.setAmount(amount);

        CaptureRewardsResponse response = (CaptureRewardsResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request);
        return response;
    }
}
*/
