package com.MueveTic.app.Entities;

import java.util.regex.Pattern;

import javax.management.InvalidAttributeValueException;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.userdetails.UserDetails;

import com.MueveTic.app.Utils.Utilities;
import com.mongodb.lang.NonNull;

public abstract class Person implements UserDetails{
	private static final long serialVersionUID = 1L;
	@Id
	@NonNull
	protected int id;
	@Field
	@NonNull
	@Indexed(unique = true)
	protected String email;
	@Field
	@NonNull
	protected String name;
	@Field
	@NonNull
	protected String surname;
	@Field
	@NonNull
	protected String dni;
	@Field
	@NonNull
	protected String password;
	@Field
	@NonNull
	protected byte validation;
	@Field
	@NonNull
	protected String role; 
	@Transient
	protected Utilities utils = new Utilities();

	protected Person(String email, String name, String surname, String dni, String password, String role)
			throws InvalidAttributeValueException {
		this.setEmail(email);
		this.setName(name);
		this.setSurname(surname);
		this.setDni(dni);
		this.setPassword(password);
		this.role = role;
		this.validation = 0;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) throws InvalidAttributeValueException {
		if (this.checkEmail(email)) {
			this.email = email;
		} else {
			throw new InvalidAttributeValueException("Wrong Email format");
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) throws InvalidAttributeValueException {
		if (checkName(name)) {
			this.name = name;
		} else {
			throw new InvalidAttributeValueException("Wrong Name format");
		}
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) throws InvalidAttributeValueException {
		if (checkName(surname)) {
			this.surname = surname;
		} else {
			throw new InvalidAttributeValueException("Wrong Surname format");
		}
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) throws InvalidAttributeValueException {
		if (this.checkDni(dni)) {
			this.dni = dni;
		} else {
			throw new InvalidAttributeValueException("Wrong DNI format");
		}
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public byte getValidation() {
		return validation;
	}

	public void setValidation(byte validation) {
		this.validation = validation;
	}

	
	private boolean checkDni(String dni) {
		if(dni.length() != 9 || !Character.isAlphabetic(dni.charAt(dni.length()-1))) { 
			return false;
		}
		return this.checkLetterDni(dni);
	}

	private boolean checkEmail(String email) {
		return Pattern.compile(Utilities.REGEXEMAIL).matcher(email).find();
	}

	private boolean checkLetterDni(String dni) {
		char[] letters = { 'T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V',
				'H', 'L', 'C', 'K', 'E' };
		int numbers = Integer.parseInt(dni.substring(0, dni.length() - 1));
		return dni.charAt(dni.length() - 1) == letters[(numbers % 23)];
	}
	
	public boolean checkName(String name) {
	    return name.matches(Utilities.REGEXNAME);
	}
}
