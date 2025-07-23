package com.vsapp.vschat2.repositories;

import com.vsapp.vschat2.domain.GroupChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface GroupChatMessageRepository extends JpaRepository<GroupChatMessage, UUID> {
    List<GroupChatMessage> findAllByOrderByTimestampAsc();
}

