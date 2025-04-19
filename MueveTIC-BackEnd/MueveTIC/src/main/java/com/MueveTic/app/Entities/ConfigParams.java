package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "ConfigParams")
public class ConfigParams{
	@Id
	@NonNull
	private int id;
	@Field
	@NonNull
	private int minBatteryPerTrip;
	@Field
	@NonNull
	private int maxVehiclesCharging;
	@Field
	@NonNull
	private int facturationPerTrip;
	@Field
	@NonNull
	private int batteryPerTrip;
	
	public ConfigParams(int minBatteryPerTrip, int maxVehiclesCharging, int facturationPerTrip,int batteryPerTrip) {
		this.minBatteryPerTrip = minBatteryPerTrip;
		this.maxVehiclesCharging = maxVehiclesCharging;
		this.facturationPerTrip = facturationPerTrip;
		this.batteryPerTrip = batteryPerTrip;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getMinBatteryPerTrip() {
		return minBatteryPerTrip;
	}

	public void setMinBatteryPerTrip(int minBatteryPerTrip) {
		this.minBatteryPerTrip = minBatteryPerTrip;
	}

	public int getMaxVehiclesCharging() {
		return maxVehiclesCharging;
	}

	public void setMaxVehiclesCharging(int maxVehiclesCharging) {
		this.maxVehiclesCharging = maxVehiclesCharging;
	}

	public int getFacturationPerTrip() {
		return facturationPerTrip;
	}

	public void setFacturationPerTrip(int facturationPerTrip) {
		this.facturationPerTrip = facturationPerTrip;
	}

	public int getBatteryPerTrip() {
		return batteryPerTrip;
	}

	public void setBatteryPerTrip(int batteryPerTrip) {
		this.batteryPerTrip = batteryPerTrip;
	}
}