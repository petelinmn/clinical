
import './App.css';
import Grid from './components/Grid';
import SearchPage from './components/Search'
import Card from './components/Card'
import { useState } from 'react';
import {
  HashRouter  as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const renderMainPage = path => (
    <>
      <SearchPage onLoad={data => {
        setData(data);
      }}/>
      <Grid data={data}/>
    </>
  );

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/card/:npi">
            <Card />
          </Route>
          <Route path={"/search/:text"}>
            {renderMainPage()}
          </Route>
          <Route path={"/"}>
            {renderMainPage()}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
