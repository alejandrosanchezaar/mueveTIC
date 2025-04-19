package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;
import com.mongodb.lang.NonNull;

public abstract class Vehicle implements StateVehicle{
	@Id
	@NonNull
	protected int id;
	@Field
	@NonNull
	protected String type;
	@Field
	@NonNull
	@Indexed(unique = true)
	protected String licensePlate;
	@Field
	@NonNull
	protected String model;
	@Field
	@NonNull
	protected String address;
	@Field
	@NonNull
	protected int battery;
	@Field
	@NonNull
	protected byte state;
	
	protected Vehicle(String type, String licensePlate, String model, String address) {
		this.type = type;
		this.licensePlate = licensePlate;
		this.model = model;
		this.address = address;
		this.battery = 100;
		this.state = StateVehicle.AVAILABLE;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public String getLicensePlate() {
		return licensePlate;
	}
	
	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}
	
	public String getModel() {
		return model;
	}
	
	public void setModel(String model) {
		this.model = model;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public int getBattery() {
		return battery;
	}
	
	public void setBattery(int battery) {
		this.battery = battery;
	}

	public boolean isDeactivated() {
		return this.state == DEACTIVATED;
	}
	
	public void deactivateVehicle() {
		this.state = StateVehicle.DEACTIVATED;
	}
	
	public boolean isAvailable() {
		return this.state == AVAILABLE;
	}
	
	public void setAvailable() {
		this.state = StateVehicle.AVAILABLE;
	}
	
	public boolean isUnAvailable() {
		return this.state == UNAVAILABLE;
	}
	
	public void setUnAvailable() {
		this.state = StateVehicle.UNAVAILABLE;
	}
	
	public boolean isReserved() {
		return this.state == RESERVED;
	}
	
	public void setReserved() {
		this.state = StateVehicle.RESERVED;
	}
	
	public boolean isOcupied() {
		return this.state == OCCUPIED;
	}
	
	public void setOccupied() {
		this.state = StateVehicle.OCCUPIED;
	}
	
	public boolean isPendingCharging() {
		return this.state == PENDING_CHARGING;
	}
	
	public void setPendingCharging() {
		this.state = StateVehicle.PENDING_CHARGING;
	}
}