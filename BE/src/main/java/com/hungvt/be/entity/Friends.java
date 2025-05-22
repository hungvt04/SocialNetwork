package com.hungvt.be.entity;

import com.hungvt.be.entity.base.PrimaryEntity;
import com.hungvt.be.infrastructure.constant.FriendStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

}
