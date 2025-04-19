package com.MueveTic.app.Services;

import java.util.List;
import java.util.Optional;

import javax.management.InvalidAttributeValueException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.MueveTic.app.Entities.Booking;
import com.MueveTic.app.Entities.User;
import com.MueveTic.app.Repositories.BookingDAO;
import com.MueveTic.app.Repositories.UserDAO;
import com.MueveTic.app.Utils.Utilities;

@Service
public class UserService {

	@Autowired
	private UserDAO userRepository;
	@Autowired
	private BookingDAO bookingRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	private Utilities utils = new Utilities();
	
	public User consultUser(String email) {
		return this.userRepository.findByEmail(email).get();
	}
	
	public boolean isActive(String email) {
		Boolean result = false;
		Optional<User> user = this.userRepository.findByEmail(email);
		if(user.isPresent() && user.get().getValidation() == 1) {
			result = true;
		}
		return result;
	}

	public void deactivate(String email) {
		var user = this.userRepository.findByEmail(email);
		if (user.isPresent()) {
			if (user.get().getValidation() == 1) {
				user.get().setValidation((byte) 0);
				this.userRepository.save(user.get());
			}
		} else {
			throw new UsernameNotFoundException("User not found");
		}
	}

	public void activate(String email) throws Exception {
		email = utils.decryptText(email);
		var user = this.userRepository.findByEmail(email);
		if (user.isPresent() && (user.get().getValidation() == 0)) {
			user.get().setValidation((byte) 1);
			this.userRepository.save(user.get());
		}
	}
	public void activateUser(String email) throws Exception {
		var user = this.userRepository.findByEmail(email);
		if (user.isPresent() && (user.get().getValidation() == 0)) {
			user.get().setValidation((byte) 1);
			this.userRepository.save(user.get());
		}
	}

	public void resetPassword(String email, String password) throws Exception {
		var user = this.userRepository.findByEmail(email);
		if (user.isPresent() && (user.get().getValidation() == 1)) {
			user.get().setPassword(passwordEncoder.encode(password));
			this.userRepository.save(user.get());
		} else {
			throw new UsernameNotFoundException("Email not found: "+ email);
		}
	}

	public void update(JSONObject jso) throws InvalidAttributeValueException {
	    var user = this.userRepository.findByEmail(jso.get("email").toString());
	    if (user.isPresent()) {
	        User newUser = user.get();
	        try {
	            newUser.setName(jso.get("name").toString());
	            newUser.setSurname(jso.get("surname").toString());
	            newUser.setDni(jso.get("dni").toString());
	            if (jso.has("password") && jso.get("password") != null && !jso.get("password").toString().isEmpty()) {
	                newUser.setPassword(passwordEncoder.encode(jso.get("password").toString()));
	            }
	            newUser.setCarnet(jso.get("carnet").toString());
	            newUser.setNumberPhone(jso.get("numberPhone").toString());
	            newUser.setBirthDate(jso.get("birthDate").toString());
	            this.userRepository.save(newUser);
	        } catch (InvalidAttributeValueException e) {
	            throw new InvalidAttributeValueException("Wrong attribute format");
	        }
	    } else {
	        throw new UsernameNotFoundException("Email not found: " + jso.get("email").toString());
	    }
	}

	public void updateAdmin(JSONObject jso) throws InvalidAttributeValueException {
		var user = this.userRepository.findByEmail(jso.get("email").toString());
		if (user.isPresent()) {
			User newUser = user.get();
			try {
				newUser.setName(jso.get("name").toString());
				newUser.setSurname(jso.get("surname").toString());
				newUser.setDni(jso.get("dni").toString());
				newUser.setCarnet(jso.get("carnet").toString());
				newUser.setNumberPhone(jso.get("numberPhone").toString());
				newUser.setBirthDate(jso.get("birthDate").toString());
				this.userRepository.save(newUser);
			} catch (InvalidAttributeValueException e) {
				throw new InvalidAttributeValueException("Wrong attribute format");
			}
		} else {
			throw new UsernameNotFoundException("Email not found: " + jso.get("email").toString());
		}
	}

	public void delete(String email) {
		Optional<User> oU = this.userRepository.findByEmail(email);
		User u = null;
		if(oU.isPresent()) {
			u = oU.get();
			List<Booking> allBookings = this.bookingRepository.findByUser(u);
			for(Booking booking : allBookings) {
				booking.getUser().setId(0);
				this.bookingRepository.save(booking);
			}
			this.userRepository.delete(u);
		}
	}
}