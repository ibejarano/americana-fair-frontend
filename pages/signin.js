import React from 'react';
import styled from 'styled-components';
import SignUp from '../components/SignUp';
import LogIn from '../components/Login';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignInPage = props => (
  <Columns>
    <SignUp />
    <LogIn />
  </Columns>
);

export default SignInPage;
