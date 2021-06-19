import axios, {AxiosResponse} from 'axios';
import {authHeader} from "./authHeader";
import {Movie, MovieReview, MovieReviewUpdateRequest} from "model/Movie";
import {API_URL} from "./Constants";


export const getAllMovies = (): Promise<AxiosResponse<Movie[]>> => {
  return axios.get(API_URL + `/movies`, {headers: authHeader()});
};

export const getMovie = (movieId: number): Promise<AxiosResponse<Movie>> => {
  return axios.get(API_URL + `/movies/${movieId}`, {headers: authHeader()});
};

export const updateMovie = (movie: Movie): Promise<AxiosResponse<Movie>> => {
  return axios.put(API_URL + `/movies/${movie.id}`, movie, {headers: authHeader()});
};

export const createMovie = (movie: Movie): Promise<AxiosResponse<Movie>> => {
  return axios.post(API_URL + `/movies`, movie, {headers: authHeader()});
};

export const getMovieReviews = (movieId: number): Promise<AxiosResponse<MovieReview[]>> => {
  return axios.get(API_URL + `/movies/${movieId}/reviews`);
};

export const updateMovieReview = (request: MovieReviewUpdateRequest): Promise<AxiosResponse<MovieReview>> => {
  return axios.patch(API_URL + `/movies/${request.movieId}/reviews`, request, {headers: authHeader()});
};

export const deleteMovieReview = (movieReviewId: number): Promise<AxiosResponse<MovieReview>> => {
  return axios.delete(API_URL + `/movies/reviews/${movieReviewId}`, {headers: authHeader()});
}