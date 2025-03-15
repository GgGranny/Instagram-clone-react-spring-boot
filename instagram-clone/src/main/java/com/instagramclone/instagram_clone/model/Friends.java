package com.instagramclone.instagram_clone.model;

import jakarta.persistence.*;

@Entity
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private OurUser senderId;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private OurUser receiverId;

    private RequestStatus requestStatus;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public OurUser getSenderId() {
        return senderId;
    }

    public void setSenderId(OurUser senderId) {
        this.senderId = senderId;
    }

    public OurUser getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(OurUser receiverId) {
        this.receiverId = receiverId;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    @Override
    public String toString() {
        return "Friends{" +
                "id=" + id +
                ", senderId=" + senderId +
                ", receiverId=" + receiverId +
                ", requestStatus=" + requestStatus +
                '}';
    }
}

