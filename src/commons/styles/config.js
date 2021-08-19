const notForward = (...values) => ({
  shouldForwardProp: prop => !values.includes(prop),
});

export { notForward };
