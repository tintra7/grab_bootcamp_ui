module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 80,
        jsxSingleQuote: true,
        bracketSameLine: false
      }
    ],
    'simple-import-sort/imports': 'warn',
    'no-restricted-imports': [
      'warn',
      {
        patterns: ['@mui/*/*/*']
      }
    ]
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react.*', '^@?\\w'],
              // @mui/material/* imports
              ['^@mui/material.*'],
              // @mui/icons-material/* imports
              ['^@mui/icons-material.*'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` second.
              // Other relative imports. Put same-folder imports and `.` last.
              [
                '^(src|@)(/.*|$)',
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$'
              ],
              // Style imports.
              ['^.+\\.?(css)$']
            ]
          }
        ]
      }
    }
  ]
}
