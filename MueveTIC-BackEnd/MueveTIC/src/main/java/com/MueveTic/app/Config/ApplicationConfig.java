package com.MueveTic.app.Config;

import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.MueveTic.app.Repositories.AdminDAO;
import com.MueveTic.app.Repositories.PersonalMantDAO;
import com.MueveTic.app.Repositories.UserDAO;

@Configuration
public class ApplicationConfig {
	
	@Autowired
	private UserDAO userRepository;
	@Autowired
	private AdminDAO adminRepository;
	@Autowired
	private PersonalMantDAO personalRepository;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
    {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider authenticationProvider= new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public UserDetailsService userDetailService() {
    	return username -> 
	    	Stream.of(this.userRepository.findByEmail(username),this.adminRepository.findByEmail(username),this.personalRepository.findByEmail(username))
            .filter(v -> v.isPresent())
            .findFirst()
            .orElseThrow(() -> new UsernameNotFoundException("Person not found: " + username))
            .get();
    }
}
