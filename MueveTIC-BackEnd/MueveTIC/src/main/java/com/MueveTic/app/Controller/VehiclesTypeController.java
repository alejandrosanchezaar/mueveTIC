package com.MueveTic.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MueveTic.app.Entities.VehiclesTypes;
import com.MueveTic.app.Services.VehiclesTypeService;

@RestController
@RequestMapping("vehiclesType")
@CrossOrigin("*")
public class VehiclesTypeController {
	
	@Autowired
	private VehiclesTypeService vehiclesTypeService;
	
	@GetMapping("/addVehiclesType")
	public ResponseEntity<String> addVehiclesType(@RequestParam String type){
		try {
			this.vehiclesTypeService.addVehiclesType(type);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/removeVehiclesType")
	public ResponseEntity<String> removeVehiclesType(@RequestParam String type){
		try {
			this.vehiclesTypeService.removeVehiclesType(type);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/consultAll")
	public ResponseEntity<List<VehiclesTypes>> consultAll() {
		return new ResponseEntity<>(this.vehiclesTypeService.consultAll(),HttpStatus.OK);
	}
}