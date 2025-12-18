# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a markdown-it plugin that renders ABC music notation blocks (:::abc...:::) into SVG graphics using the abcjs library. The plugin uses JSDOM to create a virtual DOM environment for server-side SVG rendering.

## Development Commands

### Build

```bash
npm run build
```

Builds the library and increments the patch version. Output goes to `dist/` directory.

### Development Watch Mode

```bash
npm run dev
```

Runs build in watch mode for active development.

### Testing

```bash
npm test
```

Runs Vitest tests. Test files are located in `src/test/**/*.test.ts`.

### Format Code

```bash
npm run format          # Auto-format with Prettier
npm run check-format    # Check formatting without modifying
```

### CI Verification

```bash
npm run ci
```

Runs build, format check, and tests - same as what would run in CI.

### Publishing

```bash
npm run local-release
```

Uses changesets to version and publish. The `prepublishOnly` hook automatically runs CI checks before publishing.

## Architecture

### Plugin Flow

1. **Entry Point** (`src/index.ts`)
   - Exports the main plugin function `markdownItAbcMusic(md: MarkdownIt)`
   - Creates an instance of `AbcBlockPlugin` and installs it into the markdown-it parser

2. **Block Parser** (`src/AbcBlockPlugin.ts`)
   - Registers a custom block rule before the standard `fence` rule
   - Recognizes blocks starting with `:::abc` and ending with `:::`
   - Extracts ABC notation content between delimiters
   - Delegates SVG rendering to `AbcSvgRenderer`
   - Injects rendered SVG wrapped in `<div class="abc-music">` as an HTML block token

3. **SVG Renderer** (`src/AbcSvgRenderer.ts`)
   - Creates a singleton JSDOM instance with a virtual DOM
   - Sets up global DOM objects (`window`, `document`, `HTMLElement`, `SVGElement`) required by abcjs
   - Uses `abcjs.renderAbc()` to convert ABC notation to SVG
   - Returns the serialized SVG string

### Key Implementation Details

- **JSDOM Setup**: The renderer creates a virtual DOM environment because abcjs expects browser globals. The JSDOM instance is created with `pretendToBeVisual: true` to enable SVG rendering.

- **Block Rule Priority**: The plugin registers its rule before the standard `fence` rule to intercept `:::abc` blocks before they're parsed as generic fenced code blocks.

- **Token Injection**: The plugin uses `state.push('html_block', '', 0)` to inject raw HTML into the markdown-it token stream, bypassing further markdown processing.

## Build Configuration

- **Vite**: Used for building the library (ES module format only)
- **TypeScript**: Configured for ES2022 with NodeNext module resolution
- **Type Declarations**: Generated via `vite-plugin-dts`
- **Version Injection**: `__PKG_VERSION__` is injected at build time from `package.json`

### External Dependencies

The following are marked as external in the build and expected to be provided by consumers:

- `markdown-it`
- `abcjs`
- `jsdom`

## TypeScript Configuration Notes

- `noImplicitAny: false` is set to allow flexible typing during development
- `checkJs: true` enables type checking in JavaScript files
- `lib: ["es2022"]` - No DOM types since this is a Node.js library (JSDOM provides its own types)
- `emitDeclarationOnly: true` - TypeScript only emits `.d.ts` files; Vite handles the JS compilation

## Testing

Tests use Vitest with Node environment. The test suite:

- Creates a markdown-it instance with the plugin installed
- Renders sample ABC notation
- Verifies that SVG elements are present in the output
- Checks for the wrapper `<div class="abc-music">` element
