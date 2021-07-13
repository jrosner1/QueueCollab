import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {withFirebase} from '../Firebase';

function SignUp(){ return (
    <div>
        <h1>SignUp</h1>
            <SignUpForm />
    </div>
);
}


function SignUpFormBase(props){
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async event => {
        event.preventDefault();
        //TODO make the sign up user function that calls from my API
        
        props.firebase
            .doSignUpWithEmailAndPassword(email, passwordOne, phoneNumber, userName)
            .then(token => {
                
            })
            .catch(error => {
                setError({error})
            })
        
        return null;
    }

    const isInvalid = 
        passwordOne !== passwordTwo || passwordOne === '' || email === '' || userName === '' || phoneNumber === '';

    return(
        <div className="signUpWrapper">
            <form onSubmit={onSubmit}>
                <label>
                    <p>UserName</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Phone Number</p>
                    <input type="tel" onChange={e => setPhoneNumber(e.target.value)}/>
                </label>
                <label>
                    <p>PasswordOne</p>
                    <input type="password" onChange={e => setPasswordOne(e.target.value)}/>
                </label>
                <label>
                    <p>PasswordTwo</p>
                    <input type="password" onChange={e => setPasswordTwo(e.target.value)}/>
                </label>
                <div>
                    <button disabled={isInvalid} type="submit">Submit</button>
                </div>
                {error && <p>{error.message}</p>}
                
            </form>
        </div>
    );
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withFirebase(SignUpFormBase)
export default SignUp;
export {SignUpForm, SignUpLink};