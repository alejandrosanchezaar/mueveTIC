package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "Motorcycle")
public class Motorcycle extends Vehicle{
	
	@Field
	@NonNull
	private boolean helmet;
	
	@Transient
	public static final String SEQUENCE_NAME = "motorcycle_sequence";
	
	public Motorcycle(String type, String licensePlate, String model, String address,	boolean helmet) {
		super(type, licensePlate, model, address);
		this.helmet = helmet;
	}
	public boolean isHelmet() {
		return helmet;
	}
	public void setHelmet(boolean helmet) {
		this.helmet = helmet;
	}
}