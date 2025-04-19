package com.MueveTic.app.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.MueveTic.app.Entities.PendingCharging;
import com.MueveTic.app.Entities.PersonalMant;
import com.MueveTic.app.Entities.Vehicle;
import com.MueveTic.app.Repositories.ConfigParamsDAO;
import com.MueveTic.app.Repositories.PendingChargingDAO;

@Service
public class PendingChargingService {
	
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private PersonService personService;
	@Autowired
	private SequenceGeneratorService seqGenerator;
	@Autowired
	private PendingChargingDAO pendingChargingRepository;
	@Autowired
	private ConfigParamsDAO paramsRepository;
	
	public void reserveChargingVehicle(String licensePlate, String email) throws com.mongodb.MongoWriteException{
		int maxVehiclesCharging = paramsRepository.findById(1).get().getMaxVehiclesCharging();
		Vehicle v = vehicleService.consultVehicle(licensePlate);
		PersonalMant p = (PersonalMant) personService.searchPerson(email);
		if(v.isUnAvailable() && pendingChargingRepository.findByPersonalMant(p).size() < maxVehiclesCharging) {
			PendingCharging pc = new PendingCharging(v,p);
			v.setPendingCharging();
			vehicleService.changeStateVehicle(v);
			pc.setId(seqGenerator.getSequenceNumber(PendingCharging.SEQUENCE_NAME));
			this.pendingChargingRepository.insert(pc);
		}else {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Máximo número de reservas alcanzado.");
		}
	}
	
	public List<PendingCharging> removePendingChargingVehicle(String licensePlate, String email) {
		Vehicle v = vehicleService.consultVehicle(licensePlate);
		v.setUnAvailable();
		vehicleService.changeStateVehicle(v);
		this.pendingChargingRepository.delete(this.pendingChargingRepository.findByVehicle(v));
		return this.consultPendingChargingVehicle(email);
	}
	public List<PendingCharging> removeChargeVehicle(String licensePlate, String email) {
		Vehicle v = vehicleService.consultVehicle(licensePlate);
		this.pendingChargingRepository.delete(this.pendingChargingRepository.findByVehicle(v));
		return this.consultPendingChargingVehicle(email);
	}
	
	

	public List<PendingCharging> consultPendingChargingVehicle(String email) {
		return this.pendingChargingRepository.findByPersonalMant((PersonalMant)personService.searchPerson(email));
	}
}