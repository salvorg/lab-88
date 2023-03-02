import React, {useEffect, useState} from 'react';
import {PostMutation} from "../../../types";
import {useAppSelector} from "../../../app/hooks";
import {Grid, TextField} from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import {LoadingButton} from '@mui/lab';
import {selectPostsCreating} from "../postsSlice";
import {useNavigate} from "react-router-dom";

interface Props {
  onSubmit: (mutation: PostMutation) => void;
}

const PostForm: React.FC<Props> = ({onSubmit}) => {
  const navigate = useNavigate();
  const creating = useAppSelector(selectPostsCreating);
  const [a, setA] = useState(true);
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  useEffect(() => {
    if (state.description.length || state.image) {
      setA(false);
    }

    if (state.description.length === 0  && state.image === null) {
      setA(true);
    }
  }, [state]);

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            onChange={fileInputChangeHandler}
            name="image"
          />
        </Grid>

        <Grid item xs>
          <LoadingButton disabled={a} loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;