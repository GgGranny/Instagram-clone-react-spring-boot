package com.instagramclone.instagram_clone.interfaces;

import com.instagramclone.instagram_clone.model.Content;
import com.instagramclone.instagram_clone.model.OurUser;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
     OurUser saveUser(OurUser ourUser);

    boolean checkUserExists(String username);

    Content saveImage(MultipartFile file, HttpSession session) throws IOException;

    List<Content> getContent();

    OurUser uploadProfile(MultipartFile file, HttpSession session) throws IOException;

    List<Content> getOurUserPosts(HttpSession session);
}
