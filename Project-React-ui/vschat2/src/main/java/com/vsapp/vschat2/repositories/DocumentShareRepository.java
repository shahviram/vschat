package com.vsapp.vschat2.repositories;

import com.vsapp.vschat2.domain.DocumentShare;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface DocumentShareRepository extends JpaRepository<DocumentShare, UUID> {
    List<DocumentShare> findBySharedWithUserId(UUID sharedWithUserId);
    List<DocumentShare> findByDocumentId(UUID documentId);
    void deleteByDocumentIdAndSharedWithUserId(UUID documentId, UUID sharedWithUserId);
}

