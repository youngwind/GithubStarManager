module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "indent": [
      1,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "quotes": [
      2,
      "single"
    ],
    "linebreak-style": [
      2,
      "unix"
    ],
    "semi": [
      2,
      "always"
    ]
  },
  "env": {
    "es6": true,
    "browser": true,
    "commonjs": true,
    "amd": true
  },
  "ecmaFeatures": {
    "jsx": true,
    "modules": true
  },
  "extends": "eslint:recommended"
};