package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "Scooter")
public class Scooter extends Vehicle{
	
	@Field
	@NonNull
	private String color;

	@Transient
	public static final String SEQUENCE_NAME = "scooter_sequence";

	public Scooter(String type, String licensePlate, String model, String address, String color) {
		super(type, licensePlate, model, address);
		this.color = color;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}	
}