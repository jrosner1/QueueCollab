import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>
);
function PasswordForgetFormBase(props){
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = event => {
        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setEmail('');
                setError(null);
            })
            .catch(error =>{
                setError(error);
            });
        event.preventDefault();
    };
    const isInvalid = email === '';
    return (
        <form onSubmit={onSubmit}>
            <input 
            name="email" 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email Adress"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
)
export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink}