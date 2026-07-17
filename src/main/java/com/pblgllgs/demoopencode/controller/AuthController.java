package com.pblgllgs.demoopencode.controller;

import com.pblgllgs.demoopencode.dto.AuthRequest;
import com.pblgllgs.demoopencode.dto.AuthResponse;
import com.pblgllgs.demoopencode.dto.RegisterRequest;
import com.pblgllgs.demoopencode.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
