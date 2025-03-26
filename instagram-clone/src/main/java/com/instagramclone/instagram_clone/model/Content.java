package com.instagramclone.instagram_clone.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Arrays;


@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private OurUser user;

    private ContentType imageType;
    private String imageName;
    @Lob
    private byte[] imageData;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public OurUser getUser() {
        return user;
    }

    public void setUser(OurUser user) {
        this.user = user;
    }

    public ContentType getImageType() {
        return imageType;
    }

    public void setImageType(ContentType imageType) {
        this.imageType = imageType;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    @Override
    public String toString() {
        return "Content{" +
                "id=" + id +
                ", user=" + user +
                ", imageType=" + imageType +
                ", imageName='" + imageName + '\'' +
                ", imageData=" + Arrays.toString(imageData) +
                '}';
    }
}
