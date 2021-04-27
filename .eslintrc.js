module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    // vue-eslint-parser uses the parser which is set by parserOptions.parser to parse scripts
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    // add more generic rulesets here, such as:
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    // vue rules
    'vue/script-indent': ['error', 2, {
      'baseIndent': 1,
      'switchCase': 1,
      'ignores': []
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false,
      'ignores': []
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'selfClosingTag': 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        // 'max': 10,
        'allowFirstLine': true
      }
    }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/html-self-closing': 0,
    // js rules
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'ignore'
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'semi': ['error', 'always']
  },
  'overrides': [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off',
        'no-debugger': 'off',
        'no-trailing-spaces': 'off',
        'no-unused-expressions': 'off',
        'vue/max-attributes-per-line': 0, // !关闭 Attribute "ref" should be on a new line
        'vue/html-closing-bracket-newline': 0,
        'vue/multiline-html-element-content-newline': 0,
        'vue/attribute-hyphenation': 0,
        'vue/prop-name-casing': 0 // !取消prop驼峰校验
      }
    }
  ]
};
