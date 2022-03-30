import { useState } from 'react';

import axios from 'axios';
import requests from '../../config/requests';

import Teaser from '../../components/Teaser';

import { Search } from '@mui/icons-material';

import './search.css';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function onChange(event) {
    event.preventDefault();
    setQuery(event.target.value);

    // console.log(requests.search);
    const search_URL = `${requests.search}${event.target.value}`;

    async function fetchData() {
      const request = await axios.get(search_URL);
      setResults(request.data.results);
    }

    fetchData();
  }

  //   console.log(results);

  return (
    <main className="main_content">
      <form action="" className="search_movie">
          <input
            type="text"
            placeholder="Search for a movie"
            autoComplete="off"
            value={query}
            onChange={onChange}
          />
        <Search className="icon" />
      </form>
      <ul className="main_content--results">
        {results.length > 0 &&
          results.map((movie) => (
            <Teaser key={movie.id} movie={movie} />
          ))}
      </ul>
    </main>
  );
}