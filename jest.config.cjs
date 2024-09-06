// jest.config.cjs
module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testEnvironment: 'jest-environment-jsdom', // Use jest-environment-jsdom
};