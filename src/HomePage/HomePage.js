import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);



    const fetchData = () => {
        return axios.get("https://randomuser.me/api/0.8/?results=20")
            .then((response) =>{console.log(response);
            const res = response;
            setUserList(res);}
            );}

    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span>ERROR: {users.error}</span>}
            {users.items &&
            <ul>
                {users.items.map((user, index) =>
                    <li key={user.id}>
                        {user.name}
                    </li>
                )}
            </ul>
            }
            <ul>
                {userList.results.map((user) =>
                    <li>{user}
                    </li>
                )}


            </ul>

            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    );
}

export { HomePage }