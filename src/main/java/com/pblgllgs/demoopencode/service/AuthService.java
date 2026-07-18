package com.pblgllgs.demoopencode.service;

import com.pblgllgs.demoopencode.dto.AuthRequest;
import com.pblgllgs.demoopencode.dto.AuthResponse;
import com.pblgllgs.demoopencode.dto.RegisterRequest;
import com.pblgllgs.demoopencode.model.User;
import com.pblgllgs.demoopencode.repository.UserRepository;
import com.pblgllgs.demoopencode.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        userRepository.save(user);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), java.util.List.of());

        String token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                request.getEmail(), "", java.util.List.of());

        String token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token);
    }
}
