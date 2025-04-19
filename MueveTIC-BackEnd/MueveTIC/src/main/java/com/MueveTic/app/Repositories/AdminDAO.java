package com.MueveTic.app.Repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.Admin;

public interface AdminDAO extends MongoRepository<Admin, Integer> { 
	Optional<Admin> findByName(String name);
	Optional<Admin> findByEmail(String email);
	Optional<Admin> findByEmailAndPassword(String email,String password);
}
