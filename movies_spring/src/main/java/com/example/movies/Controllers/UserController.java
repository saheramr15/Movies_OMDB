package com.example.movies.Controllers;

import com.example.movies.Models.Users;
import com.example.movies.Repositories.UserRepo;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.util.List;





@RestController
public class UserController {

    private static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/signup")
    public String getSignupPage() {
        return "signup"; 
    }

    @PostMapping("/signup")
    public String[] signupPost(@RequestBody Users user ,HttpSession session) {

        ArrayList<String> errors = new ArrayList<>();    
            
        if (user.getEmail().isEmpty() || user.getName().isEmpty() || user.getPassword().isEmpty()) {
            errors.add("All fields are required");
            return errors.toArray(new String[0]);
        }

        if (!validateEmail(user.getEmail())) {
            errors.add("Please enter a valid email address");
        }

        if (!validatePassword(user.getPassword())) {

            if(errors.isEmpty()){
                errors.add("Please enter a password with at least one letter, one digit, and 8 characters");
            }else{
                errors.add(",and a password with at least one letter, one digit, and 8 characters");
            }
           
        }

        if (errors.isEmpty()) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(15);
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            userRepo.save(user);
 
            session.setAttribute("user", user.getEmail());
    
            return new String[]{"Successful"};
        } else {
            return errors.toArray(new String[0]);
        }
    }

    private boolean validatePassword(String password) {
        if (password == null) {
            return false;
        }
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        return matcher.matches();
    }

    private boolean validateEmail(String email) {
        if (email == null) {
            return false;
        }
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }

    @PostMapping("/login")
    public String loginPost(@RequestBody Users user, HttpSession session) {

        Users existingUser = userRepo.findByEmail(user.getEmail());
        if (existingUser != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                session.setAttribute("user", user.getEmail());
                
                return "Successful";
            } else {
                return "Invalid email or password";
            }
        }
        return "Invalid email or password";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) {

            session.invalidate();
        }
        return "Successfully logged out";
    }

    @PostMapping("/addtofav")
    public String postMethodName(@RequestBody String id , HttpSession session) {
      String userEmail = (String) session.getAttribute("user");
      Users user = userRepo.findByEmail(userEmail);
      user.getFavorites().add(id);
      userRepo.save(user);
      return "successful";
    }

    @GetMapping("/favorites")
    public List<String> getFavorites( HttpSession session) {
        String userEmail = (String) session.getAttribute("user");
        Users user = userRepo.findByEmail(userEmail);

        if(user.getFavorites().isEmpty()){
            return new ArrayList<>();
        }

        return user.getFavorites();
    }
    
    @PostMapping("/removefav")
    public String post_remove_fav(@RequestBody String id,HttpSession session) {
        
        String userEmail = (String) session.getAttribute("user");
        Users user = userRepo.findByEmail(userEmail);

        if(user!=null){
            user.getFavorites().remove(id);
            userRepo.save(user);
            return "Movie removed from favorites successfully";
        }
        return "failed to remove";
    }


    
}
