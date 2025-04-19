package com.MueveTic.app.Repositories;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.Booking;
import com.MueveTic.app.Entities.User;
import com.MueveTic.app.Entities.Vehicle;

public interface BookingDAO extends MongoRepository<Booking, Integer> { 
	List<Booking> findByUser(User user);
	List<Booking> findByVehicle(Vehicle vehicle);
	List<Booking> findByState(byte state);
}