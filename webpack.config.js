let webpack = require('webpack');
let path = require('path');


let CHUNKS_WHOLE_SPECTRUM = 'all';
let CHUNKS_ASYNC_ONLY = 'async';
let CHUNKS_INITIAL_ONLY = 'initial';
let ROOT = path.resolve(__dirname);
let HtmlWebpackPlugin = require('html-webpack-plugin');
const BAP = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const groupsOptions = {minSize: 0, minChunks: 1, reuseExistingChunk: true, enforce: true};

let config =
    {
        entry: {
            main: path.resolve(__dirname) + '/main.jsx'
        },
        mode: 'production',
        node: {__dirname: true, __filename: true},
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                RootComponents: ROOT
            }
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "main.[hash].bundle.js",
            chunkFilename: "[name].[chunkhash].bundle.js",
            publicPath: "./dist/"
        },
        optimization: {
            splitChunks: {
                chunks: CHUNKS_WHOLE_SPECTRUM,
                name: false,
                cacheGroups: {
                    reactVendors: {
                        test: /react|fbjs/,//new RegExp(/[\\/]node_modules[\\/]react/),
                        name: 'ReactVendors',
                        chunks: CHUNKS_INITIAL_ONLY,
                        ...groupsOptions
                    },
                    utilsVendors: {
                        test: /prop-types|query-string/,//new RegExp(/[\\/]node_modules[\\/]query-string/),
                        name: 'UtilsVendors',
                        chunks: CHUNKS_WHOLE_SPECTRUM,
                        ...groupsOptions
                    },
                    commons: {
                        test: /core-js|babel-runtime|regenerator-runtime|object-assign|decode-uri-component|strict-uri-encode/,
                        name: 'Commons',
                        chunks: CHUNKS_WHOLE_SPECTRUM,
                        ...groupsOptions
                    }
                }
            },
            runtimeChunk: {
                name: "manifest",
            }
        },
        plugins: [
            new HtmlWebpackPlugin(
                {
                    title: 'Code Splitting',
                    template: 'index.ejs',
                    inject: 'body',
                    filename: '../index.html'
                }),
            new BAP()
        ],
        module:
            {
                rules:
                    [
                        {
                            test: /\.js(x)$/,
                            use: {
                                loader: "babel-loader",
                                options:
                                    {
                                        presets: ['babel-preset-env', 'babel-preset-react'],
                                        plugins: [
                                            require('babel-plugin-transform-object-rest-spread'),
                                            require('babel-plugin-transform-class-properties'),
                                            require('babel-plugin-syntax-dynamic-import'),
                                            require('babel-plugin-transform-runtime'),
                                        ]
                                    }
                            }
                        }
                    ]
            }
    };

module.exports = config;