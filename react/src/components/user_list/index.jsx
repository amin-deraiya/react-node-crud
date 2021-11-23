import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import AddNewUser from './AddNewUser';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState();

  useEffect(() => {
    setUserList();
  }, []);

  const setUserList = () => {
    fetch('http://127.0.0.1:5000/usersList/')
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length) {
            setUsers(result);
          } else {
            setUsers([]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const userView = (id) => {
    const user = users.filter((user) => {
      return user._id === id;
    });
    setViewUser(user[0]);
  };

  const editedUser = (id, username, phone, website, company) => {
    const updatedData = {
      username: username,
      phone: phone,
      website: website,
      company: company,
    };
    fetch('http://127.0.0.1:5000/usersList/updateUser/' + id, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setUserList();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setUserList();
  };

  const addUser = (username, phone, website, company) => {
    const newUser = {
      username: username,
      phone: phone,
      website: website,
      company: company,
    };
    fetch('http://127.0.0.1:5000/usersList/newUser', {
      method: 'POST',
      body: JSON.stringify(newUser),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUserList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = (id) => {
    fetch('http://127.0.0.1:5000/usersList/deleteUser/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          setUserList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container my-3'>
      <h2 className='text-center'>Users List</h2> <br />
      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary ms-auto' data-bs-toggle='modal' data-bs-target='#addUser'>
          <i className='fas fa-user-plus'></i>
        </button>
        <br />
      </div>
      {!users.length && <h1 className='text-center'>No Users Fount</h1>}
      <br />
      <ul className='list-group list-group-flush'>
        {users?.map((user) => {
          return (
            <li key={user._id} className='list-group-item d-flex justify-content-between'>
              <div>
                <span>{user.username}</span>
                <br />
              </div>
              <div>
                <button
                  className='btn btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#viewUser'
                  onClick={() => userView(user._id)}
                >
                  <i className='fal fa-eye'></i>
                </button>
                <button
                  className='btn btn-secondary mx-2'
                  data-bs-toggle='modal'
                  data-bs-target='#editUser'
                  onClick={() => userView(user._id)}
                >
                  <i className='fal fa-pencil-alt'></i>
                </button>
                <button className='btn btn-danger' onClick={() => deleteUser(user._id)}>
                  <i className='fal fa-trash-alt'></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <AddNewUser addUser={addUser} />
      <ViewUser user={viewUser} />
      <EditUser user={viewUser} editedUser={editedUser} />
    </div>
  );
}
