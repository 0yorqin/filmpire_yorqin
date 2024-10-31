import React from 'react';
import { Typography, Grid2, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Movie = (movie, i) => {
  const classes = useStyles();
  return (
    <Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(movie.i + 1) * 500}>
        <Link className={classes.link} to={`/movie/${movie.movie.id}`}>
          {
            <img
              alt={movie.movie.title}
              className={classes.image}
              src={
                movie.movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.movie.poster_path}`
                  : 'https://www.filmurray.com/200/300'
              }
            />
          }
          <Typography className={classes.title} variant="h5">
            {movie.movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${movie.movie.vote_average} / 10`}
          >
            <div>
              <Rating
                readOnly
                value={movie.movie.vote_average / 2}
                precision={0.1}
              />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid2>
  );
};

export default Movie;
