package com.example.movies.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.movies.Models.Users;

public interface UserRepo extends JpaRepository<Users, Long> {
    // Use Long if the ID type in Users entity is Long
    Users findByEmail(String email);
    
}
