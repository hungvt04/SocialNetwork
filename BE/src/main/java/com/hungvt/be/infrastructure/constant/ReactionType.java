package com.hungvt.be.infrastructure.constant;

import lombok.Getter;

@Getter
public enum ReactionType {
	
	LIKE("like"),
	
    HAHA("haha"),
    
    LOVE("love"),
    
    SAD("sad"),
    
    ANGRY("angry");

    private final String value;

    ReactionType(String value) {
        this.value = value;
    }

    public static boolean contains(String testValue) {
        for (ReactionType type : ReactionType.values()) {
            if (type.getValue().equalsIgnoreCase(testValue)) {
                return true;
            }
        }
        return false;
    }
}
