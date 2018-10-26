module.exports = {
    entry: {
        app: ['babel-polyfill', './src/entries/app.js']
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/assets/js',
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './dist'
    }
};
