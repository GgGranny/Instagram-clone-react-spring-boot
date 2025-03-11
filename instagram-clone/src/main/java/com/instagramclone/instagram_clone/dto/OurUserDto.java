package com.instagramclone.instagram_clone.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


public class OurUserDto {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
