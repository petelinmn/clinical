import '../App.css';
import fieldDefinitions from '../fieldDefinitions.json'
import { useState } from 'react';

const baseUrl = 'https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search';

function Search(props) {
  const [searchString, setSearchString] = useState('');
  return (
    <div className="search">
          <input value={searchString} onChange={e => {
            setSearchString(e.target.value);
          }} />
          <button disabled={!searchString} onClick={() => {
            const maxList = 10;
            const df = `&df=${fieldDefinitions.map(item => item.name)
              .reduce((acc, curItem) => acc + ',' + curItem)}`;

            fetch(`${baseUrl}?maxList=${maxList}&terms=${searchString}${df}`)
            .then(response => response.json().then(result => {
              if (props.onLoad) {
                props.onLoad(result[3]);
              }
            }))
          }}>search</button>
    </div>
  );
}


export default Search;
