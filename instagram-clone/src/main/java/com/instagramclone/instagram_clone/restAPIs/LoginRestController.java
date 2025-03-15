package com.instagramclone.instagram_clone.restAPIs;

import com.instagramclone.instagram_clone.dto.OurUserDto;
import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.repository.UserRepo;
import com.instagramclone.instagram_clone.services.UserServiceImp;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LoginRestController {

    @Autowired
    UserServiceImp userService;
    @Autowired
    private UserRepo userRepo;

    private static final Logger logger = LoggerFactory.getLogger(LoginRestController.class);

    @PostMapping("/register")
    public ResponseEntity<String> addOurUser(@RequestBody OurUser ourUser) {
        if (!userService.checkUserExists(ourUser.getUsername())) {
            userService.saveUser(ourUser);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("User already registered");
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginOurUser(@RequestBody OurUserDto ourUserDto, HttpSession session) {
        logger.info("Checking if user exists: {}", ourUserDto.getUsername());
        if (userService.checkUserExists(ourUserDto.getUsername())) {
            OurUser ourUser = userRepo.findByUsername(ourUserDto.getUsername());
            if (ourUser.getUsername().equals(ourUserDto.getUsername()) && ourUser.getPassword().equals(ourUserDto.getPassword())) {
                session.setAttribute("user", ourUser);
                logger.info("User set in session: {}", (OurUser) session.getAttribute("user"));
                return ResponseEntity.status(HttpStatus.OK).body(ourUser);
            }
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Username or password incorrect");
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<?> getAllUser() {
        List<OurUser> allUsers = userRepo.findAll();
        return !allUsers.isEmpty() ?ResponseEntity.status(HttpStatus.OK).body(allUsers): ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("No users found");
    }
    @GetMapping("/user")
    public ResponseEntity<Object> getOurUser(HttpSession session) {
        logger.info("Fetching user from session");
        OurUser user = (OurUser) session.getAttribute("user");
        if (user != null) {
            logger.info("User found: {}", user.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("User not found");
    }

    @GetMapping("/checkUserSession")
    public ResponseEntity<?> checkUserSession(HttpSession session) {
        if(session.getAttribute("user") == null ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }else {
            System.out.println("session id from check user session:" + session.getId());
            return ResponseEntity.status(HttpStatus.OK).body(session.getId());
        }
    }
    @PostMapping("/uploadProfile")
    public ResponseEntity<?> uploadProfile(@RequestPart("file") MultipartFile file, HttpSession session) {
        try {
            System.out.println("session id from upload:" + session.getId());
        OurUser ourUser = userService.uploadProfile(file, session);
        return ResponseEntity.status(HttpStatus.OK).body(ourUser);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK).body("User logged out");
    }

}