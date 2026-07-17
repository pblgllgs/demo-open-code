package com.pblgllgs.demoopencode.service;

import com.pblgllgs.demoopencode.dto.AuthRequest;
import com.pblgllgs.demoopencode.dto.AuthResponse;
import com.pblgllgs.demoopencode.dto.RegisterRequest;
import com.pblgllgs.demoopencode.model.User;
import com.pblgllgs.demoopencode.repository.UserRepository;
import com.pblgllgs.demoopencode.security.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterUserAndReturnToken() {
        RegisterRequest request = new RegisterRequest("John", "john@email.com", "password123");
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(1L);
            return u;
        });
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void shouldEncodePasswordOnRegister() {
        RegisterRequest request = new RegisterRequest("John", "john@email.com", "plainPassword");
        when(passwordEncoder.encode("plainPassword")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        authService.register(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        User savedUser = captor.getValue();
        assertEquals("encodedPassword", savedUser.getPassword());
    }

    @Test
    void shouldSetRoleUserOnRegister() {
        RegisterRequest request = new RegisterRequest("John", "john@email.com", "password123");
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        authService.register(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertEquals("ROLE_USER", captor.getValue().getRole());
    }

    @Test
    void shouldSetUserNameAndEmailOnRegister() {
        RegisterRequest request = new RegisterRequest("John", "john@email.com", "password123");
        when(passwordEncoder.encode(anyString())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        authService.register(request);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        User savedUser = captor.getValue();
        assertEquals("John", savedUser.getName());
        assertEquals("john@email.com", savedUser.getEmail());
    }

    @Test
    void shouldLoginAndReturnToken() {
        AuthRequest request = new AuthRequest("john@email.com", "password123");
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        verify(authenticationManager).authenticate(any());
    }

    @Test
    void shouldCallAuthenticationManagerOnLogin() {
        AuthRequest request = new AuthRequest("john@email.com", "password123");
        when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("jwt-token");

        authService.login(request);

        verify(authenticationManager).authenticate(any());
    }
}
