import React, { useContext, useEffect, useState } from 'react'
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
import Search from './Pages/Search.Page/Search';
import Hiring from './Pages/Jobs.Page/Hiring';
import CreateJob from './Pages/CreateJob/CreateJob';
import MobileNavbar from './Components/Navbar.Component/MobileNavbar';

function App() {
  const { checkUserLoggedIn } = useContext(AuthContext)

  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 750 ? false : true)

  
  const setWidth = () => {
    setIsMobileView(window.innerWidth > 750 ? false : true)
  }
  
  window.addEventListener('resize', setWidth)
  
  useEffect(() => {
    setWidth()
    checkUserLoggedIn()
    console.log('hello')
  }, [])
  return (
    <div className="App">
      <Router>

            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/" exact>
                <Navbar />
                <LandingPage />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/post/:postID" exact >
                <Navbar />
                <SinglePostPage />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/companies" exact>
                <Navbar />
                <AllCompanies />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/companies/:companyName" exact>
                <Navbar />
                <CompanyDetails />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/create" exact>
                <Navbar />
                <CreatePost />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/add/job" exact>
                <Navbar/>
                <CreateJob />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/settings" exact>
                <Navbar />
                <SettingPage />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/user/:username" exact>
                <Navbar />
                <UserProfile />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/user/:username/comments" exact>
                <Navbar />
                <UserProfileComments />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/user/:username/liked" exact>
                <Navbar />
                <UserProfileLiked />
              </Route>
              <Route path="/search" >
                <Navbar />
                <Search />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
              <Route path="/hiring" >
                <Navbar />
                <Hiring />
                {
                  isMobileView ? <MobileNavbar /> : ""
                }
              </Route>
            </Switch>
      </Router>
    </div>
  );
}

export default App;
