import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.Component/Navbar';
import LandingPage from './Pages/Landing.Page/LandingPage';
import SinglePostPage from './Pages/SinglePost.Page/SinglePostPage';
import LoginPage from './Pages/Login.Page/LoginPage';
import AllCompanies from './Pages/AllCompanies.Page/AllCompanies';
import CompanyDetails from './Pages/CompanyDetails.Page/CompanyDetails';
import CreatePost from './Pages/CreatePost.Page/CreatePost';
import SettingPage from './Pages/Setting.Page/SettingPage';
import { AuthContext } from './State/AuthContext';
import UserProfile from './Pages/UserProfile.Page/UserProfile';
import UserProfileComments from './Pages/UserProfile.Page/UserProfileComments';
import UserProfileLiked from './Pages/UserProfile.Page/UserProfileLiked';

function App() {
  const { loggedIn } = useContext(AuthContext)
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
              <Route path="/user/:username" exact>
                <Navbar />
                <UserProfile />
              </Route>
              <Route path="/user/:username/comments" exact>
                <Navbar />
                <UserProfileComments />
              </Route>
              <Route path="/user/:username/liked" exact>
                <Navbar />
                <UserProfileLiked />
              </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
