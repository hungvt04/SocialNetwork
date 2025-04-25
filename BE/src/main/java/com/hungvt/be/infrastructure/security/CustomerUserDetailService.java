package com.hungvt.be.infrastructure.security;

import com.hungvt.be.entity.User;
import com.hungvt.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomerUserDetailService implements UserDetailsService {

    @Qualifier("UserRepository")
    private final UserRepository userRepository;

    @Override
    public CustomerUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Not found user by username: " + username);
        }

        List<String> roles = List.of(userOptional.get().getRoles().toString());

        CustomerUserDetails userDetails = new CustomerUserDetails();

        userDetails.setUsername(username);
        userDetails.setRoles(roles);
        userDetails.setPassword(null);
        log.info("Tiến hành lấy thông tin người dùng từ database.");
        return userDetails;
    }

}
