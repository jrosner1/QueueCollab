import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChange from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser =>(
        <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm />
            <PasswordChange />
        </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !! authUser;
export default withAuthorization(condition)(AccountPage);
