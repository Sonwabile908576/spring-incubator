package entelect.training.incubator.service;

import entelect.training.incubator.model.Booking;
import entelect.training.incubator.model.NewBookingRequest;
import entelect.training.incubator.model.SearchBookingRequest;
import entelect.training.incubator.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.*;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private Set<String> ExistingReferenceNumbers = new HashSet<>();

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public String generateReference()
    {
        StringBuilder stringBuilder = new StringBuilder();
        Random random = new Random();
        for(int i = 0; i < 3; i++)
        {
            char c = (char)(random.nextInt(26) + 'a');
            stringBuilder.append(c);
        }

        for(int i = 0; i < 4; i++)
        {
            char c = (char)(random.nextInt(10) + '0');
            stringBuilder.append(c);
        }

        return stringBuilder.toString();
    }

    public String existsCheck(String potentialString)
    {
        String theFinalOne = new String();

        if(ExistingReferenceNumbers.contains(potentialString))
        {
            potentialString = generateReference();
            existsCheck(potentialString);
        }
        else
        {
            theFinalOne = potentialString;
        }

        return theFinalOne;
    }

    public String referenceNumberGenerator()
    {
        String generated = new String();
        generated = generateReference();
        generated = existsCheck(generated);
        return generated;
    }

    public List<Booking> getBookings(){
        Iterable<Booking> bookingIterable = bookingRepository.findAll();

        List<Booking> bookings = new ArrayList<>();

        bookingIterable.forEach(item -> bookings.add(item));

        return bookings;
    }

    public Booking createBooking(NewBookingRequest newBookingRequest){
        Booking createdBooking = new Booking();
        createdBooking.setCustomerId(newBookingRequest.getCustomerId());
        createdBooking.setFlightId(newBookingRequest.getFlightId());
        createdBooking.setReferenceNumber(referenceNumberGenerator());

        return bookingRepository.save(createdBooking);
    }

    public List<Booking> search(SearchBookingRequest searchBookingRequest){

        List<Booking> bookingList = new ArrayList<>();

        if(searchBookingRequest.customerId.isPresent())
        {
            Optional<List<Booking>> found = bookingRepository.getBookingsByCustomerId(searchBookingRequest.customerId.get());
            bookingList = found.get();
            return bookingList;
        }
        else
        {
            Optional<List<Booking>> found = bookingRepository.getBookingsByReferenceNumber(searchBookingRequest.referenceNumber.get());
            bookingList = found.get();
            return bookingList;
        }
    }

    public Booking findBookingById(Integer id)
    {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.orElse(null);
    }
}
