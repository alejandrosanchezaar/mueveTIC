package com.MueveTic.app;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.json.JSONObject;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.junit.jupiter.api.Order;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
public class TestChargeVehicles {

	@Autowired
	private MockMvc server;
	
	@Test
	@Order(1)
	void chargeVehicle() throws Exception {
		this.addLowBatteryVehicle();
		RequestBuilder requestChargeVehicle = MockMvcRequestBuilders
				.get("/vehicle/chargeVehicle?licensePlate=971XDP")
				.contentType("application/json");
		this.server.perform(requestChargeVehicle);
		RequestBuilder requestVehicle = MockMvcRequestBuilders
				.get("/vehicle/consultVehicle?licensePlate=971XDP")
				.contentType("application/json");
		JSONObject jsonVehicle = new JSONObject(this.server.perform(requestVehicle).andReturn().getResponse().getContentAsString());
		assertTrue(Integer.parseInt(jsonVehicle.get("battery").toString()) == 100);
		assertTrue(Boolean.parseBoolean(jsonVehicle.get("available").toString()) == true);
	}
	
	private void addLowBatteryVehicle() throws Exception {
		JSONObject jsoVehicle = new JSONObject()
				.put("type","car")
				.put("licensePlate","971XDP")
				.put("model","Nissan GTR")
				.put("address","C/Terreras, 9")
				.put("nSeats",4);
		RequestBuilder requestAddVehicle = MockMvcRequestBuilders
				.post("/vehicle/addVehicle")
				.contentType("application/json")
				.content(jsoVehicle.toString());
		this.server.perform(requestAddVehicle);
		RequestBuilder requestdischargeVehicle = MockMvcRequestBuilders
				.get("/vehicle/dischargeVehicle?licensePlate=971XDP")
				.contentType("application/json");
		this.server.perform(requestdischargeVehicle);
	}
}