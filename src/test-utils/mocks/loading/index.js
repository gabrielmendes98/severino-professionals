export default jest.mock('commons/utils/loading', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));
