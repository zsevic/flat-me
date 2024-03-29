module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:@next/next/recommended",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "consistent-return": "warn",
    "import/no-default-export": "warn",
    "import/no-extraneous-dependencies": "warn",
    "import/prefer-default-export": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        aspects: ["invalidHref"],
      },
    ],
    "no-param-reassign": "warn",
    "no-restricted-globals": "warn",
    "no-undef": "warn",
    "no-underscore-dangle": "warn",
    "react/forbid-prop-types": "warn",
    "react/jsx-fragments": "off",
    "react/jsx-props-no-spreading": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"],
      },
    },
    react: {
      version: "latest",
    },
  },
};
