package entelect.training.incubator.model;

import lombok.Data;

import java.util.Optional;

@Data
public class SearchBookingRequest {
    public Optional<Integer> customerId;
    public Optional<String> referenceNumber;
}
