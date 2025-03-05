import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import commentsPlugin from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export default tseslint.config(
	eslint.configs.recommended,
	...compat.config(commentsPlugin.configs.recommended),
	importPlugin.flatConfigs.recommended,
	// importPlugin.flatConfigs.recommendedTypeScript,
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	...compat.config(nextPlugin.configs.recommended),
	[
		// global ignores
		{
			ignores: ['node_modules/', '.next/'],
		},
		{
			languageOptions: {
				parserOptions: {
					projectService: true,
					tsconfigRootDir: import.meta.dirname,
				},
			},
		},
		// prevent ts linting on certain config files - https://typescript-eslint.io/users/configs/#disable-type-checked
		{
			files: ['**/*.{js,mjs,cjs}'],
			extends: [tseslint.configs.disableTypeChecked],
		},
		// rules for ts, tsx, js, & jsx files
		{
			files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
			linterOptions: {
				// noInlineConfig: true,
				reportUnusedDisableDirectives: true,
			},
			settings: {
				react: {
					version: 'detect',
				},
				// resolver for typescript and node imports
				'import/resolver': {
					typescript: true,
					node: true,
				},
			},
			// plugins: {
			// 	'@next/next': fixupPluginRules(nextPlugin),
			// 	'eslint-comments': fixupPluginRules(commentsPlugin),
			// },
			rules: {
				// General JavaScript rules
				// 'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
				// 'no-duplicate-imports': 'error',
				// 'prefer-const': 'warn',
				// semi: 'error',

				// best practices
				/**
				 * Require return statements in array methods callbacks.
				 *
				 * 🚫 Not fixable -https://eslint.org/docs/rules/array-callback-return
				 */
				'array-callback-return': ['error', { allowImplicit: true }],
				/**
				 * Treat `var` statements as if they were block scoped.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/block-scoped-var
				 */
				'block-scoped-var': 'error',
				/**
				 * Require curly braces for multiline blocks.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/curly
				 */
				curly: ['warn', 'multi-line'],
				/**
				 * Require default clauses in switch statements to be last (if used).
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/default-case-last
				 */
				'default-case-last': 'error',
				/**
				 * Require triple equals (`===` and `!==`).
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/eqeqeq
				 */
				eqeqeq: 'error',
				/**
				 * Require grouped accessor pairs in object literals and classes.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/grouped-accessor-pairs
				 */
				'grouped-accessor-pairs': 'error',
				/**
				 * Disallow use of `alert()`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-alert
				 */
				'no-alert': 'error',
				/**
				 * Disallow use of `caller`/`callee`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-caller
				 */
				'no-caller': 'error',
				/**
				 * Disallow returning value in constructor.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-constructor-return
				 */
				'no-constructor-return': 'error',
				/**
				 * Disallow using an `else` if the `if` block contains a return.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-else-return
				 */
				'no-else-return': 'warn',
				/**
				 * Disallow `eval()`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-eval
				 */
				'no-eval': 'error',
				/**
				 * Disallow extending native objects.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-extend-native
				 */
				'no-extend-native': 'error',
				/**
				 * Disallow unnecessary function binding.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-extra-bind
				 */
				'no-extra-bind': 'error',
				/**
				 * Disallow unnecessary labels.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-extra-label
				 */
				'no-extra-label': 'error',
				/**
				 * Disallow floating decimals.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-floating-decimal
				 */
				'no-floating-decimal': 'error',
				/**
				 * Make people convert types explicitly e.g. `Boolean(foo)` instead of `!!foo`.
				 *
				 * 🔧 Partially Fixable - https://eslint.org/docs/rules/no-implicit-coercion
				 */
				'no-implicit-coercion': 'error',
				/**
				 * Disallow use of `eval()`-like methods.
				 *
				 * https://eslint.org/docs/rules/no-implied-eval
				 */
				'no-implied-eval': 'error',
				/**
				 * Disallow usage of `__iterator__` property.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-iterator
				 */
				'no-iterator': 'error',
				/**
				 * Disallow use of labels for anything other than loops and switches.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-labels
				 */
				'no-labels': ['error'],
				/**
				 * Disallow unnecessary nested blocks.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-lone-blocks
				 */
				'no-lone-blocks': 'error',
				/**
				 * Disallow `new` for side effects.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-new
				 */
				'no-new': 'error',
				/**
				 * Disallow function constructors.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-new-func
				 */
				'no-new-func': 'error',
				/**
				 * Disallow primitive wrapper instances, such as `new String('foo')`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-new-wrappers
				 */
				'no-new-wrappers': 'error',
				/**
				 * Disallow use of octal escape sequences in string literals.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-octal-escape
				 */
				'no-octal-escape': 'error',
				/**
				 * Disallow reassignment of function parameters.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-param-reassign
				 */
				'no-param-reassign': 'error',
				/**
				 * Disallow usage of the deprecated `__proto__` property.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-proto
				 */
				'no-proto': 'error',
				/**
				 * Disallow assignment in `return` statement.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-return-assign
				 */
				'no-return-assign': 'error',
				/**
				 * Disallow use of `javascript:` urls.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-script-url
				 */
				'no-script-url': 'error',
				/**
				 * Disallow comparisons where both sides are exactly the same.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-self-compare
				 */
				'no-self-compare': 'error',
				/**
				 * Disallow use of comma operator.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-sequences
				 */
				'no-sequences': 'error',
				/**
				 * Disallow unnecessary `.call()` and `.apply()`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-useless-call
				 */
				'no-useless-call': 'error',
				/**
				 * Disallow unnecessary concatenation of strings.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/no-useless-concat
				 */
				'no-useless-concat': 'error',
				/**
				 * Disallow redundant return statements.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-return
				 */
				'no-useless-return': 'warn',
				/**
				 * Require using named capture groups in regular expressions.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-named-capture-group
				 */
				'prefer-named-capture-group': 'error',
				/**
				 * Require using Error objects as Promise rejection reasons.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-promise-reject-errors
				 */
				'prefer-promise-reject-errors': [
					'error',
					{ allowEmptyReject: true },
				],
				/**
				 * Disallow use of the RegExp constructor in favor of regular expression
				 * literals.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-regex-literals
				 */
				'prefer-regex-literals': 'error',
				/**
				 * Disallow "Yoda conditions", ensuring the comparison.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/yoda
				 */
				yoda: 'warn',

				// comments
				/**
				 * Require comments on ESlint disable directives.
				 *
				 * 🚫 Not fixable - https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
				 */
				'eslint-comments/require-description': 'error',

				//es6
				/**
				 * Disallow useless computed property keys.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-computed-key
				 */
				'no-useless-computed-key': 'warn',
				/**
				 * Disallow renaming import, export, and destructured assignments to the
				 * same name.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-useless-rename
				 */
				'no-useless-rename': 'warn',
				/**
				 * Require `let` or `const` instead of `var`.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/no-var
				 */
				'no-var': 'error',
				/**
				 * Require object literal shorthand syntax.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/object-shorthand
				 */
				'object-shorthand': 'warn',
				/**
				 * Require default to `const` instead of `let`.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/prefer-const
				 */
				'prefer-const': 'warn',
				/**
				 * Disallow parseInt() in favor of binary, octal, and hexadecimal literals.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/prefer-numeric-literals
				 */
				'prefer-numeric-literals': 'error',
				/**
				 * Require using rest parameters instead of `arguments`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-rest-params
				 */
				'prefer-rest-params': 'error',
				/**
				 * Require using spread syntax instead of `.apply()`.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/prefer-spread
				 */
				'prefer-spread': 'error',
				/**
				 * Require using template literals instead of string concatenation.
				 *
				 * 🔧 Fixable - https://eslint.org/docs/rules/prefer-template
				 */
				'prefer-template': 'warn',
				/**
				 * Require a `Symbol` description.
				 *
				 * 🚫 Not fixable - https://eslint.org/docs/rules/symbol-description
				 */
				'symbol-description': 'error',

				//imports
				/**
				 * Disallow non-import statements appearing before import statements.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
				 */
				'import/first': 'error',
				/**
				 * Require a newline after the last import/require.
				 *
				 * 🔧 Fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
				 */
				'import/newline-after-import': 'warn',
				/**
				 * Disallow import of modules using absolute paths.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md
				 */
				'import/no-absolute-path': 'error',
				/**
				 * Disallow cyclical dependencies between modules.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
				 */
				'import/no-cycle': 'error',
				/**
				 * Disallow default exports.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
				 */
				'import/no-default-export': 'error',
				/**
				 * Disallow the use of extraneous packages.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
				 */
				'import/no-extraneous-dependencies': [
					'error',
					{ includeTypes: true },
				],
				/**
				 * Disallow mutable exports.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
				 */
				'import/no-mutable-exports': 'error',
				/**
				 * Disallow importing packages through relative paths.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md
				 */
				'import/no-relative-packages': 'warn',
				/**
				 * Disallow a module from importing itself.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
				 */
				'import/no-self-import': 'error',
				/**
				 * Ensures that there are no useless path segments.
				 *
				 * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
				 */
				'import/no-useless-path-segments': ['error'],
				/**
				 * Enforce a module import order convention.
				 *
				 * 🔧 Fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
				 */
				'import/order': [
					'warn',
					{
						groups: [
							'builtin', // Node.js built-in modules
							'external', // Packages
							'internal', // Aliased modules
							'parent', // Relative parent
							'sibling', // Relative sibling
							'index', // Relative index
						],
						'newlines-between': 'never',
					},
				],

				'@typescript-eslint/consistent-type-definitions': [
					'error',
					'type',
				],
			},
		},
	]
);
