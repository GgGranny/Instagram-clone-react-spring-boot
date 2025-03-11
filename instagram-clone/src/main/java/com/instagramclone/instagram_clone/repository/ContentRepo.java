package com.instagramclone.instagram_clone.repository;

import com.instagramclone.instagram_clone.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepo extends JpaRepository<Content, Integer> {

    List<Content> findByUserId(int attr0);
}
