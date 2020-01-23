import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {CURRENT_USER_QUERY} from './User';
import Form from './styles/Form';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const saveToState = e => {
    setSignupData({...signupData, [e.target.name]: e.target.value});
  };

  const {email, name, password} = signupData;

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={signupData}
      refetchQueries={[{query: CURRENT_USER_QUERY}]}>
      {(signup, {error, loading}) => (
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            const res = await signup();
            setSignupData({email: '', name: '', password: ''});
          }}>
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Register</h2>
            <label htmlFor="name">
              Name
              <input
                type="name"
                name="name"
                placeholder="name"
                value={name}
                onChange={saveToState}
              />
            </label>
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
            <button type="submit">Register</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};
export default Signup;
export {SIGNUP_MUTATION};
