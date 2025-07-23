package com.vsapp.vschat2.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "group_chat_message")
public class GroupChatMessage {
    @Id
    @GeneratedValue
    private UUID messageId;

    @Column(nullable = false)
    private UUID senderId;

    @Column(nullable = false, length = 2000)
    private String messageContent;

    @Column(nullable = false)
    private Instant timestamp;

    public UUID getMessageId() { return messageId; }
    public void setMessageId(UUID messageId) { this.messageId = messageId; }
    public UUID getSenderId() { return senderId; }
    public void setSenderId(UUID senderId) { this.senderId = senderId; }
    public String getMessageContent() { return messageContent; }
    public void setMessageContent(String messageContent) { this.messageContent = messageContent; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}

