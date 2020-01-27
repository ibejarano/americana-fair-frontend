import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import ErrorMessage from './ErrorMessage';

const ITEM_QUERY = gql`
  query ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      id
      title
      description
    }
  }
`;

const SingleItem = props => {
  return (
    <Query query={ITEM_QUERY} variables={{id: props.id}}>
      {({data, error, loading}) => {
        if (error) {
          return <ErrorMessage error={error} />;
        } else {
          return (
            <div>
              {loading ? <h1>Cargando...</h1> : <div>Item:{data.item.title} </div>}
            </div>
          );
        }
      }}
    </Query>
  );
};

export default SingleItem;
