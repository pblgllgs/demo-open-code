package com.pblgllgs.demoopencode.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;
    private static final String SECRET = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    private static final long EXPIRATION = 86400000L;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil(SECRET, EXPIRATION);
    }

    @Test
    void shouldGenerateToken() {
        UserDetails userDetails = new User("test@email.com", "password", Collections.emptyList());
        String token = jwtUtil.generateToken(userDetails);

        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void shouldExtractUsernameFromToken() {
        UserDetails userDetails = new User("test@email.com", "password", Collections.emptyList());
        String token = jwtUtil.generateToken(userDetails);

        String username = jwtUtil.extractUsername(token);

        assertEquals("test@email.com", username);
    }

    @Test
    void shouldValidateTokenForCorrectUser() {
        UserDetails userDetails = new User("test@email.com", "password", Collections.emptyList());
        String token = jwtUtil.generateToken(userDetails);

        assertTrue(jwtUtil.isTokenValid(token, userDetails));
    }

    @Test
    void shouldNotValidateTokenForDifferentUser() {
        UserDetails userDetails = new User("test@email.com", "password", Collections.emptyList());
        UserDetails otherUser = new User("other@email.com", "password", Collections.emptyList());
        String token = jwtUtil.generateToken(userDetails);

        assertFalse(jwtUtil.isTokenValid(token, otherUser));
    }

    @Test
    void shouldNotValidateExpiredToken() {
        JwtUtil shortLivedJwt = new JwtUtil(SECRET, -1L);
        UserDetails userDetails = new User("test@email.com", "password", Collections.emptyList());
        String token = shortLivedJwt.generateToken(userDetails);

        assertThrows(io.jsonwebtoken.ExpiredJwtException.class,
                () -> shortLivedJwt.isTokenValid(token, userDetails));
    }

    @Test
    void shouldThrowExceptionForInvalidToken() {
        assertThrows(Exception.class, () -> jwtUtil.extractUsername("invalid.token.value"));
    }
}
