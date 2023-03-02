import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid container alignItems="center">
      <Button component={NavLink} to="/register" color="inherit">Register</Button>
      <Typography component="span" color="lightgrey">or</Typography>
      <Button component={NavLink} to="/login" color="inherit">Login</Button>
    </Grid>
  );
};

export default AnonymousMenu;