import { render } from '@testing-library/react-native';
import React from 'react';
import App from '../App';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('react-native-reanimated/lib/commonjs/reanimated2/jestUtils').setUpTests();

// eslint-disable-next-line global-require
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

describe('App', () => {
  it('should renders correctly', () => {
    const page = render(<App />);
    expect(page.toJSON()).toMatchSnapshot();
  });
});
