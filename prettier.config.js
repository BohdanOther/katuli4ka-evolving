module.exports = {
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'avoid',

    overrides: [
        {
            files: 'package*.json',
            options: {
                printWidth: 1000,
            },
        },
    ],
};
