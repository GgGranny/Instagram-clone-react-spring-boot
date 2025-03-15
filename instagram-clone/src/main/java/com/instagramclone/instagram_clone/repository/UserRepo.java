package com.instagramclone.instagram_clone.repository;


import com.instagramclone.instagram_clone.model.OurUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<OurUser, Integer> {

    boolean existsByUsername(String username);

    OurUser findByUsername(String username);
}
