import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import {
  Box,
  CircularProgress,
  Grid2,
  Typography,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { MovieList, Pagination } from '..';

import useStyles from './styles';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  const classes = useStyles();
  const date = new Date(data?.birthday);
  const history = useNavigate();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignitem="true" s="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignitem="true" s="center">
        <Typography variant="h6" align="center">
          Something went wrong... <Link to="/">Go back</Link>
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid2 container spacing={3} className={classes.containerSpaceAround}>
        <Grid2 item="true" size={{ sm: 12, lg: 4 }}>
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid2>

        <Grid2
          item="true"
          className={classes.actorInfo}
          size={{ sm: 12, lg: 7 }}
        >
          <Typography variant="h3" align="left" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" align="left" gutterBottom>
            Born: &nbsp;{date.toDateString()} / {data?.place_of_birth}
          </Typography>
          <Typography variant="body1" align="justify">
            {data?.biography || 'No information about this actor'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent={'space-around'}>
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history(-1)}>
              BACK
            </Button>
          </Box>
        </Grid2>
      </Grid2>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
