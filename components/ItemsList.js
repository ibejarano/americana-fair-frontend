import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
        <ul>
          {data.items.map(item => (
            <li>{item.title}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default Items;
