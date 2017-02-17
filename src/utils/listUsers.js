import React from 'react'

export default function listUsers(users, deleteUser) {
  if(users) {
    return users.map((user, index) => {
      return (
        <li key={index} className="listed-item">
          <div>{user}</div>
          <button onClick={() => {deleteUser(index)}}>Delete</button>
        </li>
        )
    })
  }
}
