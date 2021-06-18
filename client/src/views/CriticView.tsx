import React, {FC, useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getUserProfile, getUserReviews} from "../services/user.service";
import {UserProfile} from "../model/User";
import {Box, Button, FormControl, Paper} from "@material-ui/core";
import styled from "styled-components";
import {deleteMovieReview} from "../services/movie.service";
import {MovieReview} from "../model/Movie";
import {UserContext} from "../services/user.context";
import {AxiosResponse} from "axios";

const CriticViewDiv = styled.div`
  &.critic-view {
    max-width: 800px;
    margin: auto;
    background-color: #eeeeee;

    .written-review {
      color: red;
      padding-bottom: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      margin-left: 10px;
    }

    .critic-header-name {
      font-family: "Avenir Next Condensed", serif;
      font-size: xx-large;
      color: green;
      padding-bottom: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      margin-left: 10px;
    }

    .critic-review-list-item {
      margin: 10px;
      padding: 10px;
    }
  }
`;

interface CriticViewParams {
  id: string;
}

export const CriticView: FC = () => {
  const {id: userIdString} = useParams<CriticViewParams>();
  const userId = Number(userIdString);

  const {user} = useContext(UserContext);

  const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);
  const [reviews, setReviews] = useState<MovieReview[]>([]);


  const deleteMovieReviewOnClick = (movieReviewId: number) => {
    deleteMovieReview(movieReviewId)
      .then((response: AxiosResponse<MovieReview>) => {
        if (response.status === 200) {
          setReviews(reviews.filter(review => review.id !== movieReviewId));
        }
      });
  }

  useEffect(() => {
    getUserProfile(userId)
      .then(response => {
        setUserProfile(response.data);
      });
  }, []);

  useEffect(() => {
    getUserReviews(userId)
      .then(response => {
        console.log(response.data);
        setReviews(response.data);
      });
  }, []);

  return (
    <CriticViewDiv className="critic-view">
      <Box className="critic-header-name">
        <p> {userProfile.displayName}</p>
      </Box>
      <Box className="critic-reviews">
        {reviews.map((review: MovieReview) => {
          return (
            <Paper key={review.id} className="critic-review-list-item" elevation={11}>
              <li>
                <strong>{review.movie.title}</strong>
                <br/>
                <br/>
                <strong>My rating: {review.rating}</strong>
                <br/>
                <br/>
                <strong className="written-review">My written review: {review.writtenReview}</strong>
                <br/>
                <br/>
                {
                  review.userId === user?.id && (
                    <FormControl>
                      <Button
                        className="delete-button"
                        variant="contained"
                        onClick={() => deleteMovieReviewOnClick(review.id)}
                      >
                        Delete Review
                      </Button>
                    </FormControl>
                  )
                }
              </li>
            </Paper>
          );
        })}
      </Box>
    </CriticViewDiv>
  );
};
