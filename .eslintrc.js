const offTsRules = ['no-case-declarations'];

module.exports = {
  env: {
    node: true,
  },
  extends: ['standard', 'prettier'],
  rules: Object.fromEntries(offTsRules.map(name => [name, 'off'])),
};
