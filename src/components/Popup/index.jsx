import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { IMG_URL } from '../../config/requests';

import { Cancel } from '@mui/icons-material';

import Icons from '../Buttons';
import Content from '../Content';

import './popup.css';

export default function Popup({
  popup,
  close,
  image,
  addMovie,
  movieId,
  title,
  vote,
  synopsis,
  date,
  casting,
  genre,
}) {
  // handle ARIA attributes
  // prevent body from scrolling when popup is open
  useEffect(() => {
    const popupRoot = document.getElementById('popup');

    popup && document.body.setAttribute('arias-hidden', 'true');
    popup && popupRoot.setAttribute('arias-hidden', 'false');
    popup && (document.body.style.overflow = 'hidden');

    !popup && document.body.setAttribute('arias-hidden', 'false');
    !popup && (document.body.style.overflow = 'unset');
  }, [popup]);

  return createPortal(
    <>
      {popup && (
        <main
          autoFocus
          id="popup"
          className="popup"
          role="main"
          onClick={() => {
            close();
          }}
        >
          <section className="popup_container">
            <button className="popup_close" onClick={close}>
              <Cancel className="popup_close--icon" />
            </button>
            <header
              className="popup_header"
              style={{
                backgroundImage: `url(${IMG_URL}${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            >
              <div className="teaser_vignette"></div>
            </header>
            <Icons
              className={'popup_icons'}
              addMovie={addMovie}
              movieId={movieId}
            />
            <article className="popup_content">
              <main className="popup_main">
                <Content title={title} vote={vote} synopsis={synopsis} />
              </main>
              <aside className="popup_aside">
                <Content date={date} casting={casting} genre={genre} />
              </aside>
            </article>
          </section>
        </main>
      )}
    </>,
    document.body
  );
}
