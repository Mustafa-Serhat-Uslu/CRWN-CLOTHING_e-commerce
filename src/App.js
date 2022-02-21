import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; //useSelector == mapStateToProps

import HomePage from "./components/page/homepage/homepage.component";
import ShopPage from "./components/page/shop/shop.component";
import SignInAndSignUpPage from "./components/page/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./components/page/checkout/checkout.component";

import Header from "./components/header/header.component";

import {GlobalStyle} from './global.styles';

import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";

//without exact the router will add pages end to end (if there is no switch) if a sub regex matches
//with just one object header is always present whatever the Routes is
const App = () => {

  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch();

  // checkUserSession is passed to the array bc we want it to behave only when component mounts, on didComponentMount()
  // if that props was passed in from a parent component the story would be diffent
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]); 
  
  // dispatch as a dependency eact time the components mounts since the dispatch func in redefined the component will run useEffect twice I think
  // we want useEffect to run once when component mount but if we dont pass 

  return (
    <div>
    <GlobalStyle/>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

export default App;

// mapStateToProps is reading user state in App to make use a already signed in user doesnt access to sign in page again
// Dispatch passes the action object it receives to every reducer

