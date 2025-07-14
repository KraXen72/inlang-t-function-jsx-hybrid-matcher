# AGENT.md - Inlang t-function JSX Hybrid Matcher

## Build & Test Commands
- `pnpm build` - Build for production (esbuild -> dist/)
- `pnpm dev` - Watch mode development build
- `pnpm test` - Run all tests (builds first, then vitest)
- `pnpm test2` - Run single test file (ownName.test.ts)
- `vitest run tests/[filename].test.ts` - Run specific test file 
    - `vitest` should be installed globally. in case it isn't, add it through `pnpm add -g vitest`

## Architecture
- **Plugin Type**: Inlang marketplace plugin for i18n message matching
- **Entry Point**: `src/index.ts` exports default plugin
- **Core Logic**: `src/plugin.ts` defines plugin metadata and API
- **Parser**: `src/ideExtension/messageReferenceMatchers.ts` - TSX/JSX parser using @babel/parser
- **Settings**: `src/settings.ts` - TypeBox schema for plugin configuration
- **Build**: Custom esbuild config in `build.js` (ESM, Node platform, ES2022)

## Code Style & Conventions
- **TypeScript**: Strict mode, ES2022 target, ESM modules
- **Imports**: Use `.js` extensions for local imports (ESM requirement)
- **Testing**: Vitest with node environment and globals
- **Types**: Use TypeBox for schema validation, Static<> for type inference
- **Config**: Settings use optional fields with defaults (preferredTfuncName, recognizedTfuncNames, recognizedJSXAttributes)
- **Error Handling**: AST parsing allows invalid/incomplete code for IDE support
- **Formatting**: No specific formatter configured, follow existing patterns

## ALWAYS REMEMBER
- use the current package manager tool, e.g. pnpm instead of the default (npm) if applicable
- do not overcomplicate stuff. always try to think of a simple & elegant solution which REQUIRES MINIMAL CHANGES
- if you notice that there is a better solution than one i am currently using/asking about, but would require a lot of refactoring, do what i at the time but propose this new solution, what it entails, why it is better and some potential drawbacks
- always try to change as little as possible to do what i want from you
- do not add superfulous comments, only comment code that's not immediatelly obvious what it does
- always try to add JSDoc to describe what a function does and how it's used
