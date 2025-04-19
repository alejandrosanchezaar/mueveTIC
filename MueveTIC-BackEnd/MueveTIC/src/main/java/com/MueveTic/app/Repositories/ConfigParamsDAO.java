package com.MueveTic.app.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.ConfigParams;


public interface ConfigParamsDAO extends MongoRepository<ConfigParams, Integer> { 
	Optional<ConfigParams> findById(int id);
}