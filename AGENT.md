# AGENT.md - Inlang t-function JSX Hybrid Matcher

## Build & Test Commands
- `npm run build` - Build for production (esbuild -> dist/)
- `npm run dev` - Watch mode development build
- `npm run test` - Run all tests (builds first, then vitest)
- `npm run test2` - Run single test file (ownName.test.ts)
- `npx vitest run tests/[filename].test.ts` - Run specific test file

## Architecture
- **Plugin Type**: Inlang marketplace plugin for i18n message matching
- **Entry Point**: `src/index.ts` exports default plugin
- **Core Logic**: `src/plugin.ts` defines plugin metadata and API
- **Parser**: `src/ideExtension/messageReferenceMatchers.ts` - TSX/JSX parser using @typescript-eslint/typescript-estree
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
