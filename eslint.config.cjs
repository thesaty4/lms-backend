// Import ESLint configurations and plugins
const js = require('@eslint/js'); // Base ESLint config for JavaScript
const tseslint = require('@typescript-eslint/eslint-plugin'); // TypeScript-specific ESLint rules
const tsParser = require('@typescript-eslint/parser'); // TypeScript parser for ESLint
const prettier = require('eslint-plugin-prettier'); // Integrates Prettier with ESLint
const eslintImport = require('eslint-plugin-import'); // Helps with import/export syntax checking

/** 
 * ESLint configuration using the new Flat Config API.
 * @type {import("eslint").Linter.FlatConfig[]}
 */
module.exports = [
  // Use recommended JavaScript linting rules from ESLint
  js.configs.recommended,

  // Custom TypeScript linting rules
  {
    files: ['**/*.ts'], // Apply these rules only to TypeScript files

    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        project: './tsconfig.json', // Load TypeScript configuration
        sourceType: 'module', // Use ES module syntax
      },
    },

    plugins: {
      import: eslintImport, // Plugin for checking import/export syntax
      '@typescript-eslint': tseslint, // TypeScript-specific linting rules
      prettier, // Integrates Prettier for code formatting
    },

    rules: {
      // Enforce Prettier rules as ESLint errors
      'prettier/prettier': 'error',

      // Warn on unused variables instead of erroring
      '@typescript-eslint/no-unused-vars': ['warn'],

      // Disallow usage of 'any' type
      '@typescript-eslint/no-explicit-any': 'error',

      // Disable requirement for explicit return types on functions
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Enforce consistent naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'variable', format: ['camelCase', 'PascalCase'] }, // Variables: camelCase or PascalCase
        { selector: 'function', format: ['camelCase', 'PascalCase'] }, // Functions: camelCase or PascalCase
        { selector: 'class', format: ['PascalCase'] }, // Classes: PascalCase
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] }, // Interfaces: Prefixed with "I"
        { selector: 'enum', format: ['UPPER_CASE'], suffix: ['_ENUM'] }, // Enums: UPPER_CASE with "_ENUM" suffix
        { selector: 'typeAlias', format: ['PascalCase'], prefix: ['T'] }, // Type aliases: Prefixed with "T"
      ],

      // Warn when code complexity exceeds 12 (too many branches, loops, etc.)
      complexity: ['warn', 12],
    },
  },
];
