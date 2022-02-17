import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";

import "./App.css";

import HomePage from "./components/page/homepage/homepage.component";
import ShopPage from "./components/page/shop/shop.component";
import SignInAndSignUpPage from "./components/page/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./components/page/checkout/checkout.component";

import Header from "./components/header/header.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { selectCurrentUser } from "./redux/user/user.selector"; 
import { checkUserSession } from "./redux/user/user.actions";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

//without exact the router will add pages end to end (if there is no switch) if a sub regex matches
//with just one object header is always present whatever the Routes is
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
  

//reading user state in App to make use a already signed in user doesnt access to sign in page again
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

//Dispatch passes the action object it receives to every reducer

export default  connect(mapStateToProps, mapDispatchToProps)(App);
