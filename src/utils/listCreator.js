import React from 'react'
import {Link} from 'react-router';

export default function listCreator(items, selectFunction, admin) {
  if(admin) {
    return items.map((item, index) => {
      let itemName = item.name || item.title;
      return <li key={index} className="listed-item" onClick={() => selectFunction(item)}>{itemName}<Link to="/quiz/modify/"><button>Edit Quiz</button></Link></li>
    })
  }
  return items.map((item, index) => {
    let itemName = item.name || item.title;
    return <li key={index} onClick={() => selectFunction(item)}>{itemName}</li>
  })
};
