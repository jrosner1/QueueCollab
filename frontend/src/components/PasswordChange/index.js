import React, {useState} from 'react';

import { withFirebase } from '../Firebase';
const PasswordChange = (props) => {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = event => {
        props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                setPasswordOne('');
                setPasswordTwo('');
                setError(null);
            })
            .catch(error => {
                setError(error)
            })
        event.preventDefault();
    }

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="passwordOne"
                onChange={e => setPasswordOne(e.target.value)}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                onChange={e => setPasswordTwo(e.target.value)}
                type="password"
                placeholder="Confirm New Password"
            />
            <button type="submit" disabled={isInvalid}>Reset Password</button>

            {error && <p>{error.message}</p>}

        </form>
    )
    
}
export default withFirebase(PasswordChange);
