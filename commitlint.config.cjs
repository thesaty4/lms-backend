module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation update
        'style', // Code style changes (formatting, no logic change)
        'refactor', // Refactoring code (no new feature, no bug fix)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'chore', // Maintenance tasks
        'ci', // Continuous Integration changes
        'build', // Build-related changes
        'revert', // Reverting a previous commit
        'init', // Initial commit
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
  },
};
