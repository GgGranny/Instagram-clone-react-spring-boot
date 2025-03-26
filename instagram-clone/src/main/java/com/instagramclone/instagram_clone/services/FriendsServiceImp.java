package com.instagramclone.instagram_clone.services;

import com.instagramclone.instagram_clone.interfaces.FriendsService;
import com.instagramclone.instagram_clone.model.Friends;
import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.model.RequestStatus;
import com.instagramclone.instagram_clone.repository.FriendsRepo;
import com.instagramclone.instagram_clone.repository.UserRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class FriendsServiceImp implements FriendsService {
    @Autowired
    FriendsRepo friendsRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    public Friends saveFriendRequest(int id, HttpSession session) {
        OurUser user = (OurUser) session.getAttribute("user");
        OurUser receiver = userRepo.findById(id).orElse(null);
        if(user != null && receiver != null) {
            if(!friendsRepo.existsBySenderIdAndReceiverId(user.getId(), id)){
            Friends friends = new Friends();
            friends.setSender(user);
            friends.setReceiver(receiver);
            friends.setRequestStatus(RequestStatus.PENDING);
            friends.setData(getRequestSentData());
            return friendsRepo.save(friends);
            }
        }
        return null;
    }

    public static String getRequestSentData() {
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return formatter.format(date);
    }
}
