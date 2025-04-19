package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "PendingCharging")
public class PendingCharging {
	@Id
	@NonNull
	protected int id;
	@Field
	@NonNull
	@DBRef
	private Vehicle vehicle;
	@Field
	@NonNull
	@DBRef
	private PersonalMant personalMant;
	@Transient
	public static final String SEQUENCE_NAME = "pending_sequence";
	
	public PendingCharging(Vehicle vehicle, PersonalMant personalMant) {
		this.vehicle = vehicle;
		this.personalMant = personalMant;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public Vehicle getVehicle() {
		return vehicle;
	}
	
	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}
	
	public PersonalMant getPersonalMant() {
		return personalMant;
	}
	
	public void setPersonalMant(PersonalMant personalMant) {
		this.personalMant = personalMant;
	}
}
