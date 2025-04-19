package com.MueveTic.app.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.VehiclesTypes;

public interface VehiclesTypesDAO extends MongoRepository<VehiclesTypes, Integer>{
	VehiclesTypes findByType(String type);
}