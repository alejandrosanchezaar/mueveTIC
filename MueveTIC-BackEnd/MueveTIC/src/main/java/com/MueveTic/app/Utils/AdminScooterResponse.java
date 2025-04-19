package com.MueveTic.app.Utils;

import com.MueveTic.app.Entities.Scooter;

public class AdminScooterResponse {

	private Scooter vehicle;
	private String rating;
	
	public AdminScooterResponse(Scooter vehicle, String rating) {
		this.vehicle = vehicle;
		this.rating = rating;
	}

	public Scooter getVehicle() {
		return vehicle;
	}

	public void setVehicle(Scooter vehicle) {
		this.vehicle = vehicle;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}
}