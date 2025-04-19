package com.MueveTic.app.Repositories;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.MueveTic.app.Entities.User;

public interface UserDAO extends MongoRepository<User,Integer> { 
	Optional<User> findByName(String name);
	Optional<User> findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email,String password);
}
