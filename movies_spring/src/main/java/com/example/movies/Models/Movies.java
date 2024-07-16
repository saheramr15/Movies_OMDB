package com.example.movies.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Movies {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String Poster;
    private int year;
    private String imdbID;
    private String released;
    private String genre;
    private String director;
    private String runtime;
    private String plot;
    private String actors;

    public Movies() {

    }
    
    public Movies(String title, String poster , int year, String imdbID) {
        this.title = title;
        this.Poster=poster;
        this.year = year;
        this.imdbID = imdbID;
    }
}
