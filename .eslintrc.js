module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {    
    "import/resolver": {      
      "node": {        
        "moduleDirectory": ["node_modules", "src/"]      
      }    
    }  
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "no-cond-assign": ["error", "always"],
    "block-scoped-var": "error",
    "no-console": "warn",
    'react/jsx-one-expression-per-line': 'off',
    "import/prefer-default-export": "off",
    "no-param-reassign":"off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};
