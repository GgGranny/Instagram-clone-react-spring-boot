package com.instagramclone.instagram_clone.repository;


import com.instagramclone.instagram_clone.model.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendsRepo extends JpaRepository<Friends, Integer> {

    boolean existsBySenderIdAndReceiverId(int id, int id1);

    Friends findBySenderIdAndReceiverId(int userId, int id);
}
