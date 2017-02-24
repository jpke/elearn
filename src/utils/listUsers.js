import React from 'react'

//creates list of users enrollable or enrolled in course
//includes option to delete selected user
const listUsers = (users, deleteUser) => {
  if(users) {
    return users.map((user, index) => {
      return (
        <li key={index} className="listed-item">
          <div>{user.email}</div>
          {user.admin && <div>Admin</div>}
          <button onClick={() => {deleteUser(user.email)}}>Delete</button>
        </li>
        )
    })
  }
}

export default listUsers;
