import React, {useState} from 'react';
import {Card, Grid, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {CommentWithoutId} from "../../types";

interface Props {
  id: string;
  onSubmit: (mutation: CommentWithoutId) => void;
  isLoading?: boolean;
}

const CommentForm: React.FC<Props> = ({id, onSubmit, isLoading = false}) => {
  const [state, setState] = useState<CommentWithoutId>({
    postId: id,
    comment: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({
      postId: id,
      comment: '',
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <Card sx={{padding: 2, marginTop: 0}}>
      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              multiline
              id="comment" label="What are your thoughts?"
              value={state.comment}
              onChange={inputChangeHandler}
              name="comment"
              required
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
            >comment</LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default CommentForm;