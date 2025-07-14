import { context } from "esbuild";
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { readFileSync } from 'node:fs';
import { extname, dirname as _dirname } from "node:path";


const nodeModules = new RegExp(
  /^(?:.*[\\/])?node_modules(?:\/(?!postgres-migrations).*)?$/
);

const dirnamePlugin = {
  name: 'dirname',
  setup(build) {
    build.onLoad({ filter: /.*/ }, ({ path: filePath }) => {
      if (!filePath.match(nodeModules)) {
        let contents = readFileSync(filePath, 'utf8');
        const loader = extname(filePath).substring(1);
        const dirname = _dirname(filePath);
        contents = contents
          .replace('__dirname', `"${dirname}"`)
          .replace('__filename', `"${filePath}"`);
        return {
          contents,
          loader,
        };
      }
    });
  },
};

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === "production";

// const banner = `
// 	import { createRequire as shim_createRequire } from 'module';
// 	import { fileURLToPath as shim_fileURLToPath  } from 'url';
// 	const require = shim_createRequire(import.meta.url);
// 	const __filename = shim_fileURLToPath(import.meta.url);
// 	const __dirname = import.meta.dirname;`
// 	.split("\n")
// 	.filter(Boolean)
// 	.map(l => l.trim().endsWith(";") ? l.trim() : l.trim() + ";")
// 	.join(isProduction ? " " : "\n");

const ctx = await context({
	entryPoints: ["./src/index.ts"],
	// banner: {
	// 	js: banner
	// },
	outdir: "./dist",
	minify: isProduction,
	target: "es2022",
	bundle: true,
	format: "esm",
	//! extremly important to be platform neutral
	//! to ensure that modules run in browser
	//! and server contexts.
	platform: "neutral",
	mainFields: ["module", "main"],
	external: ["typescript", "debug", "fast-glob", "inspector", "globby"],
	sourcemap: false,
	plugins: [
		NodeModulesPolyfillPlugin(),
		NodeGlobalsPolyfillPlugin(),
		{
			name: 'tty-mock',
			setup(build) {
				build.onResolve({ filter: /^tty$/ }, () => ({ 
					path: new URL('./mocks/tty.js', import.meta.url).pathname
				}));
			},
		},
		dirnamePlugin
	],
});

if (isProduction === false) {
	await ctx.watch();
	// eslint-disable-next-line no-undef
	console.info("Watching for changes...");
} else {
	await ctx.rebuild();
	await ctx.dispose();
}
