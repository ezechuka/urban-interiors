# Fobath woodwork
Ecommerce web application with product listing, wislist, cart, payment provider, etc implemented in it.

## Setup
- `git clone <project_url>`
- `cd fobath-woodwork`
- open the terminal in the current directory and run `npm install`
- rename the file from `.env.local.example` to `.env.local` and then assign the corresponding IDs to each params
- `npm run dev`

## Commit style guidelines

A commit message should easily convey what it contains so this guidelines shows a commit should be for this project.

The commit message should be in this format `type: subject` where `type` can be any one of these:

- `feat: a new feature`
- `fix: a bug fix`
- `docs: changes to documentation`
- `style: formatting, missing semi colons, etc; no code  change`
- `refactor: refactoring production code`
- `test: adding tests, refactoring test; no production code change`
- `chore: updating build tasks, package manager configs, etc; no production code change`

and the `subject` should be no greater than 50 characters, should begin with an uppercase and should use imperative tone. E.g: 'change'; not 'changed' or 'changes'