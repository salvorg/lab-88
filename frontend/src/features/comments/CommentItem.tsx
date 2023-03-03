import React from 'react';
import {Card, Grid, Typography} from "@mui/material";
import {CommentWithUser} from "../../types";
import dayjs from "dayjs";

interface Props {
  comment: CommentWithUser;
}

const CommentItem: React.FC<Props> = ({comment}) => {
  const dateTime = dayjs(comment.createdAt).format('DD.MM.YYYY HH:mm');
  return (
    <Grid item>
      <Card sx={{padding: 2, mt: 1}}>
        <Typography color="grey" fontSize={15}>
          {comment.user.displayName} at {dateTime}:
        </Typography>
        <Typography fontSize={20}>
          {comment.comment}
        </Typography>
      </Card>
    </Grid>
  );
};

export default CommentItem;