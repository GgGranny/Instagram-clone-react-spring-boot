package com.instagramclone.instagram_clone.restAPIs;

import com.instagramclone.instagram_clone.model.Friends;
import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.model.RequestStatus;
import com.instagramclone.instagram_clone.repository.FriendsRepo;
import com.instagramclone.instagram_clone.repository.UserRepo;
import com.instagramclone.instagram_clone.services.FriendsServiceImp;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class FriendRequestRestController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FriendsRepo friendsRepo;

    @Autowired
    private FriendsServiceImp friendsServiceImp;


    @GetMapping("/friendRequest/{id}")
    public ResponseEntity<?> sendFriendRequest(@PathVariable("id") int id, HttpSession session) {
        System.out.println("sendFriendRequest");
            return friendsServiceImp.saveFriendRequest(id, session) != null ?
                    ResponseEntity.status(HttpStatus.OK).body("friend request sent")
                    : ResponseEntity.status(HttpStatus.NOT_FOUND).body("friend request not sent");

    }

    @GetMapping("/checkFriendStatus")
    public ResponseEntity<?> checkFriendStatus(@RequestParam Map<String, String> params, HttpSession session) {
        int id = Integer.parseInt(params.get("id"));
        OurUser u = (OurUser) session.getAttribute("user");
        int userId = u.getId();
        if(friendsServiceImp.checkFriendshipStatus(id, userId)) {
            RequestStatus status = friendsServiceImp.getFriendshipStaus(id, userId);
            return ResponseEntity.status(HttpStatus.OK).body(status);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("friend request not sent yet");
    }
}
