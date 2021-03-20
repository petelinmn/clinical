import '../App.css';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Search.css'

function Search() {
  const params = useParams();
  const [state, setState] = useState({
    searchString: params.text ? params.text : '',
    prevSearchString: params.text
  });
  useEffect(() => {
    if (state.prevSearchString !== params.text) {
      setState({ 
        searchString: params.text, 
        prevSearchString: params.text
      });
    }
  });
  const history = useHistory();
  return (
    <div className="search">
      <input value={state.searchString} onChange={e => {
        setState({ ...state, searchString: e.target.value });
      }} onKeyDown={e => {
        if (e.key === 'Enter') {
          history.push(`/search/${state.searchString}`);
        }
      }} />
      <button disabled={!state.searchString} onClick={() => {
        history.push(`/search/${state.searchString}`);
      }}>Go</button>
    </div>
  );
}

export default Search;
