import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

function SignInFormBase(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const onSubmit = event =>{
        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error)
            })
        event.preventDefault();
    };

    const isInvalid = password === '' || email === '';

    return (
        <form onSubmit={onSubmit}>
            <label>
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <button disabled={isInvalid} type="submit">
                Sign In
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );

}

const SignInForm = withRouter(withFirebase(SignInFormBase))




export default SignInPage;
export {SignInForm};