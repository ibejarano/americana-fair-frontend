import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

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
      // refetchQueries={[{query: CURRENT_USER_QUERY}]}>
    >
      {(signup, {error, loading}) => (
        <form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
                  const res = await signup();
                  console.log(res);
          }}>
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign in into your account</h2>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={saveToState}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={saveToState}
              />
            </label>
            <button type="submit">Sign In</button>
          </fieldset>
        </form>
      )}
    </Mutation>
  );
}
