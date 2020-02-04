import React from 'react';
import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {adopt} from 'react-adopt';
import User from './User';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
// import CloseButton from './styles/CloseButton';
// import SickButton from './styles/SickButton';
// import CartItem from './CartItem';
// import calcTotalPrice from '../lib/calcTotalPrice';
// import formatMoney from '../lib/formatMoney';
// import TakeMyMoney from './TakeMyMoney';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
/* eslint-disable */
const Composed = adopt({
  user: ({render}) => <User>{render}</User>,
  toggleCart: ({render}) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({render}) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({user, toggleCart, localState}) => {
      const me = user.data ? user.data.me : null;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <div onClick={toggleCart} title="close">
              &times;
            </div>
            <Supreme>Carrito de {me.name}</Supreme>
            {/* <p> */}
            {/* You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart. */}
            {/* </p> */}
          </header>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export {LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION};
