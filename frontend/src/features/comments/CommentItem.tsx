import React from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {CommentWithUser} from "../../types";

interface Props {
  comment: CommentWithUser;
}

const CommentItem: React.FC<Props> = ({comment}) => {
  return (
    <Grid item>
      <Card sx={{padding: 2, marginTop: 1}}>
        <Typography color="grey">
          {comment.user.displayName}:
        </Typography>
        <Typography color="primary.main">
          {comment.comment}
        </Typography>
      </Card>
    </Grid>
  );
};

export default CommentItem;