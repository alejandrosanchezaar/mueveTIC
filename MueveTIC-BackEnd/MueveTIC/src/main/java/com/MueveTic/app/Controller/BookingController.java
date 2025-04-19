package com.MueveTic.app.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.acls.domain.IdentityUnavailableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.NotAcceptableStatusException;

import com.MueveTic.app.Entities.Booking;
import com.MueveTic.app.Entities.User;
import com.MueveTic.app.Services.BookingService;

@RestController
@RequestMapping("bookings")
@CrossOrigin("*")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	/* FUNCIONALIDAD DEL USUARIO */
	@PostMapping("/createBooking")
	public ResponseEntity<String> createBooking(@RequestBody Map<String,Object> info){
		try {
			this.bookingService.createBooking(info);
		}catch(NotAcceptableStatusException | IdentityUnavailableException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/cancelUserBooking")
	public ResponseEntity<String> cancelBooking(@RequestParam String email) {
		this.bookingService.cancelUserBooking(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/confirmBooking")
	public ResponseEntity<String> confirmBooking(@RequestBody Map<String,Object> info) {
		this.bookingService.confirmBooking(info);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/consultUserBooking")
	public ResponseEntity<Booking> consultUserBooking(@RequestParam String email) {
		return new ResponseEntity<>(this.bookingService.consultActiveUserBooking(email),HttpStatus.OK);
	}
	
	@GetMapping("/consultHistoryUserBooking")
	public ResponseEntity<List<Booking>> consultHistoryUserBooking(@RequestParam String email) {
		return new ResponseEntity<>(this.bookingService.consultHistoryUserBooking(email),HttpStatus.OK);
	}
	/* FIN FUNCIONALIDAD DEL USUARIO */
	
	/* FUNCIONALIDAD DEL ADMIN */
	@GetMapping("/consultAllPersonsWithBookings")
	public List<User> consultAllPersonsWithBookings() {
		return this.bookingService.consultAllPersonsWithBookings();
	}
	
	@GetMapping("/consultBooking")
	public List<Booking> consultBooking(@RequestParam String email) {
		return this.bookingService.consultBooking(email);
	}
	
	@GetMapping("/consultFacturation")
	public List<Booking> consultFacturation() {
		return this.bookingService.consultFacturation();
	}
	
	@GetMapping("/consultFacturationCar")
	public List<Booking> consultFacturationCar() {
		return this.bookingService.consultFacturationCar();
	}
	
	@GetMapping("/consultFacturationScooter")
	public List<Booking> consultFacturationScooter() {
		return this.bookingService.consultFacturationScooter();
	}
	
	@GetMapping("/consultFacturationMotorcycle")
	public List<Booking> consultFacturationMotorcycle() {
		return this.bookingService.consultFacturationMotorcycle();
	}
	/* FIN FUNCIONALIDAD DEL ADMIN */
}