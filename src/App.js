
import './App.css';
import Grid from './components/Grid';
import SearchPage from './components/Search'
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <SearchPage onLoad={data => {
        setData(data);
      }}/>
      <Grid data={data}/>
    </div>
  );
}

export default App;
