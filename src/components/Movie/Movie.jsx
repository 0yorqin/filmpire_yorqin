import React from 'react';
import { Typography, Grid2, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Movie = (movie, i) => {
  const classes = useStyles();
  console.log(movie, i);
  return (
    <Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Typography className={classes.title} variant="h5">
        {movie.movie.title}
      </Typography>
    </Grid2>
  );
};

export default Movie;
