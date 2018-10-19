# NodeJs starter project

The main purpose of this repository is to provide start point for new NodeJs projects.

## Getting started

For easy way to get started is to clone the repository.

```shell
# clone repository
git clone https://github.com/serenissimus/node-starter-project.git

# change directory
cd node-starter-project/

# setup project
yarn
```

## Running

For running some command from available list use `yarn`.

```shell
yarn <command>
```

Available command list.

| Command    | Description                             |
| -          | -                                       |
| start      | Run `src/index.js` file.                |
| test       | Run unit tests.                         |
| eslint     | Run project linter.                     |
| eslint-fix | Run project linter with `try-fix` mode. |


## Project structure


| Name  | Description               |
| -     | -                         |
| src   | Contain your source code. |
| tests | Contain your tests.       |


## Dependencies


Dependencies are managed through `package.json`. In that file you'll find two sections:

### dependencies

| Package                      | Description |
| -                            | - |
|  @babel/core                 | `babel` compiler core. |
| @babel/node                  | A CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with `babel` presets and plugins before running it. |
| @babel/preset-env            | A `babel` preset that compiles ES2015+ down to ES5 by automatically determining the `babel` plugins and polyfills you need based on your targeted browser or runtime environments. |
| babel-plugin-module-resolver | Module resolver import plugin for `babel`. |
| date-fns                     | Modern JavaScript date utility library. |
| ramda                        | A practical functional JavaScript library. |

### devDependencies

| Package                             | Description |
| -                                   | - |
| babel-core                          | `babel` bridge module for using modern EcmaScript in `jest` unit tests. |
| babel-eslint                        | A wrapper for `babel` parser used for `eslint`. |
| babel-jest                          | `jest` testing library plugin for `babel`. |
| eslint                              | Linter for JavaScript. |
| eslint-config-airbnb-base           | Provides Airbnb's rules for `eslint`. |
| eslint-config-prettier              | Provides rules that are unnecessary or might conflict with `prettier`. |
| eslint-import-resolver-babel-module | Eslint resolve for `babel-plugin-module-resolver`. |
| eslint-plugin-import                | Provides rules for validate import/export syntax and prevent issues with misspelling of file paths and import names. |
| eslint-plugin-jsdoc                 | `jsdoc` specific linting rules for `eslint`. |
| eslint-plugin-module-resolver       | Warn when using relative paths to modules aliased using `babel-plugin-module-resolver`. |
| eslint-plugin-prettier              | `eslint` plugin for `prettier` formatting. |
| jest                                | Testing library for JavaScript. |
| jest-expect-message                 | Add custom message to `jest` expects. |
| prettier                            | Opinionated JavaScript code formatter. |
