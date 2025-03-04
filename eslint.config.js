// @ts-check

import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
// import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
	eslint.configs.recommended,
    reactPlugin.configs.flat.recommended, 
    reactPlugin.configs.flat['jsx-runtime'],
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	[
		// global ignores
		{
			ignores: [
				'node_modules/',
				'.next/',
                // '**/*.config.{js,ts}'
			],
		},
		{
			languageOptions: {
				parserOptions: {
					projectService: true,
					tsconfigRootDir: import.meta.dirname,
				},
			},
		},
		// rules for ts, tsx, js, & jsx files
		{
			files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
			linterOptions: {
				noInlineConfig: true,
				reportUnusedDisableDirectives: true,
			},
            settings: {
                react: {
                    version: 'detect',
                },
            },
			// plugins: {
			// 	react: reactPlugin,
			// 	// '@next/next': nextPlugin,
			// 	// '@typescript-eslint': tsPlugin,
			// },
			rules: {
				// ...tsPlugin.configs.recommended.rules,
				// ...nextPlugin.configs.recommended.rules,
				// General JavaScript rules
				'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
				'no-duplicate-imports': 'error',
				'prefer-const': 'warn',
				eqeqeq: ['error', 'always'],
				semi: 'error',
				'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			},
           
		},
	]
);
