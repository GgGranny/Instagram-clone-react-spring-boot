package com.instagramclone.instagram_clone.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class OurUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String username;
    private String password;
    private String fullname;

    @Lob
    private byte[] profilePicture;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<Friends> requestSent;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<Friends> requestReceived;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Content> content;

    public List<Friends> getRequestSent() {
        return requestSent;
    }

    public void setRequestSent(List<Friends> requestSent) {
        this.requestSent = requestSent;
    }

    public List<Friends> getRequestReceived() {
        return requestReceived;
    }

    public void setRequestReceived(List<Friends> requestReceived) {
        this.requestReceived = requestReceived;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public List<Content> getContent() {
        return content;
    }

    public void setContent(List<Content> content) {
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    @Override
    public String toString() {
        return "OurUser{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", fullname='" + fullname + '\'' +
                ", friends="  +
                "," +
                '}';
    }
}
