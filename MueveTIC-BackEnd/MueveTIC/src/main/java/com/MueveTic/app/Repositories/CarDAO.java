package com.MueveTic.app.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.Car;

public interface CarDAO extends MongoRepository<Car,Integer> {
	Optional<Car> findByLicensePlate(String licensePlate);
	List<Car> findByState(byte state);
}