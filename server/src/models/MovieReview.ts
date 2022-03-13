import {Movie} from "./Movie";
import {defineMovieReviewModel} from "./defineMovieReviewModel";
import {User} from "./User";

export interface MovieReview {
  id: number;
  userId: number;
  movieId: number;
  rating: number;
  writtenReview: string;
  user: User;
  movie: Movie;
}
