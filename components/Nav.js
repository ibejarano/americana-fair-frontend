import Link from 'next/link';
import {Mutation} from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (
  <User>
    {({data}) => {
      console.log(data)
      const me = data ? data.me : null;
      return (
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
            <Signout />
            </>
          )}
        </NavStyles>
      );
    }}
  </User>
);

export default Nav;
