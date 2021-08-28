import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const LibraryNav = () => {
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LIBRARY_HOME}>Library Home</Link>
            </li>
            <li>
                <Link to={ROUTES.LIBRARY_HOME}>Library Home</Link>
            </li>


        </ul>
    </div>
}
export default LibraryNav;