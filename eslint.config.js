import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import commentsPlugin from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import unicornPlugin from 'eslint-plugin-unicorn';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const noUnusedVarsConfig = [
    'error',
    {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
        vars: 'all',
        varsIgnorePattern: '^_',
    },
];

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default tseslint.config(
    eslint.configs.recommended,
    ...compat.config(commentsPlugin.configs.recommended),
    importPlugin.flatConfigs.recommended,
    prettierPluginRecommended,
    jsxA11yPlugin.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooksPlugin.configs['recommended-latest'],
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    ...compat.config(nextPlugin.configs.recommended),
    [
        // global ignores
        {
            ignores: ['node_modules/', '.next/'],
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
            // needed for the ts linting
            languageOptions: {
                parserOptions: {
                    projectService: true,
                    tsconfigRootDir: import.meta.dirname,
                },
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
            plugins: {
                tsdoc: tsdocPlugin,
                unicorn: unicornPlugin,
            },
            rules: {
                /** BEST PRACTICES */
                /** Require return statements in array methods callbacks. */
                'array-callback-return': ['error', { allowImplicit: true }],
                /** Treat `var` statements as if they were block scoped. */
                'block-scoped-var': 'error',
                /** Require curly braces for multiline blocks. */
                curly: ['warn', 'multi-line'],
                /** Require default clauses in switch statements to be last (if used). */
                'default-case-last': 'error',
                /** Require triple equals (`===` and `!==`). */
                eqeqeq: 'error',
                /** Require grouped accessor pairs in object literals and classes. */
                'grouped-accessor-pairs': 'error',
                /** Disallow use of `alert()`. */
                'no-alert': 'error',
                /** Disallow use of `caller`/`callee`. */
                'no-caller': 'error',
                /** Disallow returning value in constructor. */
                'no-constructor-return': 'error',
                /** Disallow using an `else` if the `if` block contains a return. */
                'no-else-return': 'warn',
                /** Disallow `eval()`. */
                'no-eval': 'error',
                /** Disallow extending native objects. */
                'no-extend-native': 'error',
                /** Disallow unnecessary function binding. */
                'no-extra-bind': 'error',
                /** Disallow unnecessary labels. */
                'no-extra-label': 'error',
                /** Disallow floating decimals. */
                'no-floating-decimal': 'error',
                /** Make people convert types explicitly e.g. `Boolean(foo)` instead of `!!foo`. */
                'no-implicit-coercion': 'error',
                /** Disallow use of `eval()`-like methods. */
                'no-implied-eval': 'error',
                /** Disallow usage of `__iterator__` property. */
                'no-iterator': 'error',
                /** Disallow use of labels for anything other than loops and switches. */
                'no-labels': ['error'],
                /** Disallow unnecessary nested blocks. */
                'no-lone-blocks': 'error',
                /** Disallow `new` for side effects. */
                'no-new': 'error',
                /** Disallow function constructors.  */
                'no-new-func': 'error',
                /** Disallow primitive wrapper instances, such as `new String('foo')`. */
                'no-new-wrappers': 'error',
                /** Disallow use of octal escape sequences in string literals. */
                'no-octal-escape': 'error',
                /** Disallow reassignment of function parameters. */
                'no-param-reassign': 'error',
                /** Disallow usage of the deprecated `__proto__` property. */
                'no-proto': 'error',
                /** Disallow assignment in `return` statement.  */
                'no-return-assign': 'error',
                /** Disallow use of `javascript:` urls. */
                'no-script-url': 'error',
                /** Disallow comparisons where both sides are exactly the same. */
                'no-self-compare': 'error',
                /** Disallow use of comma operator. */
                'no-sequences': 'error',
                /**  Disallow unnecessary `.call()` and `.apply()`. */
                'no-useless-call': 'error',
                /** Disallow unnecessary concatenation of strings. */
                'no-useless-concat': 'error',
                /** Disallow redundant return statements. */
                'no-useless-return': 'warn',
                /** Require using named capture groups in regular expressions. */
                'prefer-named-capture-group': 'error',
                /** Require using Error objects as Promise rejection reasons. */
                'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
                /** Disallow use of the RegExp constructor in favor of regular expression literals. */
                'prefer-regex-literals': 'error',
                /** Disallow "Yoda conditions", ensuring the comparison. */
                yoda: 'warn',

                /** COMMENTS */
                /** Require comments on ESlint disable directives. */
                'eslint-comments/require-description': 'error',

                /** ES6 */
                /** Disallow useless computed property keys. */
                'no-useless-computed-key': 'warn',
                /** Disallow renaming imports, exports, and destructured assignments to the same name. */
                'no-useless-rename': 'warn',
                /** Require `let` or `const` instead of `var`. */
                'no-var': 'error',
                /** Require object literal shorthand syntax. */
                'object-shorthand': 'warn',
                /** Require default to `const` instead of `let`. */
                'prefer-const': 'warn',
                /** Disallow parseInt() in favor of binary, octal, and hexadecimal literals. */
                'prefer-numeric-literals': 'error',
                /**  Require using rest parameters instead of `arguments`. */
                'prefer-rest-params': 'error',
                /** Require using spread syntax instead of `.apply()`. */
                'prefer-spread': 'error',
                /** Require using template literals instead of string concatenation. */
                'prefer-template': 'warn',
                /** Require a `Symbol` description. */
                'symbol-description': 'error',

                /** IMPORT */
                /** Disallow non-import statements appearing before import statements. */
                'import/first': 'error',
                /** Require a newline after the last import/require. */
                'import/newline-after-import': 'warn',
                /** Disallow import of modules using absolute paths. */
                'import/no-absolute-path': 'error',
                /** Disallow cyclical dependencies between modules. */
                'import/no-cycle': 'error',
                /** Disallow default exports. */
                'import/no-default-export': 'error',
                /** Disallow the use of extraneous packages. */
                'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
                /** Disallow mutable exports. */
                'import/no-mutable-exports': 'error',
                /** Disallow importing packages through relative paths. */
                'import/no-relative-packages': 'warn',
                /** Disallow a module from importing itself. */
                'import/no-self-import': 'error',
                /** Ensures that there are no useless path segments. */
                'import/no-useless-path-segments': ['error'],
                /**  Enforce a module import order convention. */
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
                /** Enabled by import/recommended, but better handled by TS & @typescript-eslint. */
                'import/default': 'off',
                'import/export': 'off',
                'import/namespace': 'off',
                'import/no-unresolved': 'off',

                /** POSSIBLE ERRORS */
                /** Disallow the use of certain consoles. */
                'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
                /** Disallow expressions where the operation doesn't affect the value. */
                'no-constant-binary-expression': 'error',
                /** Disallow returning values from Promise executor functions. */
                'no-promise-executor-return': 'error',
                /** Disallow template placeholders in strings; likely errors. */
                'no-template-curly-in-string': 'error',
                /** Disallow loops with a body that allows only one iteration. */
                'no-unreachable-loop': 'error',

                /** STYLISTIC */
                /** Require camel case names. */
                camelcase: [
                    'error',
                    { allow: ['^UNSAFE_'], ignoreDestructuring: false, properties: 'never' },
                ],
                /** Require function expressions to have a name. */
                'func-names': ['error', 'as-needed'],
                /** Require a capital letter for constructors. */
                'new-cap': ['error', { capIsNew: false }],
                /** Disallow omitting parentheses in empty constructor calls. */
                'new-parens': 'warn',
                /** Disallow use of the Array constructor. */
                'no-array-constructor': 'error',
                /** Disallow use of bitwise operators. */
                'no-bitwise': 'error',
                /** Disallow if as the only statement in an else block. */
                'no-lonely-if': 'warn',
                /** Disallow use of chained assignment expressions.  */
                'no-multi-assign': ['error'],
                /**  Disallow nested ternary expressions. */
                'no-nested-ternary': 'error',
                /**  Disallow ternary operators when simpler alternatives exist. */
                'no-unneeded-ternary': 'error',
                /** Require use of an object spread over Object.assign. */
                'prefer-object-spread': 'warn',

                // react
                'react/prop-types': 'off',
                /**
                 * Require an explicit type when using button elements.
                 *
                 * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
                 */
                'react/button-has-type': 'warn',
                /**
                 * Require consistent function type for function components.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/function-component-definition.md
                 */
                'react/function-component-definition': 'warn',
                /**
                 * Require destructuring and symmetric naming of `useState` hook value and setter variables.
                 *
                 * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
                 */
                'react/hook-use-state': 'warn',
                /**
                 * Require consistent boolean attributes notation in JSX.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
                 */
                'react/jsx-boolean-value': 'warn',
                /**
                 * Disallow unnecessary curly braces in JSX props and children.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
                 */
                'react/jsx-curly-brace-presence': 'warn',
                /**
                 * Require using shorthand form for React fragments, unless required.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
                 */
                'react/jsx-fragments': 'warn',
                /**
                 * Prevent problematic leaked values from being rendered.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
                 */
                'react/jsx-no-leaked-render': 'warn',
                /**
                 * Prevents usage of unsafe `target='_blank'`.
                 *
                 * This rule is a part of `react/recommended`, but we've modified it to
                 * allow referrer.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
                 */
                'react/jsx-no-target-blank': [
                    'error',
                    {
                        allowReferrer: true,
                    },
                ],
                /**
                 * Disallow empty React fragments.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
                 */
                'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
                /**
                 * Require the use of PascalCase for user-defined JSX components.
                 *
                 * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
                 */
                'react/jsx-pascal-case': 'warn',
                /**
                 * Disallow usage of Array index in keys.
                 *
                 * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
                 */
                'react/no-array-index-key': 'warn',
                /**
                 * Disallow creating unstable components inside components.
                 *
                 * 🚫 Not fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
                 */
                'react/no-unstable-nested-components': 'error',
                /**
                 * Disallow closing tags for components without children.
                 *
                 * 🔧 Fixable - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
                 */
                'react/self-closing-comp': 'warn',

                // variables
                /**
                 * Disallow labels that share a name with a variable.
                 *
                 * 🚫 Not fixable - https://eslint.org/docs/rules/no-label-var
                 */
                'no-label-var': 'error',
                /**
                 * Disallow initializing variables to `undefined`.
                 *
                 * 🔧 Fixable - https://eslint.org/docs/rules/no-undef-init
                 */
                'no-undef-init': 'warn',
                /**
                 * Disallow unused variables.
                 *
                 * 🚫 Not fixable - https://eslint.org/docs/rules/no-unused-vars
                 */ 'no-unused-vars': noUnusedVarsConfig,

                // typescript
                '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
                /**
                 * Require consistent usage of type exports.
                 *
                 * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-exports/
                 */
                '@typescript-eslint/consistent-type-exports': [
                    'warn',
                    { fixMixedExportsWithInlineTypeSpecifier: true },
                ],
                /**
                 * Require consistent usage of type imports.
                 *
                 * 🔧 Fixable - https://typescript-eslint.io/rules/consistent-type-imports/
                 */
                '@typescript-eslint/consistent-type-imports': [
                    'warn',
                    {
                        disallowTypeAnnotations: true,
                        fixStyle: 'inline-type-imports',
                        prefer: 'type-imports',
                    },
                ],
                /**
                 * Require explicit return types on functions and class methods.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
                 */
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    { allowExpressions: true },
                ],
                /**
                 * Require using function property types in method signatures.
                 *
                 * These have enhanced typechecking, whereas method signatures do not.
                 *
                 * 🔧 Fixable - https://typescript-eslint.io/rules/method-signature-style/
                 */
                '@typescript-eslint/method-signature-style': 'warn',
                /**
                 * Require consistent naming conventions.
                 *
                 * Improves IntelliSense suggestions and avoids name collisions.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/naming-convention/
                 */
                '@typescript-eslint/naming-convention': [
                    'error',
                    // Anything type-like should be written in PascalCase.
                    {
                        format: ['PascalCase'],
                        selector: ['typeLike', 'enumMember'],
                    },
                    // Interfaces cannot be prefixed with `I`, or have restricted names.
                    {
                        custom: {
                            match: false,
                            regex: '^I[A-Z]|^(Interface|Props|State)$',
                        },
                        format: ['PascalCase'],
                        selector: 'interface',
                    },
                ],
                /**
                 * Disallow members of unions and intersections that do nothing or override type information.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/no-redundant-type-constituents/
                 */
                '@typescript-eslint/no-redundant-type-constituents': 'warn',
                /**
                 * Disallow unnecessary namespace qualifiers.
                 *
                 * 🔧 Fixable - https://typescript-eslint.io/rules/no-unnecessary-qualifier/
                 */
                '@typescript-eslint/no-unnecessary-qualifier': 'warn',
                /**
                 * Require using `RegExp.exec()` over `String.match()` for consistency.
                 *
                 * 🔧 Fixable - https://typescript-eslint.io/rules/prefer-regexp-exec/
                 */
                '@typescript-eslint/prefer-regexp-exec': 'warn',
                /**
                 * Require Array#sort calls to provide a compare function.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/require-array-sort-compare/
                 */
                '@typescript-eslint/require-array-sort-compare': [
                    'error',
                    { ignoreStringArrays: true },
                ],
                /**
                 * Require exhaustive checks when using union types in switch statements.
                 *
                 * This ensures cases are considered when items are later added to a union.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/switch-exhaustiveness-check/
                 */
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                /**
                 * Require default parameters to be last.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/default-param-last/
                 */
                '@typescript-eslint/default-param-last': 'error',
                /**
                 * Disallow creation of functions within loops.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/no-loop-func/
                 */
                '@typescript-eslint/no-loop-func': 'error',
                /**
                 * Disallow variable declarations from shadowing variables declared in the
                 * outer scope.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/no-shadow/
                 */
                '@typescript-eslint/no-shadow': 'error',
                /**
                 * Disallow unused variables.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/no-unused-vars/
                 */
                '@typescript-eslint/no-unused-vars': noUnusedVarsConfig,
                /**
                 * Disallow unnecessary constructors.
                 *
                 * 🚫 Not fixable - https://typescript-eslint.io/rules/no-useless-constructor/
                 */
                '@typescript-eslint/no-useless-constructor': 'error',

                /** TSDOC */
                /** Require TSDoc comments conform to the TSDoc specification. */
                'tsdoc/syntax': 'error',

                /** UNICORN */
                /** Require using the `node:` protocol when importing Node.js built-in modules. */
                'unicorn/prefer-node-protocol': 'warn',
            },
        },
        {
            files: ['**/*.{js,ts,cjs,cts,mjs,mts}'],
            rules: {
                /** Require consistent filename case for all js,ts files. */
                'unicorn/filename-case': [
                    'error',
                    {
                        cases: {
                            camelCase: true,
                            kebabCase: true,
                        },
                    },
                ],
            },
        },
        {
            files: ['**/*.{jsx,tsx}'],
            rules: {
                /** Require consistent filename case for all jsx,tsx files. */
                'unicorn/filename-case': [
                    'error',
                    {
                        cases: {
                            pascalCase: true,
                        },
                    },
                ],
            },
        },
        // allow default exports in certain files that require them
        {
            files: [
                '**/error.tsx',
                '**/global-error.tsx',
                '**/layout.tsx',
                '**/loading.tsx',
                '**/not-found.tsx',
                '**/page.tsx',
                '**/*.config.{js,ts}',
            ],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ]
);
