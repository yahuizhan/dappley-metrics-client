import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import History from './components/History';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/History" component={History}/>
      </Switch>
    </Router>
  );
}

export default App;
