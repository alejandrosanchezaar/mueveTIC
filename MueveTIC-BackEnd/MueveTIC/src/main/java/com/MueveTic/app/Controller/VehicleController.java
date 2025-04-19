package com.MueveTic.app.Controller;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MueveTic.app.Entities.Car;
import com.MueveTic.app.Entities.Motorcycle;
import com.MueveTic.app.Entities.Scooter;
import com.MueveTic.app.Entities.Vehicle;
import com.MueveTic.app.Services.VehicleService;
import com.MueveTic.app.Utils.AdminCarResponse;
import com.MueveTic.app.Utils.AdminMotorcycleResponse;
import com.MueveTic.app.Utils.AdminRatingResponse;
import com.MueveTic.app.Utils.AdminScooterResponse;

@RestController
@RequestMapping("vehicle")
@CrossOrigin("*")
public class VehicleController {

	@Autowired
	private VehicleService vehicleService;
	
	@GetMapping("/dischargeVehicle")
	public void dischargeVehicle(@RequestParam String licensePlate) {
		this.vehicleService.dischargeVehicle(licensePlate);
	}

	@PostMapping("/addVehicle")
	public ResponseEntity<String> registerVehicle(@RequestBody Map<String,Object> info) {
		try {
			this.vehicleService.addVehicle(info);
		} catch (DuplicateKeyException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@PostMapping("/update")
	public ResponseEntity<String> update(@RequestBody Map<String, Object> info){
		try {
			JSONObject jso = new JSONObject(info);
			this.vehicleService.update(jso);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/removeVehicle")
	public ResponseEntity<String> removeVehicle(@RequestBody Map<String,Object> info) {
		try {
			this.vehicleService.removeVehicle(info);
		} catch (DuplicateKeyException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/activateVehicle")
	public ResponseEntity<String> activateVehicle(@RequestBody Map<String,Object> info) {
		try {
			this.vehicleService.activateVehicle(info);
		} catch (DuplicateKeyException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/consultVehicle")
	public ResponseEntity<Vehicle> consultVehicle(@RequestParam String licensePlate){
		return new ResponseEntity<>(this.vehicleService.consultVehicle(licensePlate),HttpStatus.OK);
	}
	
	@GetMapping("/getAllCars")
	public ResponseEntity<List<AdminCarResponse>> getAllCars() {
		return new ResponseEntity<>(this.vehicleService.getAllCars(),HttpStatus.OK);
	}
	
	@GetMapping("/getAllMotorcycle")
	public ResponseEntity<List<AdminMotorcycleResponse>> getAllMotorcycle() {
		return new ResponseEntity<>(this.vehicleService.getAllMotorcycle(),HttpStatus.OK);
	}
	
	@GetMapping("/getAllScooter")
	public ResponseEntity<List<AdminScooterResponse>> getAllScooter() {
		return new ResponseEntity<>(this.vehicleService.getAllScooter(),HttpStatus.OK);
	}
	
	@GetMapping("/consultRatingCar")
	public List<AdminRatingResponse> consultRatingCar(){
		return this.vehicleService.consultRatingCar();
	}
	
	@GetMapping("/consultRatingScooter")
	public List<AdminRatingResponse> consultRatingScooter(){
		return this.vehicleService.consultRatingScooter();
	}
	
	@GetMapping("/consultRatingMotorcycle")
	public List<AdminRatingResponse> consultRatingMotorcycle(){
		return this.vehicleService.consultRatingMotorcycle();
	}
	
	@GetMapping("/availableCar")
	public ResponseEntity<List<Car>> availableCar() {
		return new ResponseEntity<>(this.vehicleService.availableCar(),HttpStatus.OK);
	}
	
	@GetMapping("/availableScooter")
	public ResponseEntity<List<Scooter>> availableScooter() {
		return new ResponseEntity<>(this.vehicleService.availableScooter(),HttpStatus.OK);
	}
	
	@GetMapping("/availableMotorcycle")
	public ResponseEntity<List<Motorcycle>> availableMotorcycle() {
		return new ResponseEntity<>(this.vehicleService.availableMotorcycle(),HttpStatus.OK);
	}
	
	@GetMapping("/lowBatteryCar")
	public ResponseEntity<List<Car>> lowBatteryCar() {
		return new ResponseEntity<>(this.vehicleService.lowBatteryCar(),HttpStatus.OK);
	}
	
	@GetMapping("/lowBatteryMotorcycle")
	public ResponseEntity<List<Motorcycle>> lowBatteryMotorcycle() {
		return new ResponseEntity<>(this.vehicleService.lowBatteryMotorcycle(),HttpStatus.OK);
	}
	
	@GetMapping("/lowBatteryScooter")
	public ResponseEntity<List<Scooter>> lowBatteryScooter() {
		return new ResponseEntity<>(this.vehicleService.lowBatteryScooter(),HttpStatus.OK);
	}
	
	@GetMapping("/chargeVehicle")
	public ResponseEntity<String> chargeVehicle(@RequestParam String licensePlate) {
		this.vehicleService.chargeVehicle(licensePlate);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}