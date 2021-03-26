const path = require("path");
const defaultSettings = require("./src/settings.js");
const mockServer = require("./mock/mock-dev");

function resolve(dir) {
    return path.join(__dirname, dir);
}

const globalTitle = defaultSettings.title || "替比营销系统";
// 服务地址 （ process.env：包含用户环境信息的对象。）
const port = process.env.port || process.env.npm_config_port || 8300;
// 是否是生产环境和预发布
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
/**
 * 配置项详情：https://cli.vuejs.org/zh/config/#baseurl
 * @type {{outputDir: string, productionSourceMap: boolean, assetsDir: string, lintOnSave: boolean, publicPath: string}}
 */
module.exports = {
    publicPath: "/",// 部署应用包时的基本 URL 设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径
    outputDir: "dist", // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    assetsDir: "static", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    lintOnSave: process.env.NODE_ENV === "development", // 在开发环境下是否启用当 eslint-loader
    productionSourceMap: IS_PROD,// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

    // 编译node_modules里的包为es5语法，主要目的是适用IE浏览器9及以上
    // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
    transpileDependencies: ["@tibi/json-web-token", "@tibi/http", "@tibi/ali-oss"],

    //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。
    // 该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    configureWebpack: config => {
        const plugins = [];
        plugins.push(
            new CompressionWebpackPlugin({
                // filename: "[path].gz[query]",
                algorithm: "gzip",
                test: productionGzipExtensions,
                // 大于10kb的会压缩
                threshold: 10240,
                minRatio: 0.8,
                // 删除原文件
                deleteOriginalAssets: false
            })
        );
        config.plugins = [...config.plugins, ...plugins];
    },

    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。
    // 该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象：
    chainWebpack(config) {
        config.name(globalTitle);
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@api", resolve("src/api"))
            .set("@assets", resolve("src/assets"))
            .set("@components", resolve("src/components"))
            .set("@directives", resolve("src/directives"))
            .set("@views", resolve("src/views"))
            .set("@utils", resolve("src/utils"))
            .set("@layout", resolve("src/layout"));

        config.plugins.delete("preload");
        config.plugins.delete("prefetch");

        // set svg-sprite-loader
        config.module.rules.delete("svg");
        config.module
            .rule("svg")
            .exclude.add(resolve("src/assets/icons"))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/assets/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            })
            .end();

        // set preserveWhitespace
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                // eslint-disable-next-line no-param-reassign
                options.compilerOptions.preserveWhitespace = true;
                return options;
            })
            .end();

        // config.when(process.env.NODE_ENV === "development", config => config.devtool("cheap-source-map"));

        // eslint-disable-next-line no-shadow
        config.when(process.env.NODE_ENV !== "development", config => {
            config
                .plugin("ScriptExtHtmlWebpackPlugin")
                .after("html")
                .use("script-ext-html-webpack-plugin", [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end();

            config.optimization.splitChunks({
                chunks: "all",
                cacheGroups: {
                    libs: {
                        name: "chunk-libs",
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: "initial" // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: "chunk-elementUI", // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: "chunk-commons",
                        test: resolve("src/components"), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk("single");
        });
    },

    // 本地服务器
    devServer: {
        port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        before: mockServer
    }
};