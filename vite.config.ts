import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, uRL } from 'node:url';
import path from 'node:path';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig ({
	plugins : [
		react(),
		dts({
			insertTypesEntry : true,
			include : ['lib'],
			outDir : 'dist',
			staticImport : true,
			tsconfigPath : './tsconfig.app.json',
			rollupTypes : true,
			compilerOptions : {
				verbatimModulesSyntax : true,
			},
		}),
	],
	build : {
		lib : {
			entry : path.resolve(__dirname, ;lib/index.ts'),
			name : 'NovaLib' ,
			formats : ['es', 'umd'],
			fileName : (format) => 'nova-lib.${format}.js',
		},
		rollupOptions : {
			external : ['react', 'react-dom'],
			output : {
				globals : {
					react : 'React',
					'react-dom' : 'ReactDOM',
				},
			},
		},
		emptyOutDir : true,
	},
	resolve : {
		alias : {
			'@lib : fileURLToPath (new URL('./lib' , import.meta.url)),
		},
	},
});