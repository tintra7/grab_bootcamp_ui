AC Automatic System

## Folder structure

```bash
grab_bootcamp_ui
├── .env                        # Environment variables
├── .eslintrc.cjs               # Eslint rules configured
├── .gitignore                  # Git ignore files
├── .prettierignore             # Prettier ignore files
├── .prettierrc                 # Prettier rules configured
├── package-lock.json           # Lock file
├── package.json                # Packages and package manager
└── src                         # Main src folder/
    ├── App.tsx
    ├── assets                  # Main assets folder
    ├── constants
    │   ├── enum.ts
    │   └── serverConfig.ts
    ├── libs
    │   ├── redux               # Redux logics
    │   └── ui                  # Styles and components/
    │       ├── color.ts
    │       ├── components      # Code for <Component>.tsx
    │       ├── index.ts
    │       └── theme.ts
    ├── main.tsx
    ├── models                  # Database schemas/
    │   ├── entities
    │   ├── requests
    │   └── responses
    ├── routes
    │   ├── Dashboard
    │   └── Login
    ├── services
    │   ├── servicesDevice
    │   └── servicesFan
    └── utils                   # utilties functions
```
