import '../App.css';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Search.css'

function Search() {
  const params = useParams();
  const [searchString, setSearchString] = useState(params.text ? params.text : '');
  const history = useHistory();
  return (
    <div className="search">
      <input value={searchString} onChange={e => {
        setSearchString(e.target.value);
      }} onKeyDown={e => {
        if (e.key === 'Enter') {
          history.push(`/search/${searchString}`);
        }
      }} />
      <button disabled={!searchString} onClick={() => {
        history.push(`/search/${searchString}`);
      }}>Go</button>
    </div>
  );
}

export default Search;
