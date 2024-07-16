package com.example.movies.Services;
       
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import com.example.movies.Models.Movies;

@Service
public class OmdbServices {

    private static final String API_KEY = "f98bce22";
    private static final String BASE_URL = "http://www.omdbapi.com/";

    private RestTemplate restTemplate;

    public OmdbServices(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, Object> getMovieByTitle(String title) {
        String url = BASE_URL + "?t={title}&apikey={apikey}";
        Map<String, String> params = new HashMap<>();
        params.put("title", title);
        params.put("apikey", API_KEY);

        return restTemplate.getForObject(url, Map.class, params);
    }

    public ArrayList<Movies> getDefaultMovies(int page) {

        ArrayList<Movies> movies=new ArrayList<>();
        if (page <= 100) {
            // Generate a random page number between 1 and currentPage
            // int randomPage = (int) (Math.random() * currentPage) + 1;

            String url = BASE_URL + "?s={query}&apikey={apikey}&type=movie&page={page}";
            Map<String, String> params = new HashMap<>();
            params.put("query", "action"); // Empty query to fetch all movies
            params.put("apikey", API_KEY);
            params.put("page", String.valueOf(page));

            // Increment the current page for the next request
            page++;
            Map<String, Object> response= restTemplate.getForObject(url, Map.class, params); 
            ArrayList<Map<String, Object>> searchResults = (ArrayList<Map<String, Object>>) response.get("Search");
            
            for (Map<String, Object> result : searchResults) {
                String title = (String) result.get("Title");
                String poster=  (String) result.get("Poster");
                int year = Integer.parseInt((String) result.get("Year"));
                String imdbID = (String) result.get("imdbID");

                movies.add(new Movies(title,poster, year, imdbID));
            }

            return movies;
        } else {
            return movies;
        }

    }
    public Movies getMovieById(String id) {
        String url = BASE_URL + "?i={id}&apikey={apikey}&type=movie";
        Map<String, String> params = new HashMap<>();
        params.put("id", id);
        params.put("apikey", API_KEY);

        
        Map<String, Object> response= restTemplate.getForObject(url, Map.class, params); 
        String title = (String) response.get("Title");
        String poster = (String) response.get("Poster");
        int year = Integer.parseInt((String) response.get("Year"));
        String imdbID = (String) response.get("imdbID");
        String director = (String) response.get("Director");
        String released = (String) response.get("Released");
        String runtime = (String) response.get("Runtime");
        String plot = (String) response.get("Plot");
        String genre = (String) response.get("Genre");
        String actors = (String) response.get("Actors");
        Movies movie = new Movies(title, poster, year, imdbID);
        movie.setDirector(director);
        movie.setGenre(genre);
        movie.setPlot(plot);
        movie.setRuntime(runtime);
        movie.setReleased(released);
        movie.setActors(actors);
        return movie;

       
    }
}
