package com.MueveTic.app.Controller;

import java.util.Map;

import javax.management.InvalidAttributeValueException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MueveTic.app.Services.PersonalMantService;
import com.MueveTic.app.Utils.Utilities;

@RestController
@RequestMapping("personal")
@CrossOrigin("*")
public class PersonalMantController {

	@Autowired
	private PersonalMantService personalService;
	private Utilities utils = new Utilities();
	private static final String EMAIL = "email";
	
	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody Map<String, Object> info) throws Exception {
		String emailDecrypted = utils.decryptText(info.get(EMAIL).toString());
		this.personalService.resetPassword(emailDecrypted, info.get("password").toString());
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/deactivate")
	public ResponseEntity<String> deactivate(@RequestBody Map<String, Object> info) {
		try {
			this.personalService.deactivate(info.get(EMAIL).toString());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/activate")
	public ResponseEntity<String> activate(@RequestBody Map<String, Object> info) {
		try {
			this.personalService.activate(info.get(EMAIL).toString());
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/update")
	public ResponseEntity<String> update(@RequestBody Map<String, Object> info){
		try {
			JSONObject jso = new JSONObject(info);
			this.personalService.update(jso);
		}catch (InvalidAttributeValueException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
