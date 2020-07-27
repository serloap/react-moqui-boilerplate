module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint-config-airbnb',
  rules: {
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-did-update-set-state': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': [2, {
      controlComponents: ['Checkbox'],
      assert: 'either',
      depth: 3,
    }],
    'max-len': [2, 160],
    'no-underscore-dangle': 0,
    'react/destructuring-assignment': [1, 'always', { ignoreClassFields: true }],
    'react/jsx-max-props-per-line': [2, { maximum: 10 }],
    'object-curly-newline': [2, { minProperties: 6, consistent: true }],
    'import/prefer-default-export': 0,
  },
  env: {
    browser: true,
  },
};
