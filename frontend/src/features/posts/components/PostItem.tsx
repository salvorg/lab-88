import React from 'react';
import noImage from '../../../assets/images/noImage.png';
import {apiURL} from "../../../constants";
import {Card, CardActions, CardHeader, CardMedia, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

const ImageCardMedia = styled(CardMedia)({
  width: 0,
  paddingLeft: '12%',
});

interface Props {
  id: string;
  displayName: string;
  title: string;
  image: string | null;
  createdAt: string;
  commentCount: number;
}

const PostItem: React.FC<Props> = ({
  id,
  displayName,
  title,
  image,
  createdAt,
  commentCount,
                                   }) => {
  const dateTime = dayjs(createdAt).format('DD.MM.YYYY HH:mm');
  let cardImage = noImage;

  if (image) {
    cardImage = apiURL + '/' + image;
  }


  return (
    <Grid item id={id}>
      <Card sx={{display: "flex"}}>
        <ImageCardMedia image={cardImage} title={title}/>
        <Grid>
          <CardHeader title={dateTime + ' by ' + displayName}/>
          <CardActions sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <Typography variant="h5" component={Link} to={'/post/' + id} sx={{pl: 1}}>{title}</Typography>
            <Typography component="p" sx={{pl: 1}}>comments: {commentCount}</Typography>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostItem;