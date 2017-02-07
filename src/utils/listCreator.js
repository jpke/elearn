import React from 'react'

export default function listCreator(items, selectFunction) {
  return items.map((item, index) => {
    let itemName = item.name || item.title;
    return <li key={index} onClick={() => selectFunction(item)}>{itemName}</li>
  })
};
