import React from 'react';
import { render } from '@testing-library/react-native';

import SigninScreen from '../SigninScreen';

describe('SigninScreen', () => {
  it('matches the snapshot', () => {
    const { toJSON } = render(<SigninScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders username field', () => {
    const { getByTestId } = render(<SigninScreen />);
    const myComponent = getByTestId('SignIn.usernameInput');
    expect(myComponent).toBeDefined();
    expect(myComponent.props.placeholder).toEqual('Username');
  });
  it('renders password field', () => {
    const { getByTestId } = render(<SigninScreen />);
    const myComponent = getByTestId('SignIn.passwordInput');
    expect(myComponent).toBeDefined();
    expect(myComponent.props.placeholder).toEqual('***');
  });
  it('renders login button', () => {
    const { getByTestId } = render(<SigninScreen />);
    const myComponent = getByTestId('SignIn.Button');
    expect(myComponent).toBeDefined();
  });
});
