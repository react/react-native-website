# Repository guidance

## Project layout

- This is a Yarn Classic monorepo for the React Native website. It requires Node.js 22 or newer.
- `docs/` contains the current versioned Guides, Components, and API documentation. Static documentation lives in `website/architecture/` and `website/contributing/`.
- `website/` contains the Docusaurus site, including its configuration, components, styles, pages, and sidebars.
- `website/core/` contains shared components and helpers used in documentation and site code; `website/src/components/` contains site UI components.
- `website/src/theme/` contains Docusaurus theme overrides (swizzled components) and other theme-level components.
- `packages/` and `plugins/` contain workspace packages for linting examples and processing or checking documentation.
- `website/versioned_docs/` and `website/versioned_sidebars/` are generated snapshots. Avoid editing them unless a change intentionally targets an older documentation version.

## Documentation changes

- Follow `STYLEGUIDE.md`: write clearly for readers new to React and web development, use inclusive language, and keep sentences concise.
- When adding or moving documentation, update the appropriate sidebar file in `website/` and ensure document IDs match the frontmatter.
- Keep examples and links consistent with the APIs and platform guidance documented for the relevant React Native version.
- Optimize images and other assets for the web.

## Docusaurus components

- Before adding a component, check for an existing component or helper in `website/core/`, `website/src/components/`, or `website/src/theme/`. Follow nearby import patterns (`@site/core/...`, `@site/src/components/...`, and `@theme/...` for theme components).
- Put shared components used by docs in `website/core/`; put site UI components in `website/src/components/`.
- When you need to replace or extend a Docusaurus theme component, use the Docusaurus swizzle command (`yarn --cwd website swizzle`) to generate the override in `website/src/theme/`. Prefer wrapping a theme component over ejecting its full implementation when that meets the need.
- Do not edit generated Docusaurus files under `website/.docusaurus/`.

## Development and validation

- Install dependencies from the repository root with `yarn` (Yarn Classic, version 1).
- Start the site with `yarn start`; build it with `yarn build`.
- Run the repository ESLint checks with `yarn lint`.
- For website-wide CI lint checks, run `yarn --cwd website ci:lint`. This includes website linting, styles, examples, documentation images, and SCSS formatting.
- For package and plugin changes, use the relevant workspace scripts; `yarn lint:packages` and `yarn lint:plugins` run the configured workspace checks.
- Keep dependency changes aligned with the Yarn workspaces and update `yarn.lock` when dependencies change.

## Code examples and version cuts

- `packages/lint-examples` checks `SnackPlayer` code blocks in Markdown under `docs/`. Run `yarn --cwd website lint:examples` after changing examples; it lints JavaScript and TypeScript examples and typechecks TypeScript examples.
- To apply ESLint fixes to those examples, run `yarn --cwd website format:examples` and review the resulting documentation changes.
- After cutting a documentation version with `yarn --cwd website version:cut <newVersion>`, run `yarn --cwd website lint:examples` and `yarn build`. The example linter scans `docs/`, not the generated `website/versioned_docs/`; the build validates the versioned documentation as part of the site.
