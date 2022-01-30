import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./components/page/homepage/homepage.component";
import ShopPage from "./components/page/shop/shop.component";
import SignInAndSignUpPage from "./components/page/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./components/redux/user/user.actions";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

//without exact the router will add pages end to end (if there is no switch) if a sub regex matches
//with just one object header is always present whatever the Routes is
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      
      else{
      setCurrentUser({ userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

//Dispatch passes the action object it receives to every reducer
const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
