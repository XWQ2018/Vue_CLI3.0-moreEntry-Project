
// transform-remove-console 去除console.log 
let plugins = [
    ['import', {
        'libraryName': 'vant',
        'libraryDirectory': 'es',
        'style': true
    }],
];
if (process.env.NODE_ENV === 'production') {
    plugins.push('transform-remove-console');
}
module.exports = {
    presets: [
        ['@vue/app', {
            'useBuiltIns': 'entry'
        }]
    ],
    plugins: plugins
};