const path = require('path')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const DocGen = require('react-docgen')

const ComponentsBaseCSS = new ExtractTextPlugin('css/components-base.css')
const StyleguideCSS = new ExtractTextPlugin('css/styleguide.css')

const copySketchSlices = new CopyPlugin([
    {
        context: 'src/components',
        from: '**/assets/*',
        to: 'assets'
    }
])

module.exports = {
    title: 'Example',
    serverHost: '0.0.0.0',
    serverPort: 4000,
    showUsage: true,
    skipComponentsWithoutExample: false,
    styleguideDir: process.env.ReactStyleguideOutputDir || 'docs/public/latest/styleguidist/',
    // resolver: DocGen.resolver.findAllComponentDefinitions, // THIS WAS THE CULPRET
    webpackConfig: {
        module: {
            loaders: [
                // Babel loader will use your project’s .babelrc
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    include: __dirname,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        }
    }
}
