import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        gender:'',
        name: '',
        username: '',
        password: '',
        email:'',
        dob:''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div>
            <h2>Create User</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div>
                    <label>Gender</label>
                    <input type="text" name="gender" value={user.gender} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.gender &&
                    <div >Gender is required</div>
                    }
                </div>
                <div>
                    <label> Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.name &&
                    <div>First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                    <div>Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                    <div>Password is required</div>
                    }
                </div>
                <div>
                    <button>
                        {registering && <span></span>}
                        Register
                    </button>
                    <Link to="/login" >Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage }