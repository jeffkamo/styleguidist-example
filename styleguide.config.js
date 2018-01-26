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
    components: () => {
        const componentList = []
        const folders = glob.sync(path.resolve(__dirname, 'src/components/*'))

        folders.forEach((folder) => {
            const reactComponents = glob.sync(path.resolve(folder, '*.jsx'))

            if (reactComponents.length === 0) {
                // const designComponents = glob.sync(path.resolve(folder, 'DESIGN_README.md'))
                // designComponents.forEach((designComponent) => {
                //     componentList.push(designComponent)
                // })
            } else {
                reactComponents.forEach((reactComponent) => {
                    componentList.push(reactComponent)
                })
            }
        })

        return componentList
    },
    serverHost: '0.0.0.0',
    serverPort: 4000,
    showUsage: true,
    skipComponentsWithoutExample: false,
    styleguideDir: process.env.ReactStyleguideOutputDir || 'docs/public/latest/styleguidist/',
    // assetBuildOrigin: {
    //     prod: '../styleguidist',
    //     dev: '//localhost:4000'
    // },
    // imagePath: 'assets',
    resolver: DocGen.resolver.findAllComponentDefinitions,
    // styleguideComponents: {
    //     ReactComponent: path.join(__dirname, 'styleguide/layout/ReactComponent'),
    //     ReactComponentRenderer: path.join(__dirname, 'styleguide/layout/ReactComponentRenderer'),
    //     StyleGuideRenderer: path.join(__dirname, 'styleguide/layout/StyleGuideRenderer')
    // }
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
                },
                // Components Base styles
                {
                    test: /\.scss$/,
                    // PostCSS configuration for autoprefixer lives in postcss.config.js
                    // `?-autoprefixer required to non-destructively minify CSS`, see
                    // https://github.com/webpack/css-loader#minification
                    loader: ComponentsBaseCSS.extract(['css?-autoprefixer', 'postcss', 'sass']),
                    exclude: /(node_module|styleguide)/,
                    include: __dirname,
                },
                // Loader for styleguide styles
                {
                    test: /\.scss$/,
                    loader: StyleguideCSS.extract(['css?-autoprefixer', 'postcss', 'sass']),
                    include: `${__dirname}/styleguide`,
                },
                {
                    test: /\.css$/,
                    loader: 'style!css?modules&importLoaders=1',
                    include: /styleguide/,
                },
                // SVG Sprite - `npm install text-loader` (https://www.npmjs.com/package/text-loader)
                {
                    test: /\.svg$/,
                    include: /styleguide\/svg/,
                    loader: 'text'
                }
            ]
        }
    }
}
