import React, {useState, useEffect} from 'react';
import {withFirebase} from '../Firebase';
function Admin(props){
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const userList = Object.keys(usersObject).map(key => ({...usersObject[key], uid: key,}));
            setLoading(false);
            setUsers(userList);
            
        return props.firebase.users().off();
        }); 
    }, [])

    return (
        <div>
            {loading && <div>Loading ...</div>}
            <UserList users={users} />
        </div>
    );
}

const UserList = ({users}) => (
    <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID: </strong> {user.uid }
        </span>
        <span>
          <strong>E-Mail: </strong> {user.email }
        </span>
        <span>
          <strong>Username: </strong> {user.userName }
        </span>
      </li>
    ))}
  </ul>

)
export default withFirebase(Admin);