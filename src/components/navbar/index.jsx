import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/logo_fakeflix.png';
import avatar from '../../assets/avatar_amandine.png';
// import logo from '../../assets/logo_netflix.svg';
// import avatar from '../../assets/avatar_fakeflix.jpg';

import { menu } from './menu';

import {
  ArrowDropDown,
  ArrowDropUp,
  Notifications,
  PowerSettingsNew,
  Search,
  Tune,
} from '@mui/icons-material';

import usePopup from '../Popup/usePopup.js';
// import SearchMovie from '../Search';

import './navbar.css';

/**
 * Navbar COMPONENT
 * @returns {Reactnode}   jsx in DOM
 */
export default function Navbar() {
  // const windowWidth = window.innerWidth
  // console.log(windowWidth);

  const location = useLocation();
  const isVideoPage = location.pathname.includes('video');

  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // handle Popup || Modal component actions
  const { isOpen, toggle, keyboardEscape } = usePopup();
  const homePage = ""
  // press escape to close Popup || Modal component
  useEffect(() => {
    keyboardEscape();
  });

  return (
    <>
      {isVideoPage ? null : (
        <nav className={isScrolled ? 'navbar scrolled' : 'navbar'}>
          <div className="navbar_container">
            <ul className="navbar_left">
              <Link to={'/'}>
                <img
                  src={logo}
                  alt="Netflix Logo"
                  className="navbar_left--logo"
                />
              </Link>
              {menu.map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '')}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="navbar_right">
              {/* <SearchMovie /> */}
              <Link to={'/search'}>
                <Search className="navbar_right--search" />
              </Link>

              <Notifications />
              <img
                src={avatar}
                alt="avatar Amandine"
                className="navbar_right--avatar"
              />
              {isOpen ? (
                <>
                  <ArrowDropUp onClick={() => toggle(homePage)} />
                  <div className="navbar_right--options">
                    <button>
                      <PowerSettingsNew />
                    </button>
                    <button>
                      <Tune />
                    </button>
                  </div>
                </>
              ) : (
                <ArrowDropDown onClick={() => toggle(homePage)} />
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
