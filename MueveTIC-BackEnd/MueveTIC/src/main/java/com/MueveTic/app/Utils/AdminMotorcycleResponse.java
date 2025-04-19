package com.MueveTic.app.Utils;

import com.MueveTic.app.Entities.Motorcycle;

public class AdminMotorcycleResponse {

	private Motorcycle vehicle;
	private String rating;
	
	public AdminMotorcycleResponse(Motorcycle vehicle, String rating) {
		this.vehicle = vehicle;
		this.rating = rating;
	}

	public Motorcycle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Motorcycle vehicle) {
		this.vehicle = vehicle;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}
}
