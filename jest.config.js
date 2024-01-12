// Jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Jest.config.js
const customConfig = {
  coverageProvider: 'v8',
  // The directory where Jest should output its coverage files
  coverageDirectory: '.coverage',
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./jest.setup.js'],
  // By default jest will use a node environment, so DOM elements (like document) will be undefined without this
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^jose$': require.resolve('jose'),
    '^uuid$': require.resolve('uuid'),
    '^@panva/hkdf$': require.resolve('@panva/hkdf'),
    '^preact-render-to-string$': require.resolve('preact-render-to-string'),
    '^node:http$': require.resolve('node:http'),
    '^preact$': require.resolve('preact'),
  },
};

module.exports = createJestConfig(customConfig);
