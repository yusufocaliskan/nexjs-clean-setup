import React from 'react';
import {render, screen} from '@testing-library/react';
import {WelcomeScreen} from '@/screens';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      return key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

test('renders translated text', () => {
  render(<WelcomeScreen />);
  expect(screen.getByText('email')).toBeInTheDocument();
});
