import {navigatorMock, reCapatchaMock, sessionMock, translationMock} from '../__mocks__';
import {RootProvider} from '@/boot';
import {fireEvent, render, screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import app, {setSelectedLanguage, setTheme} from '@/store/app';
import {store} from '@/store';

//We need useRouter and userPathname in this screen
jest.mock('next/navigation', () => navigatorMock);

//Translations ---
//Also useTranslation is being needed
jest.mock('react-i18next', () => translationMock);

global.fetch = sessionMock;
global.grecaptcha = reCapatchaMock;

//Lets get start---
describe('REDUX:  Redux Testoor', () => {
  //Check if there is the app name, controlling if the useTranslation method works.
  it('REDUX-->Step#1 :  Testing Redux: Theme Switcher', async () => {
    render(<RootProvider />);
    await act(async () => {
      const expectedAction = {
        type: 'app/setTheme',
        payload: 'dark_theme',
      };
      expect(setTheme('dark_theme')).toEqual(expectedAction);
    });
  });
  it('REDUX-->Step2. Testing Redux: Setting new languge', async () => {
    render(<RootProvider />);
    await act(async () => {
      const expectedAction = {
        selectedLanguage: 'en',
      };
      const previousState = {
        selectedLanguage: 'tr',
      };
      expect(app(previousState, setSelectedLanguage('en'))).toEqual(expectedAction);
    });
  });
});

describe('REDUX: Using ThemeSwitcher ', () => {
  it('REDUX-->Step1. Do we have the div card?', async () => {
    render(
      <RootProvider>
        <ThemeSwitcher />
      </RootProvider>
    );
    await act(async () => {
      const ThemeSwitcherCard = screen.getByTestId('theme-switcher');
      expect(ThemeSwitcherCard).toBeInTheDocument();
    });
  });
  it('REDUX--> Click to the div, should the currentTheme changed', async () => {
    render(
      <RootProvider>
        <ThemeSwitcher />
      </RootProvider>
    );
    await act(async () => {
      const ThemeSwitcherCard = screen.getByTestId('theme-switcher');
      fireEvent.click(ThemeSwitcherCard);
    });
    expect(store.getState().app.currentTheme).toBe('dark_theme');
  });
});
describe('REDUX: Using LanguageSwitcher', () => {
  it('REDUX-->Step1. Do we have the div card?', async () => {
    render(
      <RootProvider>
        <ThemeSwitcher />
      </RootProvider>
    );
    await act(async () => {
      const ThemeSwitcherCard = screen.getByTestId('theme-switcher');
      expect(ThemeSwitcherCard).toBeInTheDocument();
    });
  });
  it('REDUX--> Click to the div, should the currentTheme changed', async () => {
    render(
      <RootProvider>
        <ThemeSwitcher />
      </RootProvider>
    );
    await act(async () => {
      const ThemeSwitcherCard = screen.getByTestId('theme-switcher');
      fireEvent.click(ThemeSwitcherCard);
    });
    expect(store.getState().app.currentTheme).toBe('dark_theme');
  });
});
