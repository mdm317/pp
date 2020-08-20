import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth/index";
import Feed from "../Routes/Feed";
import Search from "../Routes/Search/index";
import Profile from "../Routes/Profile/index";
import Explore from "../Routes/Explore";



const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/explore" component={Explore} />
    <Route exact path="/:userid" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</>
  </Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;