# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui, nextjs app and nestjs app.

## Usage

```bash
pnpm run dev
```

## Adding libraries

- Create package.json as show in sdk folder (Change the name as required)
  - Take note of the following. These are what gets imported in the applications.

```
  - "main": "./dist/index.js",
  - "types": "./dist/index.d.ts",
```

- Copy the tsconfig.json as shown (Add compilerOption as required)

- Inside src folder, write your own logic.

NOTE:

- DONOT PLAY WITH ESLINT-CONFIG and TYPESCRIPT-CONFIG

## Deploying NPM libraries

- We are using changeset to manage the version management for packages.

- Login into npm from CLI

- Make appropriate changes to the packages. Donot update the version in the packages.

- Mark `private: true` in package.json if you don't want to publish packages in npm.

- Then read the following doc to get familiar with [changeset] (https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md). This will help you to release the packages.
