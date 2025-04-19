package com.MueveTic.app.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.MueveTic.app.Repositories.AdminDAO;
import com.MueveTic.app.Repositories.PersonalMantDAO;
import com.MueveTic.app.Repositories.UserDAO;
import com.MueveTic.app.Utils.Utilities;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	@Autowired
	private JavaMailSender mailSender;	
	@Autowired
	private UserDAO userRepository;
	@Autowired
	private AdminDAO adminRepository;
	@Autowired
	private PersonalMantDAO personalRepository;
	@Transient
	public Utilities utils = new Utilities();
	
	public String sendResetEmail(String to) throws Exception {
	    MimeMessage message = mailSender.createMimeMessage();
	    MimeMessageHelper helper;
	    var user = userRepository.findByEmail(to);
	    var admin = adminRepository.findByEmail(to);
	    var personal = personalRepository.findByEmail(to);
	    try {
			if(user.isPresent() || admin.isPresent() 
					|| personal.isPresent()) {	
	            helper = new MimeMessageHelper(message, true);
	            helper.setFrom("muevetic1@gmail.com");
	            helper.setTo(to);
	            helper.setSubject("Reset your account");
	            String url="https://muevetic-frontend2023.web.app/reset-pwd?email="+utils.encryptText(to);
	            String texto="Pulsa el botón para resetear tu contraseña:"
	            	+"<a href=\"" + url +"\">"
					+ "<button style=\"padding:10px 20px;background-color:#4CAF50;color:white;border:none;border-radius:5px;cursor:pointer\">"
					+ "Reset Password"
					+ "</button>"
					+ "</a>\r\n";
	            helper.setText(texto, true);
	            mailSender.send(message);
	            return "Reset email sent successfully"; 
	        } else {
	            throw new UsernameNotFoundException("Error when trying to retrieve password " + to);
	        }
	    } catch (MessagingException e) {
	        e.printStackTrace();
	        return "Internal server error";
	    }
	}

	@Async("asyncExecutor")
	public void sendActivationEmail(String to) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper;
		var user = userRepository.findByEmail(to);
		boolean isUser = user.isPresent();
		String url="";
		try {
			if(isUser) {	
				url="https://muevetic.onrender.com/users/activate?email="+utils.encryptText(to);
				helper = new MimeMessageHelper(message, true);
				helper.setFrom("muevetic1@gmail.com");
				helper.setTo(to);
				helper.setSubject("Verify your account");
				String texto = "Pulsa el botón para verificar tu cuenta:"
						+ "<a href=\"" + url +"\">"
						+ "<button style=\"padding:10px 20px;background-color:#4CAF50;color:white;border:none;border-radius:5px;cursor:pointer\">"
						+ "Verify"
						+ "</button>"
						+ "</a>\r\n";
				helper.setText(texto, true);
				mailSender.send(message);
			}else {
				throw new UsernameNotFoundException("Error when trying to retrieve password " + to);
			}
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}