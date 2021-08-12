import React from 'react';
import {withFirebase} from '../Firebase';


const SignOutButton = ({firebase}) => {
    const doSignOut = () => {
        firebase.doSignOut();
        localStorage.clear();
    }

    return (
        <button type="button" onClick={doSignOut}>
            Sign Out
        </button>
    )
}
export default withFirebase(SignOutButton);