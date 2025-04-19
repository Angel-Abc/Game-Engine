const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { stat } = require('fs')

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
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
            Game: path.resolve(__dirname, 'src/game/'),
            Types: path.resolve(__dirname, 'src/types/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
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
    devtool: 'source-map',
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