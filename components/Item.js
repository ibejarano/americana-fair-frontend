import React from 'react';
import ItemStyles from './styles/ItemStyle';
import Link from 'next/link';

export default function Item({item}) {
  const {title, id, image} = item;
  const puppy = 'puppy.jpg';
  return (
    <ItemStyles>
      <img src={puppy} alt={title} />
      <p>
        <Link href={{pathname: '/item', query: {id}}}>
          <a>{title}</a>
        </Link>
      </p>
      <div className="buttonList">
        <p>Editar</p>
        <p>Agregar al carrito</p>
        <p>Borrar</p>
      </div>
    </ItemStyles>
  );
}
