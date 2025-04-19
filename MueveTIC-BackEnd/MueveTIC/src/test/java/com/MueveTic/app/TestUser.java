package com.MueveTic.app;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.json.JSONObject;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
class TestUser {
	// Servidor_falso de_pruebas.
	@Autowired
	private MockMvc server;
	
	private static final String ROLE_USER = "ROLE_USER";
	
	private static final String NAME = "Elsa";
	private static final String SURNAME = "Alegre";
	private static final String CONTRASENA = "Contrasena123$";
	private static final String DNI = "46925381E";
	private static final String PHONE_NUMBER = "723344567";
	private static final String CARNET = "B";
	private static final String BIRTHDATE = "21/11/2000";
	
	private static final String WRONG_EMAIL = "alberto-gmail.com";
	private static final String WRONG_DNI = "46925381T";
	private static final String WRONG_PASS = "contrasena";
	private static final String WRONG_PHONE_NUMBER = "122345678";
	
	@Test @Order(1)
	void testRegisterDNI() throws Exception{
		
		ResultActions OkeyData = this.sendRegister("Maria@gmail.com","María Aurora","Solís Galán","12345678Z",
				CONTRASENA,ROLE_USER,CARNET,"676845791",BIRTHDATE);
		OkeyData.andExpect(status().isCreated());
		
		ResultActions OkeyData1 = this.sendRegister("aurora@gmail.com","Aurora","García Fajín","87654321X",
				CONTRASENA,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		OkeyData1.andExpect(status().isCreated());
		
		ResultActions WrongData1 = this.sendRegister("joseEnrique@gmail.com","Jose Enrique","Olmo","12345P",
				CONTRASENA,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData1.andExpect(status().isConflict());
	}

	@Test
	@Order(2)
	void testRegisterPassword() throws Exception {
		ResultActions OkeyData = this.sendRegister("Izaskun@gmail.com","Izaskun","Huerta Sánchez","26349871J",
				CONTRASENA,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		OkeyData.andExpect(status().isCreated());
		
		ResultActions WrongData = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"contra",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData.andExpect(status().isConflict());
		
		ResultActions WrongData1 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				WRONG_PASS,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData1.andExpect(status().isConflict());
		
		ResultActions WrongData2 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"contrasena123",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData2.andExpect(status().isConflict());
		
		ResultActions WrongData3 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"CONTRASENA",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData3.andExpect(status().isConflict());
		
		ResultActions WrongData4 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"CONTRASENA123",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData4.andExpect(status().isConflict());
		
		ResultActions WrongData5 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"contrasena$",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData5.andExpect(status().isConflict());
		
		ResultActions WrongData6 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"CONTRASENA&",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData6.andExpect(status().isConflict());
		
		ResultActions WrongData7 = this.sendRegister(WRONG_EMAIL,NAME,SURNAME,WRONG_DNI,
				"contrasena1$",ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData7.andExpect(status().isConflict());
	}
	
	@Test @Order(3)
	void testRegisterTelephone() throws Exception{
		
		ResultActions OkeyData = this.sendRegister("antonioRe@gmail.com","Antonio","Perez Reverte","12345678Z",
				CONTRASENA,ROLE_USER,CARNET,"612121212",BIRTHDATE);
		OkeyData.andExpect(status().isCreated());
		
		ResultActions WrongData1 = this.sendRegister("fernando@gmail.com",NAME,SURNAME,DNI,
				CONTRASENA,ROLE_USER,CARNET,"812121212",BIRTHDATE);
		WrongData1.andExpect(status().isConflict());
		
		ResultActions WrongData2 = this.sendRegister("daniel@gmail.com",NAME,SURNAME,DNI,
				CONTRASENA,ROLE_USER,CARNET,"6121212122",BIRTHDATE);
		WrongData2.andExpect(status().isConflict());
	}
	
	@Test @Order(4)
	void testRegisterEmail() throws Exception{
		
		ResultActions OkeyData = this.sendRegister("Antonio@gmail.com","Antonio","Perez Perez","63548799Y",
				CONTRASENA,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		OkeyData.andExpect(status().isCreated());
		
		ResultActions WrongData1 = this.sendRegister("fernandogmail.com",NAME,SURNAME,DNI,
				CONTRASENA,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData1.andExpect(status().isConflict());
		
		ResultActions WrongData2 = this.sendRegister("daniel@gmailcom",NAME,SURNAME,DNI,
				CONTRASENA,ROLE_USER,CARNET,PHONE_NUMBER,BIRTHDATE);
		WrongData2.andExpect(status().isConflict());
	}

	@Test
	@Order(5)
	void nameTest() throws Exception {
		ResultActions OkeyName = this.sendRegister("pedro12@gmail.com", "Pedro", "Salguero Villar", "71282339A",

				CONTRASENA, ROLE_USER, CARNET, PHONE_NUMBER, BIRTHDATE);
		OkeyName.andExpect(status().isCreated());

		ResultActions WrongName = this.sendRegister("pepe@gmail.com", "pepe", SURNAME,DNI,
				CONTRASENA, ROLE_USER, CARNET, WRONG_PHONE_NUMBER, BIRTHDATE);
		WrongName.andExpect(status().isConflict());

		ResultActions WrongName2 = this.sendRegister("pepe@gmail.com", "Pepe1", SURNAME,DNI,
				CONTRASENA, ROLE_USER, CARNET, WRONG_PHONE_NUMBER, BIRTHDATE);
		WrongName2.andExpect(status().isConflict());
	}

	@Test
	@Order(6)
	void surnameTest() throws Exception {

		ResultActions OkeySurname = this.sendRegister("LuisDi@gmail.com",NAME,"Diaz Sanchez","96532148K",
				CONTRASENA, ROLE_USER, CARNET, PHONE_NUMBER, BIRTHDATE);
		OkeySurname.andExpect(status().isCreated());

		ResultActions WrongSurname = this.sendRegister("pepito@gmail.com",NAME,"Jimenez Gonzalez",DNI,
				CONTRASENA, ROLE_USER, CARNET, WRONG_PHONE_NUMBER, BIRTHDATE);
		WrongSurname.andExpect(status().isConflict());
	}
	
	@Test @Order(7)
	void deactivateUser() throws Exception {
		ResultActions OkeyDeactivate = this.sendDeactivateUser("LuisDi@gmail.com");
		OkeyDeactivate.andExpect(status().isOk());
		
		ResultActions OkeyDeactivate1 = this.sendDeactivateUser("Izaskun@gmail.com");
		OkeyDeactivate1.andExpect(status().isOk());
		
		ResultActions WrongDeactivate = this.sendDeactivateUser("usuarioInexistente@gmail.com");
		WrongDeactivate.andExpect(status().isConflict());
	}
	
	@Test @Order(8)
	void deleteUsers() throws Exception {
		String [] emails = {"Maria@gmail.com","aurora@gmail.com","Izaskun@gmail.com"
				,"antonioRe@gmail.com","Antonio@gmail.com","pedro12@gmail.com","LuisDi@gmail.com"};
		for(int i = 0; i < emails.length; i++) {
			JSONObject jsoUser = new JSONObject()
					.put("email",emails[i]);
			RequestBuilder requestDelete = MockMvcRequestBuilders
					.put("/users/delete")
					.contentType("application/json")
					.content(jsoUser.toString());
			this.server.perform(requestDelete).andExpect(status().isOk());
		}
	}
	
	private ResultActions sendRegister(String email, String name, String surname, String dni, String password, String role, String carnet, String numberPhone, String birthDate) 
			throws Exception {
		JSONObject jsoUser = new JSONObject()
				.put("email",email)
				.put("name",name)
				.put("surname", surname)
				.put("dni", dni)
				.put("password", password)
				.put("role", role)
				.put("carnet", carnet)
				.put("numberPhone", numberPhone)
				.put("birthDate", birthDate);
		
		RequestBuilder request = MockMvcRequestBuilders
				.post("/person/register")
				.contentType("application/json")
				.content(jsoUser.toString());
		return this.server.perform(request);
	}
	private ResultActions sendDeactivateUser(String email) throws Exception {
		JSONObject jsoUser = new JSONObject()
				.put("email",email);
		RequestBuilder requestactivate = MockMvcRequestBuilders
				.get("/users/activate/?email="+email)
				.contentType("application/json");
		this.server.perform(requestactivate);
		RequestBuilder requestDeactivate = MockMvcRequestBuilders
				.put("/users/deactivate")
				.contentType("application/json")
				.content(jsoUser.toString());
		return this.server.perform(requestDeactivate);
	}
}