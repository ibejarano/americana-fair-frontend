import Link from 'next/link';
import { Mutation } from 'react-apollo';
// import NavStyles from './styles/NavStyles';

const me = null;

const Nav = () => (
  <div data-test="nav">
    <Link href="/items">
      <a>Shop</a>
    </Link>
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
  </div>
);

export default Nav;
