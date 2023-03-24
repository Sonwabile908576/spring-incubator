package entelect.training.incubator.controller;

import entelect.training.incubator.model.Booking;
import entelect.training.incubator.model.NewBookingRequest;
import entelect.training.incubator.model.SearchBookingRequest;
import entelect.training.incubator.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@RequestMapping("bookings")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService){
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<?> getBookings(){
        List<Booking> bookings = bookingService.getBookings();

        if(bookings.isEmpty())
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody NewBookingRequest newBookingRequest)
    {
        Booking createdBooking = bookingService.createBooking(newBookingRequest);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Integer id)
    {
        Booking foundBooking = bookingService.findBookingById(id);

        if(foundBooking != null)
            return ResponseEntity.ok(foundBooking);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/search")
    public ResponseEntity<List<Booking>> searchBookings(@RequestBody SearchBookingRequest searchBookingRequest)
    {
        List<Booking> foundBookings = bookingService.search(searchBookingRequest);

        if(foundBookings == null)
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(foundBookings);
    }
}
