package com.MueveTic.app.Services;

import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.management.InvalidAttributeValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.MueveTic.app.Entities.Admin;
import com.MueveTic.app.Entities.Person;
import com.MueveTic.app.Entities.PersonalMant;
import com.MueveTic.app.Entities.User;
import com.MueveTic.app.Jwt.JwtService;
import com.MueveTic.app.Repositories.AdminDAO;
import com.MueveTic.app.Repositories.PersonalMantDAO;
import com.MueveTic.app.Repositories.UserDAO;
import com.MueveTic.app.Utils.AuthResponse;
import com.MueveTic.app.Utils.UserRegisterResponse;
import com.MueveTic.app.Utils.Utilities;

@Service
public class PersonService {
	@Autowired
	private JwtService jwtService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDAO userRepository;
	@Autowired
	private AdminDAO adminRepository;
	@Autowired
	private PersonalMantDAO personalMantRepository;
	@Autowired
	private SequenceGeneratorService seqGenerator;
	@Autowired
	private EmailService emailService;
	@Autowired
	private TwoFactorAuth twoFactorAuth;

	private static final String EMAIL = "email";
	private static final String PASSWORD = "password";
	private static final String SURNAME = "surname";
	private static final String PASSWORDMESSAGE = "Wrong password format";

	public void registerAdmin(Map<String, Object> info) throws InvalidAttributeValueException {
		String email = info.get(EMAIL).toString();
		if (checkPassword(info.get(PASSWORD).toString())) {
			if (!checkRepeated(email)) {
				Admin admin = new Admin(email, info.get("name").toString(), info.get(SURNAME).toString(),
						info.get("dni").toString(), passwordEncoder.encode(info.get(PASSWORD).toString()),
						info.get("role").toString(), info.get("city").toString());
				admin.setId(seqGenerator.getSequenceNumber(Admin.SEQUENCE_NAME));
				admin.setValidation((byte) 1);
				adminRepository.save(admin);
			} else {
				throw new DuplicateKeyException("Person already registered");
			}
		} else {
			throw new InvalidAttributeValueException(PASSWORDMESSAGE);
		}
	}

	public UserRegisterResponse registerUser(Map<String, Object> info) throws Exception {
		String email = info.get(EMAIL).toString();
		String secret = "";
		if (checkPassword(info.get(PASSWORD).toString())) {
			if (!checkRepeated(email)) {
				secret = twoFactorAuth.generateNewSecret();
				User user = new User(email, info.get("name").toString(), info.get(SURNAME).toString(),
						info.get("dni").toString(), passwordEncoder.encode(info.get(PASSWORD).toString()),
						info.get("role").toString(), info.get("carnet").toString(), info.get("numberPhone").toString(),
						info.get("birthDate").toString());
				user.setId(seqGenerator.getSequenceNumber(User.SEQUENCE_NAME));
				user.setTfaSecret(secret);
				userRepository.save(user);
				emailService.sendActivationEmail(email);
			} else {
				throw new DuplicateKeyException("Person already registered");
			}
		} else {
			throw new InvalidAttributeValueException(PASSWORDMESSAGE);
		}
		return new UserRegisterResponse(twoFactorAuth.generateQrCodeImageUri(secret));
	}

	public void registerMantenance(Map<String, Object> info)
			throws InvalidAttributeValueException, NumberFormatException {
		String email = info.get(EMAIL).toString();
		if (checkPassword(info.get(PASSWORD).toString())) {
			if (!checkRepeated(email)) {
				PersonalMant mantenance = new PersonalMant(email, info.get("name").toString(),
						info.get(SURNAME).toString(), info.get("dni").toString(),
						passwordEncoder.encode(info.get(PASSWORD).toString()), info.get("role").toString(),
						info.get("carnet").toString(), Integer.parseInt(info.get("experience").toString()),
						info.get("city").toString());
				mantenance.setId(seqGenerator.getSequenceNumber(PersonalMant.SEQUENCE_NAME));
				mantenance.setValidation((byte) 1);
				personalMantRepository.save(mantenance);
			} else {
				throw new DuplicateKeyException("Person already registered");
			}
		} else {
			throw new InvalidAttributeValueException(PASSWORDMESSAGE);
		}
	}
	
	public AuthResponse accessLogin(String email, String password) {
		AuthResponse au = null;
		if(!verifyIdentity(email)) {
			au = login(email,password);
		}else {
			au = userLogin(email,password);
		}
		return au;
	}
	
	public AuthResponse login(String email, String password) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
		Person person = this.searchPerson(email);
		return new AuthResponse(jwtService.getToken(person), person.getRole());
	}
	
	public AuthResponse userLogin(String email, String password) {
		AuthResponse au = new AuthResponse();
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password)).isAuthenticated();
		return au;
	}
	
	public AuthResponse verifyCode(Map<String, Object> info) {
		User user = null;
		Optional<User> optionalUser = this.userRepository.findByEmail(info.get("email").toString());
		if(optionalUser.isPresent()) {
			user = optionalUser.get();
			if(!twoFactorAuth.isOtpValid(user.getTfaSecret(), info.get("code").toString())) {
				throw new BadCredentialsException("Code is not correct");
			}
		}else {
			throw new BadCredentialsException("User not found");
		}
		return new AuthResponse(jwtService.getToken(user), user.getRole());
	}

	public Person searchPerson(String email) {
		var user = userRepository.findByEmail(email);
		var admin = adminRepository.findByEmail(email);
		var mantenance = personalMantRepository.findByEmail(email);
		if (user.isEmpty() && admin.isEmpty() && mantenance.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "User doesn't exists");
		}
		if (user.isPresent() && user.get().getValidation() == 1) {
			return user.get();
		} else if (admin.isPresent() && admin.get().getValidation() == 1) {
			return admin.get();
		} else if (mantenance.isPresent() && mantenance.get().getValidation() == 1) {
			return mantenance.get();
		}
		return null;
	}
	
	private boolean verifyIdentity(String email) {
		return this.searchPerson(email) instanceof User;
	}
	
	private boolean checkRepeated(String email) {
		return this.adminRepository.findByEmail(email).isPresent() || this.userRepository.findByEmail(email).isPresent() 
				|| this.personalMantRepository.findByEmail(email).isPresent();
	}

	private boolean checkPassword(String password) {
		return password.length() >= 8 && Pattern.compile(Utilities.REGEXCHEKPASS).matcher(password).matches();
	}
}