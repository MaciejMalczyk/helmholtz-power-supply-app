import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import IconButton from '../renderer/reusable/IconButton/IconButton';

describe('App', () => {
  it('should render', () => {
    expect(render(<IconButton />)).toBeTruthy();
  });
});
