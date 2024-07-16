package com.example.movies.Controllers;


import com.example.movies.Services.OmdbServices;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.movies.Models.Movies;
import com.example.movies.Models.Users;
import com.example.movies.Repositories.UserRepo;
import com.example.movies.Repositories.MoviesRepo;


import java.util.ArrayList;
import java.util.Map;

@RestController
public class MoviesCont {

    @Autowired
    private OmdbServices omdbService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MoviesRepo movieRepo;

   @GetMapping("/movies")
    public ArrayList<Movies> searchMovies(@RequestParam int page,HttpSession session) {
        return omdbService.getDefaultMovies(page);

    }

    @GetMapping("/movies/{id}")
    public Movies searchMovies(@PathVariable String id) {

        Movies movie = movieRepo.findByImdbID(id);
        if(movie != null){

            return movie;
        }
        movieRepo.save(omdbService.getMovieById(id));

        return omdbService.getMovieById(id);
    }

    @GetMapping("/checkfav/{id}")
    public String checkfav(@PathVariable String id , HttpSession session) {
        String userEmail = (String) session.getAttribute("user");
 
        if(userEmail==null){
            return "no user is found";
        }
        Users user = userRepo.findByEmail(userEmail);
      
        if (user != null && user.getFavorites() != null) {
          

            if (user.getFavorites().contains(id)) {
           
                return "true";
            } else {
                return "false";
            }
        }
        return "false";
    }
    






}

