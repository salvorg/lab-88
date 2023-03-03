import React from 'react';
import {useParams} from "react-router";

const Post = () => {
  const {id} = useParams();

  return (
    <div>
      <h4>{id}</h4>
    </div>
  );
};

export default Post;