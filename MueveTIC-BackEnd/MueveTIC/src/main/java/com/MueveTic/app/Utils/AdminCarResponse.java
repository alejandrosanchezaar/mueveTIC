package com.MueveTic.app.Utils;

import com.MueveTic.app.Entities.Car;

public class AdminCarResponse {
	
	private Car vehicle;
	private String rating;
	
	public AdminCarResponse(Car vehicle, String rating) {
		this.vehicle = vehicle;
		this.rating = rating;
	}

	public Car getVehicle() {
		return vehicle;
	}

	public void setVehicle(Car vehicle) {
		this.vehicle = vehicle;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}
}