import {User} from "./User";

export interface Movie {
  id: number;
  title: string;
  rating: number;
  description: string;
}

export interface MovieReview {
  id: number;
  userId: number;
  movieId: number;
  rating: number;
  writtenReview: string;
  user: User;
  movie: Movie;
}

export interface MovieReviewUpdateRequest {
  userId: number;
  movieId: number;
  rating: number;
  writtenReview: string;
}

