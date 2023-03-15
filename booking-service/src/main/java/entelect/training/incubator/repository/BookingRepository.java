package entelect.training.incubator.repository;

import entelect.training.incubator.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Integer> {

    Optional<List<Booking>> getBookingsByCustomerId(@Param("customerId") Integer customerId);

    // post -> /bookings/search
    Optional<List<Booking>> getBookingsByReferenceNumber(@Param("referenceNumber") String referenceNumber);
}
