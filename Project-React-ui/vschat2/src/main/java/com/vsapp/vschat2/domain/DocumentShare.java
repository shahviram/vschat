package com.vsapp.vschat2.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "document_share")
public class DocumentShare {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private UUID documentId;

    @Column(nullable = false)
    private UUID sharedWithUserId;

    // Getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public UUID getDocumentId() { return documentId; }
    public void setDocumentId(UUID documentId) { this.documentId = documentId; }
    public UUID getSharedWithUserId() { return sharedWithUserId; }
    public void setSharedWithUserId(UUID sharedWithUserId) { this.sharedWithUserId = sharedWithUserId; }
}

