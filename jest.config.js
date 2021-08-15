module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test-utils/mockStub.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test-utils/mockStub.js',
    '@fontsource/(roboto|ubuntu)': '<rootDir>/src/test-utils/mockStub.js',
  },
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.{js,jsx}',
    '<rootDir>/src/pages/**/*.{js,jsx}',
    '!<rootDir>/src/components/**/style.js',
    '!<rootDir>/src/pages/**/style.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
