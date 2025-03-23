module.exports = {
  // Extend the conventional commit ruleset
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Define allowed commit types
    'type-enum': [
      2, // Error level: 2 (error), 1 (warning), 0 (off)
      'always', // Rule must always be followed
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation update
        'style', // Code style changes (formatting, no logic change)
        'refactor', // Refactoring code (no new feature, no bug fix)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'chore', // Maintenance tasks (e.g., tooling, dependencies)
        'ci', // Continuous Integration changes
        'build', // Build-related changes (e.g., package updates, build scripts)
        'revert', // Reverting a previous commit
        'init', // Initial commit
      ],
    ],

    // Ensure commit messages always include a scope (e.g., feat(auth): add login)
    'scope-empty': [2, 'never'],

    // Enforce sentence-case in commit subjects (e.g., "Add login feature" instead of "add login feature")
    'subject-case': [2, 'always', 'sentence-case'],
  },
};
