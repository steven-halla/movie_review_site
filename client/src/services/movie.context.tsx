import {Movie} from 'model/Movie';
import React, {FC, useState} from 'react';

interface MovieContextState {
  movie?: Movie;
  setMovie: (movie?: Movie) => void;

  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}

export const MovieContext = React.createContext({} as MovieContextState);

export const MovieContextProvider: FC = (props) => {
  const [movie, setMovie] = useState<Movie>();
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <MovieContext.Provider
      value={{
        movie, setMovie,
        movies, setMovies
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
