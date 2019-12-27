import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';

// TODO: Get me from a Query to DB from logged in user
const me = null;

const Nav = () => (
  <NavStyles data-test="nav">
    <Link href="/items">
      <a>Comprar</a>
    </Link>
    {!me && (
      <Link href="/signin">
        <a>Ingresar</a>
      </Link>
    )}
    {me && (
      <>
        <Link href="/sell">
          <a>Vender</a>
        </Link>
        <Link href="/orders">
          <a>Ordenes</a>
        </Link>
        <Link href="/me">
          <a>Cuenta</a>
        </Link>
      </>
    )}
  </NavStyles>
);

export default Nav;
