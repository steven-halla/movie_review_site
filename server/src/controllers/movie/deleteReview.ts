import {db} from "../../models";
import {assertUserIdIsAuthed} from "../../auth/assertUserIdIsAuthed";

export const deleteReview = (req, res) => {
  const movieReviewId = req.params.id;

  db.MovieReview
    .findByPk(movieReviewId)
    .then(review => {
      console.log("review: " + JSON.stringify(review));

      // this check asserts the user id in the calling jwt is the same as req.body.userId (for security)
      if (!assertUserIdIsAuthed(req, res, review.userId)) {
        return;
      }

      return db.MovieReview.destroy({
        where: {
          id: movieReviewId
        }
      });
    })
    .then(review => {
      return res.json(review);
    });
};
