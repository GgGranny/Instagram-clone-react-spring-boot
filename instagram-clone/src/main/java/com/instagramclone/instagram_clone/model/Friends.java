package com.instagramclone.instagram_clone.model;

import jakarta.persistence.*;

@Entity
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="sender_id")
    private OurUser sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private OurUser receiver;

    private RequestStatus requestStatus;

    private String data;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public OurUser getSender() {
        return sender;
    }

    public void setSender(OurUser sender) {
        this.sender = sender;
    }

    public OurUser getReceiver() {
        return receiver;
    }

    public void setReceiver(OurUser receiver) {
        this.receiver = receiver;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Friends{" +
                "id=" + id +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", requestStatus=" + requestStatus +
                ", data='" + data + '\'' +
                '}';
    }
}

