const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const processEnv = process.env.NODE_ENV;
// const publicPathInfo = processEnv === 'development' ? '/jnsDev/' : processEnv === 'test' ? '/jnsTest/' : '/jns/';
const isProd = processEnv === 'production';


let objectProject = {
    index: {
        // page 的入口
        entry: 'src/page/index/main.js',
        // 模板来源
        template: 'src/public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        // title: 'default',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    page2: {
        entry: 'src/page/page2/main.js',
        template: 'src/public/page2.html',
        filename: 'page2.html',
        chunks: ['chunk-vendors', 'chunk-common', 'page2']
    },
};
//分入口打包
let pages = {};
let projectName = process.argv[3];
let projectArr = ['index', 'page2'];
if ((isProd && projectName == 'all') || !isProd) {
    pages = objectProject;
} else if (isProd && projectArr.includes[projectName]) {
    pages[projectName] = objectProject[projectName];
} else {
    pages = objectProject;
}

module.exports = {
    // publicPath: publicPathInfo,
    publicPath: './',
    outputDir: (isProd && projectName != 'all') ? 'dist_' + projectName : 'dist',//标识是打包哪个文件
    pages: pages,
    devServer: {
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                target: process.env.VUE_APP_API_URL,
                // 如果要代理 websockets
                // ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        stats: 'errors-only',
    },
    lintOnSave: false,
    productionSourceMap: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin Default: 生产环境下是 true，开发环境下是 false
        // extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                        // 该项仅在使用 Circle 组件时需要
                        // 原因参见 https://github.com/youzan/vant/issues/1948
                        selectorBlackList: ['van-circle__layer']
                    })
                ]
            },
            less: {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                }]
            }
        }
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@css', resolve('src/assets/css'))
            .set('@image', resolve('src/assets/image'));
        config.performance.hints(false);
    },
    // configureWebpack: config => {
    // if (isProd) {
    //     const plugins = [];
    //     plugins.push(
    //         new CompressionWebpackPlugin({
    //             filename: '[path].gz[query]',
    //             algorithm: 'gzip',
    //             test: productionGzipExtensions,
    //             threshold: 10240,
    //             minRatio: 0.8
    //         })
    //     );
    //     config.plugins = [...config.plugins, ...plugins];
    // }
    // },
    // 使用 Vue CLI 3+ 时，需要在 vue.config.js 中的 transpileDependencies 增加 vue-echarts 及 resize-detector，如下
    // transpileDependencies: [
    //     'vue-echarts',
    //     'resize-detector'
    // ],
    // productionSourceMap: false,
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/less/style.less'),
                path.resolve(__dirname, './src/assets/less/theme-colors-default.less')
            ],
        });
}