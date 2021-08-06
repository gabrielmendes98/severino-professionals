module.exports = {
  setupFilesAfterEnv: ['./src/setupTests'],
  collectCoverageFrom: [
    './src/components/**/*.{js,jsx}',
    './src/pages/**/*.{js,jsx}',
    './src/commons/**/*.{js,jsx}',
    './src/assets/**/*.{js,jsx}',
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
