package com.instagramclone.instagram_clone.restAPIs;


import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FriendRequestRestController {

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/sendFriendRequest")
    public ResponseEntity<String> sendFriendRequest() {
        return null;
    }

    @GetMapping("/getAllUsers")
    public List<OurUser> getAllUsers() {
        return userRepo.findAll();
    }
}
