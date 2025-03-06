// ESLint Core and Configuration Imports
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

/**
 * Create FlatCompat instance to handle shared configs not up
 * to date with the latest eslint flat config
 */
const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default tseslint.config(
    // Core ESLint Configurations
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    // Compatibility Configurations
    ...compat.config(commentsPlugin.configs.recommended),
    ...compat.config(nextPlugin.configs.recommended),
    // Plugin Configurations
    importPlugin.flatConfigs.recommended,
    prettierPluginRecommended,
    jsxA11yPlugin.flatConfigs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooksPlugin.configs['recommended-latest'],
    [
        /** Global ignores */
        {
            ignores: ['node_modules/', '.next/'],
        },
        /**
         * Prevent ts linting on certain config files -
         * https://typescript-eslint.io/users/configs/#disable-type-checked
         */
        {
            files: ['**/*.{js,mjs,cjs}'],
            extends: [tseslint.configs.disableTypeChecked],
        },
        /** Rules for ts, tsx, js, & jsx files */
        {
            files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
            linterOptions: {
                reportUnusedDisableDirectives: true,
            },
            /** Tell tslint parser how to find the TSConfig for each source file. */
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
                /** Resolver for typescript and node imports */
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
                /** Enabled by import/recommended, but better handled by TS & typescript-eslint. */
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

                /** REACT */
                'react/prop-types': 'off',
                /** Require an explicit type when using button elements. */
                'react/button-has-type': 'warn',
                /** Require consistent function type for function components. */
                'react/function-component-definition': 'warn',
                /** Require destructuring and symmetric naming of `useState` hook value and setter variables. */
                'react/hook-use-state': 'warn',
                /** Require consistent boolean attributes notation in JSX. */
                'react/jsx-boolean-value': 'warn',
                /** Disallow unnecessary curly braces in JSX props and children. */
                'react/jsx-curly-brace-presence': 'warn',
                /**  Require using shorthand form for React fragments, unless required. */
                'react/jsx-fragments': 'warn',
                /** Prevent problematic leaked values from being rendered. */
                'react/jsx-no-leaked-render': 'warn',
                /** Prevents unsafe target='_blank'. Modified from react/recommended to allow referrer */
                'react/jsx-no-target-blank': [
                    'error',
                    {
                        allowReferrer: true,
                    },
                ],
                /** Disallow empty React fragments. */
                'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
                /** Require the use of PascalCase for user-defined JSX components. */
                'react/jsx-pascal-case': 'warn',
                /**  Disallow usage of Array index in keys. */
                'react/no-array-index-key': 'warn',
                /** Disallow creating unstable components inside components. */
                'react/no-unstable-nested-components': 'error',
                /** Disallow closing tags for components without children. */
                'react/self-closing-comp': 'warn',

                /** TYPESCRIPT */
                /** Require types definitions be types only */
                '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
                /** Require consistent usage of type exports. */
                '@typescript-eslint/consistent-type-exports': [
                    'warn',
                    { fixMixedExportsWithInlineTypeSpecifier: true },
                ],
                /** Require consistent usage of type imports. */
                '@typescript-eslint/consistent-type-imports': [
                    'warn',
                    {
                        disallowTypeAnnotations: true,
                        fixStyle: 'inline-type-imports',
                        prefer: 'type-imports',
                    },
                ],
                /** Require explicit return types on functions and class methods. */
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    { allowExpressions: true },
                ],
                /** Require using function property types in method signatures. */
                '@typescript-eslint/method-signature-style': 'warn',
                /** Require consistent naming for better IntelliSense and to avoid collisions. */
                '@typescript-eslint/naming-convention': [
                    'error',
                    // Anything type-like should be written in PascalCase.
                    {
                        format: ['PascalCase'],
                        selector: ['typeLike', 'enumMember'],
                    },
                    // Types cannot be prefixed with `T`, 'I', or use restricted names.
                    {
                        custom: {
                            match: false,
                            regex: '^T[A-Z]|^I[A-Z]|^(Interface|Props|State)$',
                        },
                        format: ['PascalCase'],
                        selector: ['typeAlias', 'interface'],
                    },
                ],
                /** Disallow members of unions and intersections that do nothing or override type information.*/
                '@typescript-eslint/no-redundant-type-constituents': 'warn',
                /** Disallow unnecessary namespace qualifiers. */
                '@typescript-eslint/no-unnecessary-qualifier': 'warn',
                /** Require using `RegExp.exec()` over `String.match()` for consistency. */
                '@typescript-eslint/prefer-regexp-exec': 'warn',
                /** Require Array#sort calls to provide a compare function. */
                '@typescript-eslint/require-array-sort-compare': [
                    'error',
                    { ignoreStringArrays: true },
                ],
                /** Require exhaustive checks when using union types in switch statements. */
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                /** Require default parameters to be last. */
                '@typescript-eslint/default-param-last': 'error',
                /** Disallow creation of functions within loops. */
                '@typescript-eslint/no-loop-func': 'error',
                /**  Disallow variable shadowing outer scope variables. */
                '@typescript-eslint/no-shadow': 'error',
                /** Disallow unused variables. */
                '@typescript-eslint/no-unused-vars': noUnusedVarsConfig,
                /** Disallow unnecessary constructors. */
                '@typescript-eslint/no-useless-constructor': 'error',

                /** TSDOC */
                /** Require TSDoc comments conform to the TSDoc specification. */
                'tsdoc/syntax': 'error',

                /** UNICORN */
                /** Require using the `node:` protocol when importing Node.js built-in modules. */
                'unicorn/prefer-node-protocol': 'warn',

                /** VARIABLES */
                /** Disallow labels that share a name with a variable. */
                'no-label-var': 'error',
                /** Disallow initializing variables to `undefined`. */
                'no-undef-init': 'warn',
                /** Disallow unused variables. */
                'no-unused-vars': noUnusedVarsConfig,
            },
        },
        {
            /** Require consistent filename case for all js,ts files. */
            files: ['**/*.{js,ts,cjs,cts,mjs,mts}'],
            rules: {
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
            /** Require consistent filename case for all jsx,tsx files. */
            files: ['**/*.{jsx,tsx}'],
            rules: {
                'unicorn/filename-case': [
                    'error',
                    {
                        cases: {
                            pascalCase: true,
                        },
                        // Ignore Next app router file names
                        ignore: [
                            /^(?<fileNames>error|global-error|layout|loading|not-found|page)\.(?<fileTypes>jsx|tsx)$/i,
                        ],
                    },
                ],
            },
        },
        {
            /** Allow default exports in certain files that require them */
            files: [
                '**/error.{jsx,tsx}',
                '**/global-error.{jsx,tsx}',
                '**/layout.{jsx,tsx}',
                '**/loading.{jsx,tsx}',
                '**/not-found.{jsx,tsx}',
                '**/page.{jsx,tsx}',
                '**/*.config.{js,ts}',
            ],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ]
);
