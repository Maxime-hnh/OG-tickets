package com.studi.OG_tickets.services;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@AllArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;

  public String generateAlphaNumericCode() {
    SecureRandom random = new SecureRandom();
    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 6; i++) {
      int index = random.nextInt(characters.length());
      sb.append(characters.charAt(index));
    }
    return sb.toString();
  }

  public void send2FAMail(String to, String code) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("noreply.kodana@gmail.com");
    message.setTo(to);
    message.setSubject("Confirmation de votre identité");
    message.setText("Bonjour, veuillez saisir le code suivant pour confirmer votre identité : " + code);
    mailSender.send(message);
  }

}
