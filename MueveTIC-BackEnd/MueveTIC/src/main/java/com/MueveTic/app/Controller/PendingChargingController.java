package com.MueveTic.app.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MueveTic.app.Entities.PendingCharging;
import com.MueveTic.app.Services.PendingChargingService;

@RestController
@RequestMapping("pendingCharging")
@CrossOrigin("*")
public class PendingChargingController {
	
	@Autowired
	private PendingChargingService pendingChargingService;

	@PostMapping("/reserveChargingVehicle")
	public ResponseEntity<String> reserveChargingVehicle(@RequestBody Map<String,Object> info) {
		try {
			this.pendingChargingService.reserveChargingVehicle(info.get("licensePlate").toString(),info.get("email").toString());
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/consultPendingChargingVehicle")
	public ResponseEntity<List<PendingCharging>> consultPendingChargingVehicle(@RequestParam String email) {
		return new ResponseEntity<>(this.pendingChargingService.consultPendingChargingVehicle(email),HttpStatus.OK);
	}
	
	@GetMapping("/removePendingChargingVehicle")
	public ResponseEntity<String> removePendingChargingVehicle(@RequestParam String email,@RequestParam String licensePlate) {
		this.pendingChargingService.removePendingChargingVehicle(licensePlate,email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/removeChargeVehicle")
	public ResponseEntity<String> removeChargeVehicle(@RequestParam String email,@RequestParam String licensePlate) {
		this.pendingChargingService.removeChargeVehicle(licensePlate,email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}