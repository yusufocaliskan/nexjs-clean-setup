import {RootProvider} from '@/boot';
import {LoginScreen} from '@/screens';
import {render, screen} from '@testing-library/react';

const mockUsePathname = jest.fn();
const mockUseRouter = jest.fn();

//We need useRouter and userPathname in this screen
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: mockUseRouter(),
    };
  },
  usePathname() {
    return mockUsePathname();
  },
}));

//Also useTranslation is being needed
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

describe('1.On the WelcomeScreen', () => {
  it('it should have heading tag with text "Hepbit"', async () => {
    render(
      <RootProvider>
        <LoginScreen />
      </RootProvider>
    );
    const el = screen.getByText('Hepbit');
    expect(el).toBeInTheDocument();
  });
});
