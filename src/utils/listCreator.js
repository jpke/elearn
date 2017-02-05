import React from 'react'

export default function listCreator(items, selectFunction) {
  return items.map((item, index) => {
    let itemName = item.name;
    return <li key={index} onClick={() => selectFunction(item._id, itemName)}>{itemName}</li>
  })
};
