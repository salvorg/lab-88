import React from 'react';
import noImage from '../../../assets/images/noImage.png';
import {apiURL} from "../../../constants";
import {Card, CardActions, CardHeader, CardMedia, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

const ImageCardMedia = styled(CardMedia)({
  width: 0,
  paddingLeft: '26.25%',
});

interface Props {
  id: string;
  displayName: string;
  title: string;
  image: string | null;
  createdAt: string;
}

const PostItem: React.FC<Props> = ({
  id,
  displayName,
  title,
  image,
  createdAt,
                                   }) => {
  const newsDateTime = dayjs(createdAt).format('DD.MM.YYYY HH:mm');
  let cardImage = noImage;

  if (image) {
    cardImage = apiURL + '/' + image;
  }


  return (
    <Grid item id={id}>
      <Card sx={{display: "flex"}}>
        <ImageCardMedia image={cardImage} title={title}/>
        <Grid>
          <CardHeader title={newsDateTime + ' by ' + displayName}/>
          <CardActions>
            <Typography variant="h5" component={Link} to={'/news/' + id} sx={{pl: 1}}>{title}</Typography>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostItem;