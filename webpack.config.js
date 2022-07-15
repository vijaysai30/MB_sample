const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: {
                app:path.resolve(__dirname,'app/main.js'),
                vendors: ['jquery','dynamics.js']
            },
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
        {
            apply: (compiler) => {
              compiler.hooks.done.tap('DonePlugin', (stats) => {
                console.log('Compile is done !')
                setTimeout(() => {
                  process.exit(0)
                })
              });
            }
         }
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};