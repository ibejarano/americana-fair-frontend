import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ItemsListStyles from './styles/ItemsListStyled';
import Item from './Item';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Items = props => (
  <Query query={ALL_ITEMS_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <h1>Loading...</h1>;
      if (error) return <h1>Error! {error.message}</h1>;
      return (
        <ItemsListStyles>
          {data.items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </ItemsListStyles>
      );
    }}
  </Query>
);

export default Items;
