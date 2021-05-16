import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.Component/Navbar';
import LandingPage from './Pages/Landing.Page/LandingPage';
import SinglePostPage from './Pages/SinglePost.Page/SinglePostPage';
import LoginPage from './Pages/Login.Page/LoginPage';
import AllCompanies from './Pages/AllCompanies.Page/AllCompanies';
import CompanyDetails from './Pages/CompanyDetails.Page/CompanyDetails';
import CreatePost from './Pages/CreatePost.Page/CreatePost';
import SettingPage from './Pages/Setting.Page/SettingPage';

function App() {
  return (
    <div className="App">
      <Router>

            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/" exact>
                <Navbar />
                <LandingPage />
              </Route>
              <Route path="/post/:postID" exact >
                <Navbar />
                <SinglePostPage />
              </Route>
              <Route path="/companies" exact>
                <Navbar />
                <AllCompanies />
              </Route>
              <Route path="/companies/:companyName" exact>
                <Navbar />
                <CompanyDetails />
              </Route>
              <Route path="/create" exact>
                <Navbar />
                <CreatePost />
              </Route>
              <Route path="/settings" exact>
                <Navbar />
                <SettingPage />
              </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
