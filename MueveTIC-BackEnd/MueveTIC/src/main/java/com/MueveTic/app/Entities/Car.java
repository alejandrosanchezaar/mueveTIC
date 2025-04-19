package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "Car")
public class Car extends Vehicle{
	
	@Field
	@NonNull
	private int nSeats;
	@Transient
	public static final String SEQUENCE_NAME = "car_sequence";
	
	public Car(String type, String licensePlate, String model, String address, int nSeats) {
		super(type, licensePlate, model, address);
		this.nSeats = nSeats;
	}

	public int getnSeats() {
		return nSeats;
	}

	public void setnSeats(int nSeats) {
		this.nSeats = nSeats;
	}
}