import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  // preset: 'ts-jest',
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^.+\\.(jp?eg|png|gif|txt)$': '<rootDir>/src/test-utils/mocks/testFileMock.js',
    '^.+\\.svg$': '<rootDir>/src/test-utils/mocks/svgMock.js',
    '^.+\\.css$': 'identity-obj-proxy',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)x?$',
  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/*.test.ts"
  // ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown"
}

export default config
