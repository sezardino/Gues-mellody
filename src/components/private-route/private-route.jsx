import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppRoute } from "../../const.js";
import { AuthorizationStatus } from "../../reducer/user/user.js";

const PrivateRoute = (props) => {
  const {
    render,
    exact,
    path,
    authorizationStatus,
    location: { state },
  } = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return authorizationStatus === AuthorizationStatus.AUTH ? (
          render()
        ) : (
          <Redirect
            to={{
              pathname: AppRoute.auth,
              state: state,
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.isAuthorizationRequired,
});

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
