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

@Document(collection = "Admin")
public class Admin extends Person{
	private static final long serialVersionUID = 1L;
	@Field
	@NonNull
	private String city;
	@Transient
	public static final String SEQUENCE_NAME = "admin_sequence";

	public Admin(String email, String name, String surname, String dni, String password, String role, String city)
			throws InvalidAttributeValueException {
		super(email, name, surname, dni, password, role);
		this.city = city;
		this.validation = 1;
	}
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
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
