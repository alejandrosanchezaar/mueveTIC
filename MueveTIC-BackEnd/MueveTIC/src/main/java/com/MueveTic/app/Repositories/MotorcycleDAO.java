package com.MueveTic.app.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.MueveTic.app.Entities.Motorcycle;

public interface MotorcycleDAO extends MongoRepository<Motorcycle,Integer> {
	Optional<Motorcycle> findByLicensePlate(String licensePlate);	
	List<Motorcycle> findByState(byte state);
}