import {WelcomeScreen} from '@/screens';
import {render, screen} from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('1.On the WelcomeScreen', () => {
  it('it should have heading tag with text "Hepbit"', () => {
    render(<WelcomeScreen />);
    const el = screen.getByText('Hepbit');
    expect(el).toBeInTheDocument();
  });
});
