import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/page/homepage/homepage.component";
import ShopPage from "./components/page/shop/shop.component";
import SignInAndSignUpPage from "./components/page/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

//without exact the router will add pages end to end (if there is no switch) if a sub regex matches
//with just one object header is always present whatever the Routes is
class App extends React.Component{
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });


          console.log(this.state);
        });
        
      }
      else{
        this.setState({currentUser: userAuth });
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
