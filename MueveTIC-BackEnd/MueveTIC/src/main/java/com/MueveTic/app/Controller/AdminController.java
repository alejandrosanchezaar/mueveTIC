package com.MueveTic.app.Controller;

import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MueveTic.app.Entities.Admin;
import com.MueveTic.app.Entities.Booking;
import com.MueveTic.app.Entities.ConfigParams;
import com.MueveTic.app.Entities.PersonalMant;
import com.MueveTic.app.Entities.User;
import com.MueveTic.app.Services.AdminService;
import com.MueveTic.app.Utils.Utilities;
@RestController
@RequestMapping("admins")
@CrossOrigin("*")
public class AdminController {

	@Autowired
	private AdminService adminService;
	private Utilities utils = new Utilities();
	private static final String EMAIL = "email";
	
	@GetMapping("/consultUsers")
	public List<User> consultUsers(){
		return this.adminService.consultUsers();
	}
	
	@GetMapping("/consultAdmin")
	public List<Admin> consultAdmin(){
		return this.adminService.consultAdministrators();
	}
	
	@GetMapping("/consultPersonalMantenance")
	public List<PersonalMant> consultPersonalMantenance(){
		return this.adminService.consultMantenance();
	}
	
	@GetMapping("/consultReviews")
	public List<User> consultReviews(@RequestParam String vehicleModel) {
		return this.adminService.consultReviews(vehicleModel);
	}
	
	@GetMapping("/consultUserBooking")
	public List<Booking> consultUserBooking(@RequestParam String email, @RequestParam String vehicleModel) {
		return this.adminService.consultUserBooking(email,vehicleModel);
	}
	
	@PostMapping("/update")
	public ResponseEntity<String> update(@RequestBody Map<String, Object> info){
		try {
			JSONObject jso = new JSONObject(info);
			this.adminService.update(jso);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody Map<String, Object> info) throws Exception {
		String emailDecrypted = utils.decryptText(info.get(EMAIL).toString());
		this.adminService.resetPassword(emailDecrypted, info.get("password").toString());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/deactivate")
	public ResponseEntity<String> deactivate(@RequestBody Map<String, Object> info) {
		try {
			this.adminService.deactivate(info.get(EMAIL).toString());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/activate")
	public ResponseEntity<String> activate(@RequestBody Map<String, Object> info) {
		try {
			this.adminService.activate(info.get(EMAIL).toString());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/activateAdmin")
	public ResponseEntity<String> activateAdmin(@RequestBody Map<String, Object> info) {
		try {
			this.adminService.activateAdmin(info.get(EMAIL).toString());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/params")
	public ResponseEntity<ConfigParams> consultConfigParams() {
		return new ResponseEntity<>(this.adminService.consultParams(1),HttpStatus.OK);
	}
	
	@PostMapping("/updateParams")
	public ResponseEntity<String> updateParams(@RequestBody Map<String, Object> info){
		try {
			JSONObject jso = new JSONObject(info);
			this.adminService.updateParams(jso);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
