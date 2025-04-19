package com.MueveTic.app.Security;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class BlackList {
	
	private Map<String, Integer> userLogins; 
	
	public BlackList() {
		this.userLogins = new ConcurrentHashMap<>();
	}
	
	public void addAttempt(String email) {
		if(this.userLogins.get(email) == null) {
			this.userLogins.put(email,1);
		}else {
			this.userLogins.put(email,this.userLogins.get(email)+1);
		}
	}
	
	public void removeUser(String email) {
		this.userLogins.remove(email);
	}
	
	public int getAttempts(String email) {
		return this.userLogins.get(email);
	}
 }