import React from 'react'

export default function listUsers(users, deleteUser) {
    return users.map((user, index) => {
      return (
        <li key={index} className="listed-item">
          <div>{user}</div>
          <button onClick={() => {deleteUser(user)}}>Delete</button>
        </li>
        )
    })
}
