package com.vsapp.vschat2.web.rest;

import com.vsapp.vschat2.domain.GroupChatMessage;
import com.vsapp.vschat2.repositories.GroupChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/chat/messages")
public class GroupChatController {
    @Autowired
    private GroupChatMessageRepository messageRepository;

    @GetMapping
    public List<GroupChatMessage> getAllMessages() {
        return messageRepository.findAllByOrderByTimestampAsc();
    }

    @PostMapping
    public ResponseEntity<?> postMessage(@RequestBody GroupChatMessage message) {
        // No authentication, senderId must be provided in the request body
        try {
            if (message.getSenderId() == null) {
                return ResponseEntity.badRequest().body("senderId is required");
            }
            message.setTimestamp(Instant.now());
            GroupChatMessage saved = messageRepository.save(message);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid sender context");
        }
    }
}
