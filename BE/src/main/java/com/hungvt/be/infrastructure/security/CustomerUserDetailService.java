package com.hungvt.be.infrastructure.security;

import com.hungvt.be.entity.User;
import com.hungvt.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Log4j2
public class CustomerUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public CustomerUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userOptional = userRepository.findByEmail(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Not found user by username: " + username);
        }
        User user = userOptional.get();

        List<String> roles = List.of(user.getRoles().toString());

        CustomerUserDetails userDetails = new CustomerUserDetails();

        userDetails.setUsername(username);
        userDetails.setRoles(roles);
        userDetails.setPassword(null);
        userDetails.setFullname(user.getFullName());
        userDetails.setUsername(user.getUsername());
        log.info("Tiến hành lấy thông tin người dùng từ database.");
        return userDetails;
    }

}
