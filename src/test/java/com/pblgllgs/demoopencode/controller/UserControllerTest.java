package com.pblgllgs.demoopencode.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pblgllgs.demoopencode.model.User;
import com.pblgllgs.demoopencode.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void shouldReturnAllUsers() throws Exception {
        List<User> users = List.of(
                new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true),
                new User(2L, "Jane", "jane@email.com", "pass2", "ROLE_ADMIN", true)
        );
        when(userService.findAll()).thenReturn(users);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("John"))
                .andExpect(jsonPath("$[1].name").value("Jane"))
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldReturnEmptyListWhenNoUsers() throws Exception {
        when(userService.findAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void shouldReturnUserById() throws Exception {
        User user = new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true);
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.email").value("john@email.com"));
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() throws Exception {
        when(userService.findById(99L)).thenThrow(new RuntimeException("Usuario no encontrado con id: 99"));

        assertThrows(Exception.class, () ->
                mockMvc.perform(get("/api/users/99")));
    }

    @Test
    void shouldCreateUserAndReturn201() throws Exception {
        User user = new User(null, "John", "john@email.com", "pass1", "ROLE_USER", true);
        User savedUser = new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true);
        when(userService.create(any(User.class))).thenReturn(savedUser);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John"));
    }

    @Test
    void shouldUpdateUser() throws Exception {
        User updatedDetails = new User(null, "Jane", "jane@email.com", null, null, true);
        User updatedUser = new User(1L, "Jane", "jane@email.com", "pass1", "ROLE_USER", true);
        when(userService.update(eq(1L), any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Jane"))
                .andExpect(jsonPath("$.email").value("jane@email.com"));
    }

    @Test
    void shouldDeleteUserAndReturn204() throws Exception {
        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isNoContent());

        verify(userService).delete(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonexistentUser() throws Exception {
        doThrow(new RuntimeException("Usuario no encontrado con id: 99"))
                .when(userService).delete(99L);

        assertThrows(Exception.class, () ->
                mockMvc.perform(delete("/api/users/99")));
    }
}
