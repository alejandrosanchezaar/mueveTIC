package com.MueveTic.app.Utils;

public class AdminRatingResponse {
	
	private String model;
	private int mean;
	
	public AdminRatingResponse(String model, int rating, int nTimes) {
		this.model = model;
		this.mean = (int) rating/nTimes;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getMean() {
		return mean;
	}
	public void setMean(int mean) {
		this.mean = mean;
	}
}