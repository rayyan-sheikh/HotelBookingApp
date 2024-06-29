package com.rayyan.hotel.service.interfac;

import com.rayyan.hotel.dto.Response;
import com.rayyan.hotel.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
