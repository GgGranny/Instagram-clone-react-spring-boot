package com.instagramclone.instagram_clone.interfaces;

import com.instagramclone.instagram_clone.model.Friends;
import jakarta.servlet.http.HttpSession;

public interface FriendsService {
    public Friends saveFriendRequest(int id, HttpSession session);
}
