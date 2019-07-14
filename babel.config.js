const presets = [
    '@babel/preset-react',
    [
        '@babel/preset-env',
        {
            targets: {
                browsers: ['ie >= 11'],
            },
            debug: true,
        },
    ],
];

const plugins = [
    "@babel/plugin-proposal-class-properties",
];

module.exports = { presets, plugins };
