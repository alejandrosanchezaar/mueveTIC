package com.MueveTic.app.Services;

import com.MueveTic.app.Entities.PersonalMant;
import com.MueveTic.app.Repositories.PersonalMantDAO;
import com.MueveTic.app.Utils.Utilities;

import java.util.Optional;

import javax.management.InvalidAttributeValueException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonalMantService {

	@Autowired
	private PersonalMantDAO personalRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	private Utilities utils = new Utilities();
	
	public boolean isActive(String email) {
		Boolean result = false;
		Optional<PersonalMant> user = this.personalRepository.findByEmail(email);
		if(user.isPresent() && user.get().getValidation() == 1) {
			result = true;
		}
		return result;
	} 

	public void deactivate(String email) {
		var personal = this.personalRepository.findByEmail(email);
		if (personal.isPresent() && (personal.get().getValidation() == 1)) {
			personal.get().setValidation((byte) 0);
			this.personalRepository.save(personal.get());
		}
	}

	public void activate(String email) throws Exception {
		email = utils.decryptText(email);
		var personal = this.personalRepository.findByEmail(email);
		if (personal.isPresent() && (personal.get().getValidation() == 0)) {
			personal.get().setValidation((byte) 1);
			this.personalRepository.save(personal.get());
		}	
	}
	
	public void resetPassword(String email, String password) {
		var personal = this.personalRepository.findByEmail(email);
		if (personal.isPresent() &&  (personal.get().getValidation() == 1)) {
			personal.get().setPassword(passwordEncoder.encode(password));
			this.personalRepository.save(personal.get());
		}else {
			throw new UsernameNotFoundException("Email not found: " + email);
		}
	}
	
	public void update(JSONObject jso) throws InvalidAttributeValueException {
		var personal = this.personalRepository.findByEmail(jso.get("email").toString());
		if(personal.isPresent()) {
			PersonalMant newPersonal = personal.get();
			try {
				newPersonal.setName(jso.get("name").toString());
				newPersonal.setSurname(jso.get("surname").toString());
				newPersonal.setDni(jso.get("dni").toString());
				newPersonal.setPassword(jso.get("password").toString());
				newPersonal.setCarnet(jso.get("carnet").toString());
				newPersonal.setExperience(Integer.parseInt(jso.get("experience").toString()));
				newPersonal.setCity(jso.get("city").toString());
				this.personalRepository.save(newPersonal);
			} catch (InvalidAttributeValueException e) {
				throw new InvalidAttributeValueException("Wrong attribute format"); 
			}
		}else {
			throw new UsernameNotFoundException("Email not found: " + jso.get("email").toString());
		}
	}
}