package com.MueveTic.app.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.acls.domain.IdentityUnavailableException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.NotAcceptableStatusException;

import com.MueveTic.app.Entities.Booking;
import com.MueveTic.app.Entities.Car;
import com.MueveTic.app.Entities.Motorcycle;
import com.MueveTic.app.Entities.Person;
import com.MueveTic.app.Entities.StateBooking;
import com.MueveTic.app.Entities.StateVehicle;
import com.MueveTic.app.Entities.User;
import com.MueveTic.app.Entities.Vehicle;
import com.MueveTic.app.Repositories.BookingDAO;
import com.MueveTic.app.Repositories.ConfigParamsDAO;
import com.MueveTic.app.Utils.Utilities;

@Service
public class BookingService implements StateVehicle, StateBooking{
	@Autowired 
	private BookingDAO bookingRepository;
	@Autowired
	private VehicleService vehicleService; 
	@Autowired
	private PersonService personService;
	@Autowired
	private SequenceGeneratorService seqGenerator;
	@Autowired
	private ConfigParamsDAO paramsRepository;
	@Autowired
	private MongoTemplate mongoTemplate;
	@Transient
	private Utilities utils = new Utilities();
	
	public void createBooking(Map<String, Object> info) {
		Vehicle v = vehicleService.consultVehicle(info.get("licensePlate").toString());
		Person p = personService.searchPerson(info.get("email").toString());
		List<Booking> bookings = this.consultBooking(info.get("email").toString());
		for(int i = 0; i < bookings.size(); i++) {
			if(bookings.get(i).getState() == StateBooking.ACTIVE) {
				throw new NotAcceptableStatusException("User has already a booking");
			}
		}
		if(!checkCompatibility((User)p,v)) {
			throw new IdentityUnavailableException("User not allowed to book that vehicle");
		}
		if (v.isAvailable()) {
			Booking booking = new Booking(utils.obtainCurrentDate(),(User)p,v);
			booking.setId(seqGenerator.getSequenceNumber(Booking.SEQUENCE_NAME));
			v.setReserved();
			this.vehicleService.changeStateVehicle(v);
			this.bookingRepository.save(booking);
		}else {
			throw new IdentityUnavailableException("Vehicle is not available");
		}
	}
	
	private boolean checkCompatibility(User u, Vehicle v) {
		if(v instanceof Car) {
			return u.getCarnet().equals("B");
		}else if(v instanceof Motorcycle) {
			return u.getCarnet().equals("A1") || u.getCarnet().equals("B");
		}else {
			return true;
		}
	}

	public void confirmBooking(Map<String, Object> info) {
		List<Booking> bookings = this.consultBooking(info.get("email").toString());
		int minBatteryPerTrip = paramsRepository.findById(1).get().getMinBatteryPerTrip();
		int batteryPerTrip = paramsRepository.findById(1).get().getBatteryPerTrip();
		int pricePerTrip = paramsRepository.findById(1).get().getFacturationPerTrip();
		for(Booking booking : bookings) {
			if(booking.getState() == StateBooking.ACTIVE) {
				Booking b = booking;
				Vehicle v = booking.getVehicle();
				b.setComment(info.get("comment").toString());
				b.setRating(Byte.parseByte(info.get("rating").toString()));
				b.setHistorical();
				b.setPrice(pricePerTrip);
				v.setBattery(v.getBattery() - batteryPerTrip);
				if(v.getBattery() <= minBatteryPerTrip) {
					v.setUnAvailable(); 
				}else {
					v.setAvailable();
				}
				this.vehicleService.changeStateVehicle(v);
				this.bookingRepository.save(b);
			}
		}
	}
	
	public Booking consultActiveUserBooking(String email) {
		List<Booking> bookings = this.consultBooking(email);
		for(Booking booking : bookings) {
			if(booking.getState() == StateBooking.ACTIVE) {
				return booking;
			}
		}
		return null;
	}

	public void cancelUserBooking(String email) {
		List<Booking> bookings = this.consultBooking(email);
		for(Booking booking : bookings) {
			if(booking.getState() == StateBooking.ACTIVE) {
				Booking b = booking;
				Vehicle v = booking.getVehicle();
				b.setCancelled();
				v.setAvailable();
				this.vehicleService.changeStateVehicle(v);
				this.bookingRepository.save(b);
			}
		}
	}

	public List<User> consultAllPersonsWithBookings() {
		List<Booking> allBookings = bookingRepository.findAll();
		List<String> emails = new ArrayList<>();
		List<User> usuarios = new ArrayList<>();
		for (Booking booking : allBookings) {
			if(booking.getUser() != null) {
				if(!emails.contains(booking.getUser().getEmail())) {
					emails.add(booking.getUser().getEmail());
					usuarios.add(booking.getUser());
				}
			}
		}
		return usuarios;
	}

	public List<Booking> consultBooking(String email) {
		return this.bookingRepository.findByUser((User)this.personService.searchPerson(email));
	}

	public List<Booking> consultHistoryUserBooking(String email) {
		List<Booking> allBookings = this.consultBooking(email);
		List<Booking> result = new ArrayList<>();
		for(Booking booking : allBookings) {
			if(booking.getState() == StateBooking.CANCELLED || booking.getState() == StateBooking.HISTORICAL) {
				result.add(booking);
			}
		}
		return result;
	}

	public List<Booking> consultFacturation() {
		return this.bookingRepository.findByState(HISTORICAL);
	}

	public List<Booking> consultFacturationCar() {
		Query query = new Query(Criteria.where("vehicle.$ref").is("Car"));
        return mongoTemplate.find(query, Booking.class);
	}

	public List<Booking> consultFacturationScooter() {
		Query query = new Query(Criteria.where("vehicle.$ref").is("Scooter"));
        return mongoTemplate.find(query, Booking.class);
	}

	public List<Booking> consultFacturationMotorcycle() {
		Query query = new Query(Criteria.where("vehicle.$ref").is("Motorcycle"));
        return mongoTemplate.find(query, Booking.class);
	}
}