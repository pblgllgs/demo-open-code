package com.pblgllgs.demoopencode.service;

import com.pblgllgs.demoopencode.model.User;
import com.pblgllgs.demoopencode.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnAllUsers() {
        List<User> users = List.of(
                new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true),
                new User(2L, "Jane", "jane@email.com", "pass2", "ROLE_ADMIN", true)
        );
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.findAll();

        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @Test
    void shouldReturnEmptyListWhenNoUsers() {
        when(userRepository.findAll()).thenReturn(List.of());

        List<User> result = userService.findAll();

        assertTrue(result.isEmpty());
    }

    @Test
    void shouldReturnUserById() {
        User user = new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.findById(1L);

        assertNotNull(result);
        assertEquals("John", result.getName());
        assertEquals("john@email.com", result.getEmail());
    }

    @Test
    void shouldThrowExceptionWhenUserNotFoundById() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> userService.findById(99L));

        assertTrue(exception.getMessage().contains("99"));
    }

    @Test
    void shouldCreateUser() {
        User user = new User(null, "John", "john@email.com", "pass1", "ROLE_USER", true);
        User savedUser = new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true);
        when(userRepository.save(user)).thenReturn(savedUser);

        User result = userService.create(user);

        assertEquals(1L, result.getId());
        assertEquals("John", result.getName());
        verify(userRepository).save(user);
    }

    @Test
    void shouldUpdateUserNameAndEmail() {
        User existing = new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true);
        User updatedDetails = new User(null, "Jane", "jane@email.com", null, null, true);
        when(userRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User result = userService.update(1L, updatedDetails);

        assertEquals("Jane", result.getName());
        assertEquals("jane@email.com", result.getEmail());
        verify(userRepository).save(existing);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonexistentUser() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());
        User updatedDetails = new User(null, "Jane", "jane@email.com", null, null, true);

        assertThrows(RuntimeException.class, () -> userService.update(99L, updatedDetails));
    }

    @Test
    void shouldDeleteUser() {
        User user = new User(1L, "John", "john@email.com", "pass1", "ROLE_USER", true);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        userService.delete(1L);

        verify(userRepository).delete(user);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonexistentUser() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.delete(99L));
    }
}
