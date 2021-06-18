import React, {FC, useContext, useState} from 'react';
import {RouteComponentProps, useParams} from "react-router";
import {updateMovieReview} from "services/movie.service";
import {UserContext} from "services/user.context";
import {withRouter} from "react-router-dom";
import {MovieReviewUpdateRequest} from "model/Movie";
import {User} from 'model/User';
import ChatIcon from '@material-ui/icons/Chat';
import styled from "styled-components";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";


const CreateReviewDiv = styled.div`
  &.create-review {
    display: flex;
    flex-flow: column nowrap;;
    justify-content: center;
    align-items: center;

    .title-row {
      display: flex;
      flex-flow: row nowrap;;
      justify-content: center;
      align-items: center;
      margin: 10px;

      .chat-box-icon {
        margin: 2px;
      }

      .title-text {
        margin: 2px;
        font-size: 18px;
      }
    }

    // a general css rule to add margin around all form-controls
    .MuiFormControl-root {
      margin: 5px;
    }

    // css specific to rating select input
    .rating-form-control {
      min-width: 120px;
      margin: 2px;
    }

    // css specific to review text input
    .review-form-control {
      .MuiFormControl-root {
        width: 400px;
      }
    }
  }
`;

interface CreateReviewParams {
  id: string;
}

const RouterlessCreateReview: FC<RouteComponentProps> = (props) => {
  const {history} = props;
  const {user} = useContext(UserContext);
  const [rating, setRating] = useState<number>();

  const [writtenReview, setWrittenReview] = useState("");

  const {id: movieIdString} = useParams<CreateReviewParams>(); // rename url id to movie id
  const movieId = Number(movieIdString);

  const onSubmit = () => {
    if (!user) {
      alert("no user logged in");
      return
    }

    const currentUser: User = user!;

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    if (!currentUser.id) {
      alert("Please login, user id is null");
      return;
    }

    const request: MovieReviewUpdateRequest = {
      userId: currentUser.id,
      movieId: movieId,
      rating: rating,
      writtenReview: writtenReview
    };

    updateMovieReview(request).then(newReview => {
      console.log("created movie review:")
      console.log(newReview);
      history.push(`/movies/${movieId}`);
    });
  };

  return (
    <CreateReviewDiv className="create-review">
      <div className="title-row">
        <ChatIcon className="chat-box-icon"/>
        <div className="title-text">Your rating of this movie</div>
      </div>

      <FormControl variant="outlined"
                   className="rating-form-control">
        <InputLabel htmlFor="rating-input">Rating</InputLabel>
        <Select
          key="Rating"
          id="rating-input"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          label="Rating"
        >
          <MenuItem value="">Select Rating (1 low - 10 high)</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={1}>1</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined"
                   className="review-form-control">
        <TextField
          id="review-label"
          label="Review"
          name="review"
          multiline={true}
          onChange={(event) => setWrittenReview(event.target.value)}
          value={writtenReview}
          variant="outlined"
        />
      </FormControl>

      <FormControl className="review-submit-button">
        <Button
          name="rating"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={rating == null}
        >
          Leave Review
        </Button>
      </FormControl>
    </CreateReviewDiv>
  );
};

export const CreateReview = withRouter(RouterlessCreateReview);