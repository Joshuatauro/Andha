import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.Component/Navbar';
import LandingPage from './Pages/Landing.Page/LandingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
