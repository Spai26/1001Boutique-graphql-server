import type { Config } from 'jest';

export const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js.ts}'],
  coverageThreshold: {
    global: { branches: 0, functions: 0, lines: 0, statements: 0 }
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  verbose: true
};
