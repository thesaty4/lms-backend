// eslint.config.js (CommonJS version)
const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettier = require("eslint-plugin-prettier");
const eslintImport = require("eslint-plugin-import");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module"
      }
    },
    plugins: {
      import: eslintImport,
      "@typescript-eslint": tseslint,
      prettier
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        },
        { "selector": "function", "format": ["camelCase", "PascalCase"] },
        { "selector": "class", "format": ["PascalCase"] },
        { "selector": "interface", "format": ["PascalCase"], "prefix": ["I"] },
        { "selector": "enum", "format": ["UPPER_CASE"], "suffix": ["_ENUM"] },
        { "selector": "typeAlias", "format": ["PascalCase"], "prefix": ["T"] }
      ],
      "complexity": ["warn", 12]
    }
  }
];
