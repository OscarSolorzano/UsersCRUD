import React from 'react';

const UsersList = ({ users , deleteUser, selectUser }) => {
    return (
        <ul className='users'>
            {users.map(user => (
                <li key={user.id} className='user-card'>
                    <h2>
                        {user.first_name} {user.last_name}
                    </h2>
                    <div className='user-info'>
                        <h3>E-MAIL</h3>
                        <p>{user.email}</p>
                        <h3>Birthday</h3>
                        <p>
                            <i className="fa-solid fa-gift"></i>
                            {user.birthday}
                        </p>
                    </div>
                    <div className='btn-container'>
                        <button
                         className='delete-btn'
                         onClick={() => deleteUser(user.id)}
                         >
                            <i className="fa-solid fa-trash-can fa-lg"></i>
                        </button>
                        <button
                         className='edit-btn'
                         onClick={() => selectUser(user)}
                         >
                            <i className="fa-solid fa-pen fa-lg"></i>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UsersList;