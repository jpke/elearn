import React from 'react'

export default function listUsers(users, deleteUser) {
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
