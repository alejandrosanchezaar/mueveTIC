package com.MueveTic.app.Entities;

import java.util.Collection;
import java.util.List;

import javax.management.InvalidAttributeValueException;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.mongodb.lang.NonNull;

@Document(collection = "User")
public class User extends Person{
	private static final long serialVersionUID = 1L;
	@Transient
	public static final String SEQUENCE_NAME="user_sequence";
	@Field
	@NonNull
	private String carnet;
	@Field
	@NonNull
	private String numberPhone;
	@Field
	@NonNull
	private String birthDate;
	@Field
	@NonNull
	private String tfaSecret;

	public User(String email, String name, String surname, String dni, String password, String role, String carnet, String numberPhone,String birthDate) 
			throws InvalidAttributeValueException {
		super(email, name, surname, dni, password, role);
		this.carnet = carnet;
		this.setNumberPhone(numberPhone);
		this.birthDate = birthDate;
	}

	public String getCarnet() {
		return carnet;
	}

	public void setCarnet(String carnet) {
		this.carnet = carnet;
	}

	public String getNumerPhone() {
		return numberPhone;
	}

	public void setNumberPhone(String numberPhone) throws InvalidAttributeValueException {
		if (this.checkNumberPhone(numberPhone)) {
			this.numberPhone = numberPhone;
		} else {
			throw new InvalidAttributeValueException("Wrong Number Phone Format");
		}
	}

	private boolean checkNumberPhone(String numberPhone) {
		String aux = numberPhone.replace(" ", "");
		boolean firstNumber = numberPhone.charAt(0) == '6' || numberPhone.charAt(0) == '7';
		return aux.length() == 9 && utils.isNumeric(aux) && firstNumber;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
	public String getTfaSecret() {
		return tfaSecret;
	}

	public void setTfaSecret(String tfaSecret) {
		this.tfaSecret = tfaSecret;
	}

	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of(new SimpleGrantedAuthority((this.role)));
    }
	
	@Override
	public String getUsername() {
		return this.email;
	}
	
    @Override
    public boolean isAccountNonExpired() {
       return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
       return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return true;
    }
}