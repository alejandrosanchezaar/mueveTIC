package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "Booking")
public class Booking implements StateBooking{
	@Id
	@NonNull
	private int id;
	@Field
	@NonNull
	private byte state;
	@Field
	@NonNull
	private String date;
	@Field
	@NonNull
	@DBRef
	private User user;
	@Field
	@NonNull
	@DBRef
	private Vehicle vehicle;
	@Field
	private byte rating;
	@Field
	@NonNull
	private String comment;
	@Field
	@NonNull
	private int price;
	@Transient
	public static final String SEQUENCE_NAME = "booking_sequence";
	
	public Booking(String date, User user, Vehicle vehicle) {
		this.date = date;
		this.user = user;
		this.vehicle = vehicle;
		this.state = ACTIVE;
		this.rating = 0;
		this.comment = "";
		this.price = 0;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public byte getRating() {
		return rating;
	}

	public void setRating(byte rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
	public byte getState() {
		return state;
	}
	
	public void setCancelled() {
		this.state = CANCELLED;
	}
	
	public void setHistorical() {
		this.state = HISTORICAL;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
}