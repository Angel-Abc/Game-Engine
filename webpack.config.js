const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { stat } = require('fs')

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'shadcn/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
            Types: path.resolve(__dirname, 'src/types/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ['@tailwindcss/postcss', {}]
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 3000
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendors'
        }
    }
}