import react from "react";

import SignIn from "../../sign-in/sign-in.component";

import "./sign-in-and-sign-up.styles.scss";

//since the states will be kept on the signin and sign up components this page component will be a functional one
const SignInAndSignUpPage = () => (
    <div className="sign-in-and-sign-up">
        <SignIn />
    </div>
);

export default SignInAndSignUpPage;