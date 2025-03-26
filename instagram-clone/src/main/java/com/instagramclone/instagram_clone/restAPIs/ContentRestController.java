package com.instagramclone.instagram_clone.restAPIs;
import com.instagramclone.instagram_clone.model.Content;
import com.instagramclone.instagram_clone.model.OurUser;
import com.instagramclone.instagram_clone.repository.ContentRepo;
import com.instagramclone.instagram_clone.services.UserServiceImp;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api")
public class ContentRestController {

    @Autowired
    UserServiceImp userService;

    private static Logger log = LoggerFactory.getLogger(ContentRestController.class);
    @Autowired
    private ContentRepo contentRepo;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestPart("file") MultipartFile file, HttpSession session) {
        try {
            Content c = userService.saveImage(file, session);
            log.info("uploadFile"+ file.getContentType());
            return ResponseEntity.ok().body("Image Saved");
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getContent")
    public ResponseEntity<?> getContent() {
        List<Content> content = userService.getContent();
        System.out.println("getting the content: "+ content.toString());
        log.info("getting content: " + content.size());
        return !content.isEmpty() ? ResponseEntity.ok().body(content) : new ResponseEntity<>("no content available", HttpStatus.BAD_GATEWAY);
    }

    @GetMapping("/getUserPosts")
    public ResponseEntity<?> getUserPosts(HttpSession session) {
        List<Content> content = userService.getOurUserPosts(session);
        if(content.isEmpty()) {
            return new ResponseEntity<>("failed to get Posts", HttpStatus.BAD_GATEWAY);
        }else {
            return ResponseEntity.ok().body(content);
        }
    }
    @GetMapping("/getPostCount/{id}")
    public Integer getUsersPostCount(@PathVariable("id") int id) {
        List<Content> content = contentRepo.findByUserId(id);
        return !content.isEmpty() ? content.size() : 0;
    }

    @GetMapping("/getUserContentById/{id}")
    public ResponseEntity<?> getUserContentById(@PathVariable("id") int id) {
        List<Content> content = contentRepo.findByUserId(id);
        return !content.isEmpty() ? ResponseEntity.ok().body(content) :
                new ResponseEntity<>("no content available", HttpStatus.BAD_REQUEST);
    }
}