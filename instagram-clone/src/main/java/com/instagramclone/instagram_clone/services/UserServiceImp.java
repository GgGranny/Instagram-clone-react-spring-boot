package com.instagramclone.instagram_clone.services;

import com.instagramclone.instagram_clone.interfaces.UserService;
import com.instagramclone.instagram_clone.model.Content;
import com.instagramclone.instagram_clone.model.ContentType;
import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.repository.ContentRepo;
import com.instagramclone.instagram_clone.repository.UserRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    private ContentRepo contentRepo;

    @Override
    public OurUser saveUser(OurUser ourUser) {
        return userRepo.save(ourUser);
    }

    @Override
    public boolean checkUserExists(String username) {
        return userRepo.existsByUsername(username);
    }

    @Override
    public Content saveImage(MultipartFile file, HttpSession session) throws IOException {
        if(session.getAttribute("user") == null) {
            throw new IllegalStateException("user is not logged in");
        }
        Content content = new Content();
        content.setImageType(ContentType.IMAGE);
        content.setImageName(file.getOriginalFilename());
        content.setUser((OurUser) session.getAttribute("user"));
        content.setImageData(file.getBytes());
        return contentRepo.save(content);
    }

    @Override
    public List<Content> getContent() {
        return contentRepo.findAll();
    }

    @Override
    public OurUser uploadProfile(MultipartFile file, HttpSession session) throws IOException {
        if(session == null) {
            throw new IllegalStateException("user is not logged in");
        }
        OurUser ourUser = (OurUser) session.getAttribute("user");
        ourUser.setProfilePicture(file.getBytes());
        return userRepo.save(ourUser);
    }

    @Override
    public List<Content> getOurUserPosts(HttpSession session) {
        OurUser ourUser = (OurUser) session.getAttribute("user");
        int userId = ourUser.getId();
        return contentRepo.findByUserId(userId);
    }
}
