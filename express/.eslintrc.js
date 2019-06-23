module.exports = {
  "env": {
    "node": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "globals": {
    "_": true,
    "config": true,
    "errors": true,
    "moment": true,
    "Promise": true,
    "models": true,
  },
  "extends": "eslint:recommended",
  "rules": {
    // best practices
    "array-callback-return": ["error"],
    "block-scoped-var": ["error"],
    "consistent-return": ["error"],
    "default-case": ["error"],
    "dot-notation": ["off"],
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-eval": ["error"],
    "no-implied-eval": ["error"],
    "no-loop-func": ["error"],
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "no-unused-vars": ["error", { "args": "none" }],

    // stylistic
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "camelcase": ["error", { "properties": "never", "ignoreDestructuring": true }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "func-call-spacing": ["error", "never"],
    "indent": ["error", 2, { "SwitchCase": 1, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "linebreak-style": ["error", "unix"],
    "no-multiple-empty-lines": ["error", { "max": 3, "maxEOF": 1 }],
    "no-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["error"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "semi-spacing": ["error", {"before": false, "after": true}],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", { "anonymous": "never", "named": "never", "asyncArrow": "always" }],
    "space-in-parens": ["error", "never"],
    "spaced-comment": ["error", "always"]
  }
}
