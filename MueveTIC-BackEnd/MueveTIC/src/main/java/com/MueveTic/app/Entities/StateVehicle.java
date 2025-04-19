package com.MueveTic.app.Entities;

public interface StateVehicle {
	byte DEACTIVATED = 0;
	byte AVAILABLE = 1;
	byte UNAVAILABLE = 2;
	byte RESERVED = 3;
	byte OCCUPIED = 4;
	byte PENDING_CHARGING = 5;
}