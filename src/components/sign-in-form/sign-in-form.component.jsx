import { useState } from "react";
import { 
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
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

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  
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
    try {
      const userAuth = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();

      // getUserFromDb(userAuth)
      //   .then(userSnapshot => {
      //     console.log(userSnapshot.data())
      //   });

    } catch(error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password.')
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
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
          <Button type="button" buttonType="google" onClick={SignInGoogleUser}>Sign In with Google</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;