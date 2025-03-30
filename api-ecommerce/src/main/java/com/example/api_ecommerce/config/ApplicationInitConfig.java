package com.example.api_ecommerce.config;

import com.example.api_ecommerce.entity.RoleEntity;
import com.example.api_ecommerce.entity.User;
import com.example.api_ecommerce.enums.Role;
import com.example.api_ecommerce.repository.RoleRepository;
import com.example.api_ecommerce.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
                HashSet<RoleEntity> roles = new HashSet<>();
                if (!roleRepository.existsByName(Role.ADMIN.name())){
                    RoleEntity role = RoleEntity.builder()
                            .name(Role.ADMIN.name())
                            .build();
                    roles.add(roleRepository.save(role));
                }
                if (!roleRepository.existsByName(Role.USER.name())){
                    RoleEntity role = RoleEntity.builder()
                            .name(Role.USER.name())
                            .build();
                    roles.add(roleRepository.save(role));
                }
                if (!roleRepository.existsByName(Role.BANNED.name())){
                    RoleEntity role = RoleEntity.builder()
                            .name(Role.BANNED.name())
                            .build();
                    roles.add(roleRepository.save(role));
                }
                User user = User.builder()
                        .username("admin")
                        .hash(passwordEncoder.encode("admin@123"))
                        .role(roles)
                        .email("admin@admin.com")
                        .firstName("Super")
                        .lastName("Admin")
                        .display(true)
                        .build();
                userRepository.save(user);
                log.warn("admin user has been created with defaults password: admin@123, please change it right!");
            }
        };
    }
}
