package com.MueveTic.app.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MueveTic.app.Entities.VehiclesTypes;
import com.MueveTic.app.Repositories.VehiclesTypesDAO;

@Service
public class VehiclesTypeService {

	@Autowired
	private VehiclesTypesDAO vehiclesTypeRepository;
	@Autowired
	private SequenceGeneratorService seqGenerator;
	
	public void addVehiclesType(String vehicleType) {
		VehiclesTypes vt = new VehiclesTypes(vehicleType);
		vt.setId(seqGenerator.getSequenceNumber(VehiclesTypes.SEQUENCE_NAME));
		this.vehiclesTypeRepository.insert(vt);
	}
	
	public void removeVehiclesType(String vehicleType) {
		this.vehiclesTypeRepository.delete(this.vehiclesTypeRepository.findByType(vehicleType));
	}	
	
	public List<VehiclesTypes> consultAll() {
		return this.vehiclesTypeRepository.findAll();
	}
}