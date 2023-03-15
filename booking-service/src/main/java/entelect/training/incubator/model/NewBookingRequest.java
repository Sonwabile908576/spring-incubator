package entelect.training.incubator.model;

import lombok.Data;

@Data
public class NewBookingRequest {
    private Integer customerId;
    private Integer flightId;
}
