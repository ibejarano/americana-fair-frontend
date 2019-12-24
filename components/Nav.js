import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';

// TODO: Get me from a Query to DB from logged in user
const me = null;

const Nav = () => (
  <NavStyles data-test="nav">
    <Link href="/items">
      <a>Shop</a>
    </Link>
    {!me && (
      <Link href="/signin">
        <a>Sign in</a>
      </Link>
    )}
    {me && (
      <>
        <Link href="/sell">
          <a>Sell</a>
        </Link>
        <Link href="/orders">
          <a>Orders</a>
        </Link>
        <Link href="/me">
          <a>Account</a>
        </Link>
      </>
    )}
  </NavStyles>
);

export default Nav;
