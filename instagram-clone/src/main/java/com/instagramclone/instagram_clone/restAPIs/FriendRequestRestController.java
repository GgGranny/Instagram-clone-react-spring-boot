package com.instagramclone.instagram_clone.restAPIs;


import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.repository.FriendsRepo;
import com.instagramclone.instagram_clone.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FriendRequestRestController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FriendsRepo friendsRepo;

    @PostMapping("/sendFriendRequest")
    public ResponseEntity<String> sendFriendRequest() {
        return null;
    }

    @GetMapping("/getAllUsers")
    public List<OurUser> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/friendRequest/{id}")
    public ResponseEntity<?> sendFriendRequest(@PathVariable("id") int id) {
        if(friendsRepo.existsBy)
    }
}
