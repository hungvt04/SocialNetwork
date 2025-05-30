package com.hungvt.be.core.client.cmanagefriend.repository;

import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequest;
import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetFriendRequestsRequest;
import com.hungvt.be.core.client.cmanagefriend.model.request.CFGetSuggestedPeopleRequest;
import com.hungvt.be.core.client.cmanagefriend.model.response.CFFriendRequestsResponse;
import com.hungvt.be.core.client.cmanagefriend.model.response.CFFriendsResponse;
import com.hungvt.be.core.client.cmanagefriend.model.response.CFSuggestedPeopleResponse;
import com.hungvt.be.repository.FriendsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CFFriendsRepository extends FriendsRepository {

    @Query(value = """
            SELECT
            	u.id,
            	u.avatar,
            	u.full_name
            FROM
            	`user` u
            WHERE
            	u.id <> :#{#request.currentUserId}
            	AND u.id NOT IN (
            	SELECT f.user2_id FROM friends f WHERE f.user1_id = :#{#request.currentUserId}
            	UNION
            	SELECT f.user1_id FROM friends f WHERE f.user2_id = :#{#request.currentUserId}
              )
            """, nativeQuery = true)
    Page<CFSuggestedPeopleResponse> getSuggestedPeople(Pageable pageable, CFGetSuggestedPeopleRequest request);

    @Query(value = """
            SELECT
            	u.id,
            	u.avatar,
            	u.full_name
            FROM
            	friends f
            JOIN `user` u ON
            	f.user1_id = u.id
            WHERE
            	f.friend_status = 'PENDING' AND
                f.user2_id LIKE :#{#request.currentUserId}
            """, nativeQuery = true)
    Page<CFFriendRequestsResponse> getFriendRequests(Pageable pageable, CFGetFriendRequestsRequest request);

    @Query(value = """
            SELECT
                f.id AS friends_id,
                CASE
                    WHEN f.user1_id LIKE :#{#request.currentUserId} THEN f.user2_id
                    ELSE f.user1_id
                END AS user_id,
                u.avatar,
                u.full_name
            FROM
                friends f
            JOIN
                `user` u ON (
                    (f.user1_id = u.id AND f.user1_id NOT LIKE :#{#request.currentUserId}) OR
                    (f.user2_id = u.id AND f.user2_id NOT LIKE :#{#request.currentUserId})
                )
            WHERE
                f.friend_status = 'ACCEPTED'
                AND (
                    f.user1_id LIKE :#{#request.currentUserId} OR
                    f.user2_id LIKE :#{#request.currentUserId}
                );
            """, nativeQuery = true)
    Page<CFFriendsResponse> getFriends(Pageable pageable, CFGetFriendRequest request);

}
