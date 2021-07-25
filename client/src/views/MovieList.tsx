import React, {useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {getAllMovies} from "../services/movie.service";
import {MovieContext} from "../services/movie.context";
import {Grid, Paper} from "@material-ui/core";
import styled from "styled-components";
import {Movie} from "../model/Movie";

const StyledMovieListDiv = styled.div`
  // & means "this"
  &.movie-list {
    max-width: 800px;
    margin: auto;

    .movies {
      .movie {
        max-height: 540px;
        height: auto;

        .movie-paper {
          height: 100%;
          
          .movie-title {
            height: 40px;
            text-align: center;
            font-size: 30px;
          }
          
          .movie-image {
            width: 100%;
            height: auto;
            max-height: 350px;
            object-fit: cover;
          }

          &:hover {
            background-color: #eee;
          }
        }
      }
    }
  }
`;

export const MovieList = () => {
  const {movies, setMovies} = useContext(MovieContext);

  useEffect(() => {
    getAllMovies()
      .then(response => {
        setMovies(response.data);
      })
  }, []);

  return (
    <StyledMovieListDiv className="movie-list">
      <Grid container spacing={2}
            direction="row"
            className="movies">
        {movies.map((movie, index) => (
          <MovieView key={index} movie={movie}/>
        ))}
      </Grid>
    </StyledMovieListDiv>
  );
};

const MovieView = (props: { movie: Movie; }) => {
  const {movie} = props;

  return (
    <Grid item xs={12} sm={6} md={4}
          className="movie">
      <Link to={`movies/${movie.id}`}>
        <Paper elevation={3} className="movie-paper">
            <div className="movie-title">
              {movie.title}
            </div>
            {/*<p>{movie.rating}</p>*/}
            <img className="movie-image" src={movie.imageUrl} alt=""/>
        </Paper>
      </Link>
    </Grid>
  );
}



