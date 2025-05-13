package com.hungvt.be.tool;

import com.hungvt.be.entity.React;
import com.hungvt.be.infrastructure.constant.ReactionType;
import com.hungvt.be.repository.ReactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Configuration
public class DataInit {

    private final ReactRepository reactRepository;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {

            if (reactRepository.count() == 0) {
                ReactionType[] allTypes = ReactionType.values();
                for (ReactionType type : allTypes) {
                    React react = new React(type, "");
                    reactRepository.save(react);
                }
            }
        };
    }
}
