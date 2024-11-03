import React from 'react';
import {
  Modal,
  Typography,
  Box,
  Grid2,
  Button,
  Rating,
  ButtonGroup,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;

  const addToFavourites = () => {};
  const addToWatchList = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" align="center">
          Something went wrong... <Link to="/">Go back</Link>
        </Typography>
      </Box>
    );
  }

  return (
    <Grid2 container className={classes.containerSpaceAround}>
      {/* poster */}
      <Grid2 item size={{ sm: 12, lg: 4 }}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid2>

      <Grid2 item container direction="column" size={{ sm: 12, lg: 7 }}>
        {/* title */}
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid2 item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} precision={0.1} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min
            {data?.spoken_languages.length > 0
              ? ` / ${data?.spoken_languages[0].name}`
              : ''}
          </Typography>
        </Grid2>

        {/* genres & overview */}
        <Grid2 item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              key={genre.name}
              style={{ textDecoration: 'none' }}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt=""
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid2>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>

        {/* cast */}
        <Typography variant="h5" gutterBottom style={{ marginBottom: '15px' }}>
          Top Cast
        </Typography>
        <Grid2 item container spacing={2}>
          {data &&
            data?.credits?.cast?.slice(0, 6).map(
              (character, i) =>
                character.profile_path && (
                  <Grid2
                    key={i}
                    item
                    xs={4}
                    md={2}
                    component={Link}
                    to={`/actors/${character.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <img
                      className={classes.castImage}
                      src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                      alt={character.name}
                    />
                    <Typography color="textPrimary">
                      {character?.name}
                    </Typography>
                    <Typography color="textSecondary">
                      {character.character.split('/')[0]}
                    </Typography>
                  </Grid2>
                )
            )}
        </Grid2>

        {/* buttons */}
        <Grid2 item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid2 item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button href={`#`} endIcon={<Theaters />} onClick={() => {}}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid2>
            <Grid2 item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavourites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    variant="subtitle2"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid2>
          </div>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default MovieInformation;
