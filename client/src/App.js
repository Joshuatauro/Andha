import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.Component/Navbar';
import LandingPage from './Pages/Landing.Page/LandingPage';
import SinglePostPage from './Pages/SinglePost.Page/SinglePostPage';
import LoginPage from './Pages/Login.Page/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>

            <Switch>
              <Route path="/" exact>
                <Navbar />
                <LandingPage />
              </Route>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/post/:postID" exact >
                <Navbar />
                <SinglePostPage />
              </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
