package com.example.movies.Repositories;

import com.example.movies.Models.Movies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoviesRepo extends JpaRepository<Movies, Long> {
    
    Movies findByTitle(String title);
    Movies findByImdbID(String imdbID);
    
}
