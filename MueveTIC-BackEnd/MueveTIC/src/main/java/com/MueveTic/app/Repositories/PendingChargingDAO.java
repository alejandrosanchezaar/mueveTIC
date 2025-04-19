package com.MueveTic.app.Repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.MueveTic.app.Entities.PendingCharging;
import com.MueveTic.app.Entities.PersonalMant;
import com.MueveTic.app.Entities.Vehicle;

public interface PendingChargingDAO extends MongoRepository<PendingCharging,Integer>{

	PendingCharging findByVehicle(Vehicle vehicle);
	List<PendingCharging> findByPersonalMant(PersonalMant personalMant);
}
