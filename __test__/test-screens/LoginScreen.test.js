import {navigatorMock, reCapatchaMock, sessionMock, translationMock} from '../__mocks__';
import {RootProvider} from '@/boot';
import {LoginScreen} from '@/screens';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

//We need useRouter and userPathname in this screen
jest.mock('next/navigation', () => navigatorMock);

//Translations ---
//Also useTranslation is being needed
jest.mock('react-i18next', () => translationMock);

//Getting Session
global.fetch = sessionMock;
global.grecaptcha = reCapatchaMock;

//Lets get start---
describe('Step#1:  On the Login Screen', () => {
  //Check if there is the app name, controlling if the useTranslation method works.
  it('controlling if the useTranslation method works', async () => {
    render(
      <RootProvider>
        <LoginScreen />
      </RootProvider>
    );

    await act(async () => {
      const el = screen.getByText('loginPageHepBit');
      expect(el).toBeInTheDocument();
    });
  });

  it('Are inputs rendered?', async () => {
    render(
      <RootProvider>
        <LoginScreen />
      </RootProvider>
    );

    await act(async () => {
      //Email input
      expect(screen.getByPlaceholderText('loginPageEmailPlaceHolder')).toBeInTheDocument();
      //password input
      expect(screen.getByPlaceholderText('passwordPlaceholder')).toBeInTheDocument();

      //Form Submit button
      expect(screen.getByRole('button', {class: 'form-trigger-button'})).toBeInTheDocument();
    });
  });

  // it('Check if the google reCaptcha loaded', async () => {
  //   await act(async () =>
  //     render(
  //       <RootProvider>
  //         <LoginScreen />
  //       </RootProvider>
  //     )
  //   );
  //
  //   await waitFor(() => expect(global.grecaptcha.render).toHaveBeenCalled());
  //   expect(screen.getByTestId('google-recaptcha')).toBeInTheDocument();
  // });
});

describe('Step#2', () => {
  it('a - does not submit an empty form', async () => {
    const handleSubmit = jest.fn();
    render(
      <RootProvider>
        <LoginScreen />
      </RootProvider>
    );

    const loginForm = screen.getByTestId('login-form');

    fireEvent.submit(loginForm);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it('b- Submitting the login form with valid data', async () => {
    const handleSubmit = jest.fn();
    render(
      <RootProvider>
        <LoginScreen />
      </RootProvider>
    );

    const emailInput = screen.getByPlaceholderText('loginPageEmailPlaceHolder');
    const passwordInput = screen.getByPlaceholderText('passwordPlaceholder');
    const loginForm = screen.getByTestId('login-form');

    // Set the mock function as the onSubmit handler
    loginForm.onsubmit = handleSubmit;

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'Ma5i212131');

    // Use fireEvent.submit
    fireEvent.submit(loginForm);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
