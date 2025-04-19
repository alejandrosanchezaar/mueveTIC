package com.MueveTic.app.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.Scooter;

import java.util.List;
import java.util.Optional;

public interface ScooterDAO extends MongoRepository<Scooter, Integer> {
	Optional<Scooter> findByLicensePlate(String licensePlate);
	List<Scooter> findByState(byte state);
}