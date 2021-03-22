import '../App.css';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Search.css'

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M12.5 11H11.71L11.43 10.73C12.4439 9.55402 13.0011 8.0527 13 6.5C13 5.21442 12.6188 3.95772 11.9046 2.8888C11.1903 1.81988 10.1752 0.986756 8.98744 0.494786C7.79973 0.00281635 6.49279 -0.125905 5.23192 0.124899C3.97104 0.375703 2.81285 0.994767 1.90381 1.90381C0.994767 2.81285 0.375703 3.97104 0.124899 5.23192C-0.125905 6.49279 0.00281635 7.79973 0.494786 8.98744C0.986756 10.1752 1.81988 11.1903 2.8888 11.9046C3.95772 12.6188 5.21442 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
      fill="#1B3548"
    />
  </svg>
);


const EraseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="erase-icon">
    <path
      d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
      fill={"#1B3548"}
    />
  </svg>
);

interface ISearchParams {
  text: string
}

interface ISearchState {
  searchString: string,
  oldParamText: string
}

function Search() {
  const params = useParams<ISearchParams>();
  const [state, setState] = useState<ISearchState>({
    searchString: params.text ?? '',
    oldParamText: params.text
  });

  useEffect(() => {
    if (params.text !== state.oldParamText) {
      setState({ 
        searchString: params.text ?? '', 
        oldParamText: params.text ?? ''
      });
    }
  }, [params.text, state.oldParamText]);

  const history = useHistory();
  const doSearch = () => history.push(`/search/${state.searchString}`);

  const renderSearch = (): JSX.Element => (
    <div className="search">
      <button disabled={!state.searchString} onClick={doSearch}>
        <SearchIcon/>
      </button>
      <input value={state.searchString} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, searchString: e.target.value })} 
        onKeyDown={(e: React.KeyboardEvent) => (e.key === 'Enter') && doSearch()} 
      />
      <button disabled={!state.searchString} onClick={() => setState({ ...state, searchString: '' })}>
        {!!state.searchString && <EraseIcon />}
      </button>
    </div>
  );

  return params?.text
    ? renderSearch()
    : (
      <div className="init-search">
        {renderSearch()}
      </div>
    );
}

export default Search;
