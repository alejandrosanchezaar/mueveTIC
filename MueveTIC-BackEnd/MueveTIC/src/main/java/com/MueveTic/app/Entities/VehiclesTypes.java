package com.MueveTic.app.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

@Document(collection = "VehiclesTypes")
public class VehiclesTypes {
	@Id
	@NonNull
	protected int id;
	@Field
	@NonNull
	@Indexed(unique = true)
	private String type;
	@Transient
	public static final String SEQUENCE_NAME = "vehiclesTypes_sequence";

	public VehiclesTypes(String type) {
		this.type = type;
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
}