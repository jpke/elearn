import React from 'react'

export default function listCreator(items, selectFunction, admin, editQuiz) {
  if(admin) {
    return items.map((item, index) => {
      let itemName = item.name || item.title;
      return (
        <li key={index} className="listed-item" onClick={() => selectFunction(item)}>
          <div>{itemName}</div>
          <button onClick={() => {editQuiz("modify")}}>Edit</button>
        </li>
        )
    })
  }
  return items.map((item, index) => {
    let itemName = item.name || item.title;
    return <li key={index} onClick={() => selectFunction(item)}>{itemName}</li>
  })
};
