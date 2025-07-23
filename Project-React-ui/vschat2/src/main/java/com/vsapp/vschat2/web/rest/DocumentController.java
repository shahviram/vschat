package com.vsapp.vschat2.web.rest;

import com.vsapp.vschat2.domain.Document;
import com.vsapp.vschat2.domain.DocumentShare;
import com.vsapp.vschat2.repositories.DocumentRepository;
import com.vsapp.vschat2.repositories.DocumentShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentShareRepository documentShareRepository;

    private final String uploadDir = "uploads";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file, UUID userId) throws IOException {

        Files.createDirectories(Paths.get(uploadDir));
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());
        Document doc = new Document();
        doc.setUserId(userId);
        doc.setFileName(file.getOriginalFilename());
        doc.setFileType(file.getContentType());
        doc.setFilePath(filePath.toString());
        doc.setUploadTimestamp(Instant.now());
        documentRepository.save(doc);
        return ResponseEntity.ok(doc);
    }

    @GetMapping("/my-uploads")
    public ResponseEntity<?> getMyUploads(UUID userId) {
        List<Document> docs = documentRepository.findByUserId(userId);
        return ResponseEntity.ok(docs);
    }

    @GetMapping("/download/{documentId}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable UUID documentId) throws IOException {
        Optional<Document> docOpt = documentRepository.findById(documentId);
        if (docOpt.isEmpty()) return ResponseEntity.notFound().build();
        Document doc = docOpt.get();
        File file = new File(doc.getFilePath());
        if (!file.exists()) return ResponseEntity.notFound().build();
        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(doc.getFileType()))
                .body(resource);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<?> deleteDocument(@PathVariable UUID documentId) {
        Optional<Document> docOpt = documentRepository.findById(documentId);
        if (docOpt.isEmpty()) return ResponseEntity.notFound().build();
        Document doc = docOpt.get();
        documentRepository.deleteById(documentId);
        // Delete file from disk
        File file = new File(doc.getFilePath());
        if (file.exists()) file.delete();
        // Delete all shares
        documentShareRepository.findByDocumentId(documentId).forEach(documentShareRepository::delete);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/share/{documentId}")
    public ResponseEntity<?> shareDocument(@PathVariable UUID documentId, @RequestBody List<UUID> userIds) {
        Optional<Document> docOpt = documentRepository.findById(documentId);
        if (docOpt.isEmpty()) return ResponseEntity.notFound().build();
        for (UUID userId : userIds) {
            DocumentShare share = new DocumentShare();
            share.setDocumentId(documentId);
            share.setSharedWithUserId(userId);
            documentShareRepository.save(share);
        }
        return ResponseEntity.ok("Document shared");
    }

    @GetMapping("/shared-with-me")
    public ResponseEntity<?> getSharedWithMe(UUID userId) {
        List<DocumentShare> shares = documentShareRepository.findBySharedWithUserId(userId);
        List<UUID> docIds = shares.stream().map(DocumentShare::getDocumentId).collect(Collectors.toList());
        List<Document> docs = documentRepository.findAllById(docIds);
        return ResponseEntity.ok(docs);
    }

    @DeleteMapping("/shared-with-me/{documentId}")
    public ResponseEntity<?> removeSharedWithMe(@PathVariable UUID documentId, UUID userId) {
        documentShareRepository.deleteByDocumentIdAndSharedWithUserId(documentId, userId);
        return ResponseEntity.noContent().build();
    }
}

