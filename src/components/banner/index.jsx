import { useState, useEffect } from 'react';
import axios from 'axios';
import requests, { BASE_URL, REACT_APP_API_KEY, IMG_URL } from '../../config/requests';
import { Link } from 'react-router-dom';

import Select from 'react-select';
import { options } from './options';

import { InfoRounded, PlayCircleFilledRounded } from '@mui/icons-material';

import usePopup from '../Popup/usePopup.js';
import Popup from '../Popup';

import { genreFinder } from '../Content/genres.js';

import './banner.css';

export default function Banner({ type }) {
  // get movie data
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  // console.log(movie);

  // get movie image
  const IMG_PATH = `${movie?.backdrop_path}`;
  // handle banner style for movie image
  const bannerStyle = {
    backgroundImage: `url(${IMG_URL}${IMG_PATH})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  // handle description length
  function truncateText(string, n) {
    return string?.length > n
      ? string.substr(0, n - 1) + '...'
      : 'No description';
  }

  // get casting data
  const [casting, setCasting] = useState([]);
  const creditsURL = `${BASE_URL}/movie/${movie?.id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`;
  // console.log(creditsURL);
  useEffect(() => {
    async function fetchCasting() {
      const credits = await axios.get(creditsURL);
      // get the 3 main actors
      if (credits.data.cast.length > 3) credits.data.cast.length = 3;
      setCasting(credits.data.cast);
    }
    fetchCasting();
  }, [creditsURL]);

  // handle popup
  const { isOpen, toggle, escToClose } = usePopup();
  useEffect(() => {
    window.addEventListener('keydown', escToClose);
    return () => window.removeEventListener('keydown', escToClose);
  });

  return (
    <>
      <header className="banner" style={bannerStyle}>
        {type && (
          <div className="banner_category">
            <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
            <Select
              name="genre"
              id="genre"
              options={options}
              defaultValue={options[0]}
              className="react_select-container"
              classNamePrefix="react_select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  primary25: '#d81f26',
                  primary: '#141414',
                  backgroundColor: '#141414',
                },
              })}
            />
          </div>
        )}
        <article className="banner_content">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_title}
          </h1>
          <p className="banner_description">
            {truncateText(movie?.overview, 150)}
          </p>
          {movie.id && (
            <div className="banner_options">
              <Link to={`/video/${movie?.id}`}>
                <button className="banner_options--play">
                  <PlayCircleFilledRounded />
                  Play
                </button>
              </Link>
              <button className="banner_options--info" onClick={toggle}>
                <InfoRounded />
                Info
              </button>
            </div>
          )}
        </article>
        <div className="vignette"></div>
      </header>
      <Popup
        popup={isOpen}
        close={toggle}
        style={bannerStyle}
        title={movie?.title || movie?.name || movie?.original_title}
        vote={movie.vote_average * 10}
        synopsis={movie?.overview || 'No description available'}
        date={
          movie?.release_date?.slice(0, -6) ||
          movie?.first_air_date?.slice(0, -6)
        }
        genre={isOpen && genreFinder(movie)}
        casting={casting.map((actor) => (
          <li key={actor?.name} className="teaser_infos--casting">
            {actor?.name}
          </li>
        ))}
      />
    </>
  );
}
