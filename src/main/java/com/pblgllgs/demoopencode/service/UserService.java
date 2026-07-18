package com.pblgllgs.demoopencode.service;

import com.pblgllgs.demoopencode.model.User;
import com.pblgllgs.demoopencode.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con id: " + id));
    }

    public User create(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }
        user.setActive(true);
        return userRepository.save(user);
    }

    public User update(Long id, User userDetails) {
        User user = findById(id);
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setRole(userDetails.getRole());
        if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }
        return userRepository.save(user);
    }

    public User toggleActive(Long id) {
        User user = findById(id);
        user.setActive(!user.isActive());
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
