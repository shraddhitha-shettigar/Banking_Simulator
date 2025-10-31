package com.bank.alert;
import java.io.*;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;
import com.bank.repository.AccountRepository;

public class NotificationService {

    private final String fromEmail;
    private final String password;

    public NotificationService() {
        String projectDir = "C:\\Users\\DELL\\infosys_springboard\\Banking-Activity-Simulator\\.env";
        Properties props = new Properties();
        try (FileInputStream fis = new FileInputStream(projectDir)) {
            props.load(fis);
        } catch (IOException e) {
            e.printStackTrace();
        }

        this.fromEmail = props.getProperty("GMAIL_USERNAME").trim();
        this.password = props.getProperty("GMAIL_APP_PASSWORD").trim();

        
    }

    private Session getSession() {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
  

        return Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });
    }


    public void sendNotification(String to, String subject, String messageText) {
        try {
            Message message = new MimeMessage(getSession());
            message.setFrom(new InternetAddress(fromEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            message.setSubject(subject);
            message.setText(messageText);

            Transport.send(message);
            
            

            
            System.out.println("Email sent to " + to);

        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Failed to send email to " + to + ": " + e.getMessage());
        }
    }

    public void sendEmailAlert(String senderEmail, String receiverEmail, double amount,
                               String receiverAccount, String senderAccount) {
        String subject = "Transaction Notification";
        AccountRepository accountRepo = new AccountRepository();

        try {
            String senderName = accountRepo.getCustomerNameByAccountNumber(senderAccount);
            String receiverName = accountRepo.getCustomerNameByAccountNumber(receiverAccount);

            
            String senderBank = accountRepo.getByAccountNumber(senderAccount).getBankName();
            String receiverBank = accountRepo.getByAccountNumber(receiverAccount).getBankName();

            
            String senderMsg = "Hi " + senderName + ",\n\n" +
                    "You have successfully sent ₹" + amount +
                    " to account " + receiverAccount + ".\n\n" +
                    "Thank you for banking with " + senderBank + "!\n\n" +
                    "Best regards,\n" +
                    senderBank + " Team";

            String receiverMsg = "Hi " + receiverName + ",\n\n" +
                    "You have received ₹" + amount +
                    " from account " + senderAccount + ".\n\n" +
                    "Thank you for banking with " + receiverBank + "!\n\n" +
                    "Best regards,\n" +
                    receiverBank + " Team";

            if (senderEmail != null)
                sendNotification(senderEmail, subject, senderMsg);
            if (receiverEmail != null)
                sendNotification(receiverEmail, subject, receiverMsg);

        } catch (Exception e) {
            System.out.println("Error sending email alerts: " + e.getMessage());
        }
    }
}
