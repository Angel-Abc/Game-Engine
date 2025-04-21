import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config: Configuration = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
        chunkFilename: '[name].chunk.js',
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            Game: path.resolve(__dirname, 'src/game/'),
            Utils: path.resolve(__dirname, 'src/utils/'),
            State: path.resolve(__dirname, 'src/state/'),
            Styling: path.resolve(__dirname, 'src/styling/'),
            Types: path.resolve(__dirname, 'src/types/')
        }
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

export default config