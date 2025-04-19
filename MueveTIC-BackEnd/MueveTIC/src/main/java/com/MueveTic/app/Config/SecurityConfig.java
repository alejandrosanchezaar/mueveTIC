package com.MueveTic.app.Config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.MueveTic.app.Jwt.JwtAuthenticationFilter;

import jakarta.servlet.Filter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, 
    		@Autowired AuthenticationProvider authProvider, 
    		@Autowired JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception
    {
        return http
            .csrf(csrf -> 
                csrf.disable())
            .cors()
            .and()
            .authorizeHttpRequests(authRequest ->
              authRequest
                /*.requestMatchers("/admins/*").hasRole("ADMIN")
                .requestMatchers("/bookings/createBooking").hasRole("USER")
                .requestMatchers("/bookings/cancelUserBooking").hasRole("USER")
                .requestMatchers("/bookings/confirmBooking").hasRole("USER")
                .requestMatchers("/bookings/consultUserBooking").hasRole("USER")
                .requestMatchers("/bookings/consultHistoryUserBooking").hasRole("USER")
                .requestMatchers("/bookings/consultAllPersonsWithBookings").hasRole("ADMIN")
                .requestMatchers("/bookings/consultBooking").hasRole("ADMIN")
                .requestMatchers("/bookings/consultFacturation").hasRole("ADMIN")
                .requestMatchers("/bookings/consultFacturationCar").hasRole("ADMIN")
                .requestMatchers("/bookings/consultFacturationScooter").hasRole("ADMIN")
                .requestMatchers("/pendingCharging/*").hasRole("MANTENANCE")
                .requestMatchers("/personal/*").hasRole("ADMIN")
                .requestMatchers("/person/register-admin").hasRole("ADMIN")
                .requestMatchers("/person/register-mantenance").hasRole("ADMIN")
                .requestMatchers("/users/consultUser").hasRole("USER")
                .requestMatchers("/users/deactivate").hasRole("ADMIN")
                .requestMatchers("/users/delete").hasRole("USER")
                .requestMatchers("/users/update").hasRole("USER")
                .requestMatchers("/users/updateAdmin").hasRole("ADMIN")
                .requestMatchers("/vehicle/consultRatingCar").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/vehicle/consultRatingScooter").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/vehicle/consultRatingMotorcycle").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/vehicle/consultVehicle").hasRole("ADMIN")
                .requestMatchers("/vehicle/getAllCars").hasRole("ADMIN")
                .requestMatchers("/vehicle/getAllMotorcycle").hasRole("ADMIN")
                .requestMatchers("/vehicle/getAllScooter").hasRole("ADMIN")
                .requestMatchers("/vehicle/addVehicle").hasRole("ADMIN")
                .requestMatchers("/vehicle/update").hasRole("ADMIN")
                .requestMatchers("/vehicle/removeVehicle").hasRole("ADMIN")
                .requestMatchers("/vehicle/availableCar").hasRole("USER")
                .requestMatchers("/vehicle/availableScooter").hasRole("USER")
                .requestMatchers("/vehicle/availableMotorcycle").hasRole("USER")
                .requestMatchers("/vehicle/lowBatteryCar").hasRole("MANTENANCE")
                .requestMatchers("/vehicle/lowBatteryMotorcycle").hasRole("MANTENANCE")
                .requestMatchers("/vehicle/lowBatteryScooter").hasRole("MANTENANCE")
                .requestMatchers("/vehicle/chargeVehicle").hasRole("MANTENANCE")
                .requestMatchers("/vehiclesType/*").hasRole("ADMIN")*/
                .anyRequest().permitAll()
                )
            .sessionManagement(sessionManager->
                sessionManager 
                  .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authProvider)
            .addFilterBefore((Filter) jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}