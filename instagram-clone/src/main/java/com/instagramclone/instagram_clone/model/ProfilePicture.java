package com.instagramclone.instagram_clone.model;

import jakarta.persistence.*;

public class ProfilePicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private byte[] imageUrl;
    private String updatedDate;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private OurUser user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(byte[] imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(String updatedDate) {
        this.updatedDate = updatedDate;
    }

    public OurUser getUser() {
        return user;
    }

    public void setUser(OurUser user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "ProfilePicture{" +
                "id=" + id +
                ", imageUrl='" + imageUrl + '\'' +
                ", updatedDate='" + updatedDate + '\'' +
                ", user=" + user +
                '}';
    }


}
