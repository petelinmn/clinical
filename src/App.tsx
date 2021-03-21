
import './App.css';
import Grid from './components/Grid';
import Search from './components/Search'
import Card from './components/Card'
import {
  HashRouter  as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/card/:npi">
          <Card />
        </Route>
        <Route path={"/search/:text"}>
          <>
            <Search />
            <Grid />
          </>
        </Route>
        <Route path={"/"}>
          <Search />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
