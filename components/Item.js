import React from 'react';
import ItemStyles from './styles/ItemStyle';

export default function Item({ item }) {
  const { title, id, image } = item;
  const puppy = 'puppy.jpg';
  return (
    <ItemStyles>
      <img src={puppy} alt={title} />
      <p>
        <a href="/">{title}</a>
      </p>
      <div className="buttonList">
        <p>Edit</p>
        <p>Add to Cart</p>
        <p>Delete</p>
      </div>
    </ItemStyles>
  );
}
