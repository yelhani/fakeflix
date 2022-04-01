import PropTypes from 'prop-types';

import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import { Link } from 'react-router-dom';

import {
  Check,
  Add,
  PlayCircleFilled,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
} from '@mui/icons-material';

import './buttons.css';

/**
 * Icons COMPONENT
 * (buttons group)
 *
 * @param   {object}      props
 * @param   {string}      props.className    [class attribute(s)]
 * @param   {object}      props.addMovie     [movie complete infos]
 * @param   {number}      props.movieId      [movie unique identifier]
 *
 * @returns {Reactnode}   jsx in DOM
 */
export default function Icons({ className, addMovie, movieId }) {
  const { addMovieToWatchList, watchList } = useContext(GlobalContext);
  const { removeMovieFromWatchList } = useContext(GlobalContext);

  let storedMovie = watchList?.find((item) => item.id === addMovie.id);
  const addDisabled = storedMovie ? true : false;

  return (
    <section className={`group_icons ${className}`}>
      <Link to={`/video/${movieId}`}>
        <button className="icon icon_play">
          <PlayCircleFilled />
        </button>
      </Link>
      {addDisabled ? (
        <button
          className="icon icon_check"
          onClick={() => removeMovieFromWatchList(movieId)}
        >
          <Check />
        </button>
      ) : (
        <button
          className="icon icon_add icon_yes"
          onClick={() => addMovieToWatchList(addMovie)}
        >
          <Add />
        </button>
      )}
      <button className="icon icon_thumb icon_yes">
        <ThumbUpOffAlt />
      </button>
      <button className="icon icon_thumb icon_no">
        <ThumbDownOffAlt />
      </button>
    </section>
  );
}

/**
 * Icons PROPTYPES
 */
Icons.propTypes = {
  className: PropTypes.string,
  addMovie: PropTypes.object.isRequired,
  movieId: PropTypes.number.isRequired,
};
