module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-unused-vars': 0,
    'eol-last': 0,
    'handle-callback-err': 'off',
    camelcase: 'off',
    'vue/attributes-order': 'off',
    'comma-dangle': ["error", "only-multiline"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
