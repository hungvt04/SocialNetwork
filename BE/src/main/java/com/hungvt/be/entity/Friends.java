package com.hungvt.be.entity;

import com.hungvt.be.entity.base.PrimaryEntity;
import com.hungvt.be.infrastructure.constant.FriendStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "friends")
/**
 * user1: là người gửi lời mời kết bạn
 * user2: l người nhận lời mời kết bạn
 */
public class Friends extends PrimaryEntity {

    @ManyToOne
    @JoinColumn(name = "user1_id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private User user2;

    @Enumerated(EnumType.STRING)
    private FriendStatus friendStatus;

    // user1 + user2 = Friends
    // user2 + user3 = Friends
    // user1 + user3 = Friends

}
