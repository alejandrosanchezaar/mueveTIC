package com.MueveTic.app.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.PersonalMant;

public interface PersonalMantDAO extends MongoRepository<PersonalMant, Integer> { 
	Optional<PersonalMant> findByName(String name);
	Optional<PersonalMant> findByEmail(String email);
	Optional<PersonalMant> findByEmailAndPassword(String email,String password);
}
