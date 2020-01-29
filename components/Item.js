import React from 'react';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyle';

export default function Item({item}) {
  const {title, id, image, description} = item;
  return (
    <ItemStyles>
      <img src={image} alt={title} />
      <div className="item-text">
        <Link href={{pathname: '/item', query: {id}}}>
          <a>{title}</a>
        </Link>
        <p>{description}</p>
      </div>
      <div className="buttonList">
        <p>Agregar al carrito</p>
      </div>
    </ItemStyles>
  );
}
