import { useState } from "react";
import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
  getUserFromDb 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';

const SignInForm = () => {
  const defaultFormFields = {
    email: '',
    password: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  const SignInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userAuth = await signInUserWithEmailAndPassword(email, password);
    getUserFromDb(userAuth)
      .then(userSnapshot => {
        console.log(userSnapshot.data())
      });
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account.</h2>
      <span>Sign In with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={SignInGoogleUser}>Sign In with Google</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;