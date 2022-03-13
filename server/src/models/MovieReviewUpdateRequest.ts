export interface MovieReviewUpdateRequest {
  userId: number;
  movieId: number;
  rating: number;
  writtenReview: string;
}
