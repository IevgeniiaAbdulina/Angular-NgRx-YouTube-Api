/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  moduleDirectories: ['node_modules', '<rootDir>'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs|@ngrx)'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  verbose: true
};

export default config;
