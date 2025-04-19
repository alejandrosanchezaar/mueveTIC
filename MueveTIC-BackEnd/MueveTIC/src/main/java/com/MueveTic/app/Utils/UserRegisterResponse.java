package com.MueveTic.app.Utils;

public class UserRegisterResponse {

	private String qrdata;

	public UserRegisterResponse(String qrdata) {
		this.qrdata = qrdata;
	}

	public String getQrdata() {
		return qrdata;
	}

	public void setQrdata(String qrdata) {
		this.qrdata = qrdata;
	}
}