import React, {useState} from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {CURRENT_USER_QUERY} from './User';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export default function Login() {
  const [loginData, setLoginData] = useState({email: '', password: ''});

  const saveToState = e => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  };

  const {email, password} = loginData;

  return (
    <Mutation
      mutation={LOGIN_MUTATION}
      variables={loginData}
      refetchQueries={[{query: CURRENT_USER_QUERY}]}>
      {(login, {error, loading}) => (
        <Form
          onSubmit={async e => {
            e.preventDefault();
            const {data} = await login();
            Router.push('/');
          }}>
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Ingrese a su cuenta</h2>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={saveToState}
              />
            </label>
            <label htmlFor="password">
              Contraseña
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={saveToState}
              />
            </label>
            <button type="submit" disabled={loading}>
              Ingresar
            </button>
            <ErrorMessage error={error} />
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
}
