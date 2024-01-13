const mockUsePathname = jest.fn();
const mockUseRouter = jest.fn();

//We need useRouter and userPathname in this screen
export const navigatorMock = {
  useRouter() {
    return {
      prefetch: mockUseRouter(),
    };
  },
  usePathname() {
    return mockUsePathname();
  },
};

//Translations ---
//Also useTranslation is being needed
export const translationMock = {
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
};
//Getting Session
export const sessionMock = jest.fn((url) => {
  if (url.endsWith('/api/auth/session')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({user: {name: 'Test User', email: 'test@example.com'}}),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });
});

export const reCapatchaMock = {
  render: jest.fn(),
  ready: jest.fn((callback) => callback()),
};
