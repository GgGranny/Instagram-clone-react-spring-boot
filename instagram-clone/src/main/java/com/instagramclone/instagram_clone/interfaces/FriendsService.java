package com.instagramclone.instagram_clone.interfaces;

import com.instagramclone.instagram_clone.model.Friends;
import com.instagramclone.instagram_clone.model.RequestStatus;
import jakarta.servlet.http.HttpSession;

public interface FriendsService {
    public Friends saveFriendRequest(int id, HttpSession session);

    RequestStatus getFriendshipStaus(int id, int userId);

    boolean checkFriendshipStatus(int id, int userId);
}
