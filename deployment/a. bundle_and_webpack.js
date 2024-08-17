`
Bundling in Web Development
        What is Bundling?

        Bundling in web development is the process of taking multiple files, such as 
        JavaScript, CSS, and images, and combining them into one or a few files. This 
        helps improve the performance of a web application by reducing the number of 
        times a browser needs to request files from the server, making the web page load faster.

        Why Do We Need Bundling?

        - Performance Optimization: Bundling reduces the number of HTTP requests by combining multiple files 
                into one. Fewer requests mean faster load times.

        - Code Splitting: Allows developers to split code into various bundles that can be loaded on demand, 
                improving initial load times.

        - Minification: Bundling tools often also minify the code (removing unnecessary spaces, comments, etc.), 
                which reduces file sizes, speeding up the download process.

        - Modularity: Encourages modular code by allowing developers to split their codebase into multiple files, 
                which can be easily managed and later bundled together.

        - Caching: Bundles can be cached by the browser, meaning that users don't have to download the 
                same files repeatedly.

        What Was Before Bundling?
                Before bundling, developers had to manually manage each individual file. This meant:

                - Multiple HTTP Requests: Each JavaScript, CSS, or image file required a separate HTTP request, 
                        leading to slower page loads.
                - Global Scope Pollution: In JavaScript, all code ran in a global scope, leading to potential 
                        conflicts between different scripts.
                - Manual Optimization: Developers had to manually optimize and concatenate files, which was 
                        tedious and error-prone.


        Bundlers in Web Development
        What are Bundlers?

        - Bundlers are tools that automatically package multiple files into a single file (or a few files). 
        
        They often handle additional tasks like minification, transpiling, and code splitting.
        Examples of Bundlers: Webpack, Rollup, Parcel, Vite

        What is Webpack?

        - Webpack is a tool that helps you bundle all the different pieces of your JavaScript application—like scripts, 
        styles, images, and other assets—into a few files that are easier for a web browser to load.

        Imagine you're building a big project, and you've split your code into many small parts (modules) to keep things 
        organized. Webpack takes these parts, figures out how they depend on each other, and combines them into a 
        smaller number of files. This way, your website or app loads faster because the browser has fewer files to download.
        
        So, in simpler terms, Webpack is like a helper that takes all the separate parts of your project and packs 
        them together in a way that's quicker and easier for the browser to handle.

        Why Do We Need Webpack?
                - Module Management: Webpack allows developers to use a modular approach by breaking 
                        their code into smaller, reusable pieces.
                - Dependency Resolution: Automatically resolves dependencies between files, so you don't 
                        have to manage file ordering.
                - Code Splitting: Allows you to split your code into different bundles that can be loaded on demand.
                - Hot Module Replacement: Supports live reloading, enabling faster development.
                - Plugins and Loaders: Webpack has a rich plugin system to extend its capabilities 
                        (e.g., Babel loader for transpiling ES6 to ES5).
                - Optimization: Webpack can minify and optimize your assets to improve performance.
        
        In Webpack, loaders are special tools that help transform files before they are bundled together. 
        They let Webpack process different types of files (not just JavaScript) and convert them into a 
        format that can be included in your final bundle.

        - Transpile Modern JavaScript: A loader like babel-loader can convert modern JavaScript (ES6+) 
                into a version that older browsers can understand.

        - Process CSS: A loader like css-loader can take your CSS files and allow you to include them in 
                your JavaScript. Another loader, like style-loader, can then inject that CSS into the webpage.

        - Handle Images and Fonts: Loaders like file-loader or url-loader can help you include images, fonts, 
                or other files in your bundle.

        - Convert SCSS to CSS: A loader like sass-loader can take SCSS files (which are CSS with some extra 
                features) and convert them into regular CSS.

How to Implement Webpack?

Installation: Install Webpack and Webpack CLI via npm:

npm install --save-dev webpack webpack-cli
Configuration: Create a webpack.config.js file:
`
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

`
        Build: Run Webpack to bundle your files:
        npx webpack --config webpack.config.js

        JavaScript Modules:

        In the context of JavaScript, a "script" refers to a file or a block of code that 
        is written in JavaScript. When we talk about modules, a script typically means a 
        separate JavaScript file that contains code, which can include variables, functions, classes, etc.

        What are Modules in JS?
                Modules are reusable pieces of code that can be exported from one script and imported 
                into another. This promotes code reuse, separation of concerns, and better organization.

        CommonJS vs ES Modules:

        CommonJS: Used primarily in Node.js. Modules are loaded synchronously.
        require(): Used to import a module.
        module.exports: Used to export functions, objects, or variables from a module.

        Example: 
`       
        // module.js
        module.exports = {
                hello: function() {
                        console.log('Hello, world!');
                },
        };

        // main.js
        const myModule = require('./module');
        myModule.hello();
        // ES Modules (ESM): The modern JavaScript standard for modules, supported natively in the browser and Node.js.

        // import: Used to import modules.
        // export: Used to export functions, objects, or variables.
        // Example:

        // module.js
        export function hello() {
                console.log('Hello, world!');
        }

import test from 'node:test';
        // main.js
        import { hello } from './module.js';
        hello();


`
        Single Page Applications (SPA)
        What is SPA?

        A Single Page Application is a web application that loads a single HTML page and dynamically updates the 
        content as the user interacts with the app.

        Benefits of SPA:

        - Faster Transitions: Only the necessary data is fetched and updated in the view, leading to a faster user 
                experience.
        - Rich User Experience: Provides a more app-like experience with smooth transitions.
        - Less Server Load: Reduces the load on the server since most of the work is done on the client-side.

        Before SPA:
        Before SPAs, web applications were mostly Multi-Page Applications (MPAs). Each interaction required 
        loading a new page from the server, leading to slower transitions and higher server loads.

        How Webpack Helps in SPAs:

        - Bundling and Code Splitting: Webpack bundles the JavaScript and CSS files, ensuring efficient 
                loading and reducing initial load time.
        - Hot Module Replacement: Allows developers to see changes in real-time without refreshing the page.
        - Dependency Management: Automatically manages dependencies, ensuring all required modules are 
                included in the bundle.
        
        Why Webpack in Dev Dependencies?
        Webpack is listed in devDependencies because it's a development tool used to bundle the code 
                during development and build time. It’s not required in the production environment.

        Under the Hood of Webpack
        - Webpack works by starting with the entry file, resolving all its dependencies, and creating a 
                dependency graph. It then bundles everything into one or more output files. Webpack also allows for 
                customization using loaders (to process files) and plugins (to extend its functionality).

        Babel
        What is Babel?
        Babel is a JavaScript compiler that allows developers to write modern JavaScript (ES6+) and transpile 
                it into older versions (like ES5) for compatibility with older browsers.

        Why Do We Need Babel?
        - Browser Compatibility: Ensures that modern JavaScript code runs in older browsers that do not support newer features.
        - Support for JSX: Transpiles JSX syntax (used in React) into standard JavaScript.
        - Polyfills: Adds polyfills for features not natively supported in certain environments.

        Babel in Webpack:
        - Presets: Presets are predefined sets of Babel plugins that support specific environments 
                (e.g., @babel/preset-env for modern JavaScript).
        - Webpack Integration: Babel can be integrated with Webpack using the babel-loader. 
                This allows Babel to transpile code as part of the Webpack build process.

        How to Implement Babel with Webpack:

Install Babel and Presets:

npm install --save-dev @babel/core @babel/preset-env babel-loader
Configure Babel in Webpack:

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
This setup allows you to write modern JavaScript and have it transpiled by Babel as part of your Webpack build process.
`

const path = require('path'); // Core Node.js module to handle file paths
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate HTML files
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Plugin to extract CSS into separate files
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Plugin to clean the output directory before each build
const webpack = require('webpack'); // Core Webpack module to access built-in plugins like HotModuleReplacementPlugin

module.exports = {
  // Define the mode: 'development' or 'production'
  // 'development' enables useful tools like source maps and HMR, while 'production' optimizes the output for deployment.
  mode: 'development',

  // Define the entry point for the application. Webpack will start bundling from this file.
  entry: './src/index.js',

  // Define the output settings. This is where the bundled files will be placed.
  output: {
    filename: 'bundle.[contenthash].js', // Use content hashing for cache busting - 
        // The main purpose of content hashing is to ensure that when a file's content changes, 
        // the filename also changes, which forces the browser to download the new version of the file 
        // instead of using an old cached version.
    path: path.resolve(__dirname, 'dist'), // The output directory as an absolute path
    publicPath: '/', // Public URL of the output directory when referenced in a browser
  },

  // Configure the dev server for development
  devServer: {
    static: './dist', // Serve content from the output directory
    hot: true, // Enable Hot Module Replacement (HMR) for faster development
    open: true, // Automatically open the app in the browser
    compress: true, // Enable gzip compression for everything served
    historyApiFallback: true, // Fallback to index.html for single-page applications
    port: 3000, // Specify a custom port for the dev server
  },

  // Define the module rules (loaders) to transform different file types
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to all JavaScript files
        exclude: /node_modules/, // Exclude files in node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile modern JavaScript to older versions
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use Babel presets to support ES6+ and React JSX syntax
          },
        },
      },
      {
        test: /\.css$/, // Apply this rule to all CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader', // Translates CSS into CommonJS modules
          'postcss-loader', // Apply PostCSS plugins like autoprefixer
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply this rule to image files
        type: 'asset/resource', // Automatically emit these files as separate assets in the output directory
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Apply this rule to font files
        type: 'asset/resource', // Emit these files as separate assets
      },
    ],
  },

  // Define the plugins to extend Webpack's capabilities
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use an HTML file as the template
      inject: 'body', // Inject all bundles at the end of the body tag
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Output file name for extracted CSS, using content hashing
    }),
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new webpack.HotModuleReplacementPlugin(), // Enable HMR for faster development without full page reloads
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Define environment variables for the build process
    }),
  ],

  // Enable source maps for easier debugging
  devtool: 'inline-source-map',

  // Resolve allows you to specify how Webpack should resolve imports and require statements
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions in import statements
    alias: {
      Components: path.resolve(__dirname, 'src/components/'), // Alias for cleaner import paths
      Utils: path.resolve(__dirname, 'src/utils/'), // Alias for utility functions
    },
  },

  // Optimization settings for the build process
  optimization: {
    splitChunks: {
      chunks: 'all', // Split vendor code and shared modules into separate bundles
    },
  },
};


`
Hot Module Replacement (HMR):

        Hot Module Replacement (HMR) is a feature in Webpack that allows you to replace, add, or 
                remove modules while an application is running, without requiring a full page reload. 
                This makes development faster by preserving the application state while making changes, 
                especially useful in Single Page Applications (SPAs).

        Why is HMR Important?

        - Faster Development: HMR significantly speeds up the development process by allowing developers to 
                see changes instantly, without refreshing the page.
        - Preserves Application State: Unlike a full page reload, which resets the state of the application, 
                HMR preserves the state, making it easier to test incremental changes.
        - Better Debugging: Since the state is preserved, it’s easier to debug issues as they occur during development.


Code Splitting:

        What is Code Splitting?
                Code splitting is a technique used in web development to split your codebase 
                into smaller chunks or bundles, which are then loaded on demand. This is essential 
                for improving the performance of web applications by reducing the initial load time.

        Why Do We Need Code Splitting?

        - Performance Optimization: By splitting the code, you can reduce the amount of 
                code that needs to be downloaded, parsed, and executed when the application first
                loads. This results in faster load times and better performance, especially for large applications.
        - Efficient Resource Usage: Code splitting allows you to load only the necessary 
                code for the current view or feature, deferring the loading of other code until it’s actually needed.
        
        How to Implement Code Splitting?
        - Code splitting can be implemented in Webpack through various methods:

        - Entry Points: You can specify multiple entry points in Webpack, which will result in separate bundles.

        entry: {
                main: './src/index.js',
                vendor: './src/vendor.js',
        },


        Dynamic Imports: You can use dynamic import() syntax in your JavaScript code to split out code at a specific point.
        // Dynamic import of a module

        import('./module').then(module => {
        // Use the module
        });

        Webpack will automatically create a separate chunk for the imported module.

        SplitChunks Plugin: Webpack's splitChunks optimization option allows you to automatically 
        split shared dependencies into separate chunks.

        optimization: {
                splitChunks: {
                        chunks: 'all', // Split code for all types of chunks (async and non-async)
                },
        },


        What Was Happening Before Code Splitting?
        - Before code splitting, all the JavaScript code was typically bundled into a 
                single file. This approach worked for smaller applications but became 
                inefficient as applications grew in size. The larger bundle increased 
                load times, especially for users with slower internet connections, 
                leading to poor user experiences.

Lazy Loading and Lazy Imports:

        What is Lazy Loading?
                Lazy loading is a technique that delays the loading of resources 
                (like JavaScript files, images, etc.) until they are actually needed. For 
                JavaScript, this usually means loading parts of the codebase only when the user 
                interacts with certain parts of the application.

        Why Do We Need Lazy Loading?

        - Improved Performance: By loading only the necessary code for the current view, 
                you reduce the initial load time of the application.
        - Optimized Resource Usage: Resources are loaded only when required, leading to 
                more efficient use of bandwidth and reducing the number of unused assets in memory.
        
        What are Lazy Imports?
        - Lazy imports refer to the practice of dynamically importing JavaScript modules only 
                when they are needed. This is a form of lazy loading specifically for JavaScript.

        How to Implement Lazy Imports?
        In modern JavaScript, lazy imports are implemented using the import() syntax:
        // Import a module lazily
        const loadModule = () => import('./MyComponent');

        loadModule().then(MyComponent => {
        // Use MyComponent
        });

        This method will split out MyComponent into a separate bundle that is only loaded when loadModule is called.

Relation Between Code Splitting and Lazy Loading:
        Code splitting and lazy loading often go hand in hand. When you use lazy imports, 
        Webpack automatically performs code splitting by creating a separate bundle for 
        the lazily imported module. This bundle is then loaded only when the module is actually needed.


        tree shaking how to implemnetin webpack.config.js 

        webpack bundle analyser


Tree Shaking in Webpack

        What is Tree Shaking?
        - Tree shaking is a term used in the context of JavaScript bundling to describe a process that 
                removes unused code from the final bundle. The idea is to "shake" the "tree" of your 
                codebase and drop the dead branches (i.e., unused code) to ensure that only the code 
                you actually use is included in the final output.

        Why is Tree Shaking Important?

        - Reduces Bundle Size: By removing unused code, tree shaking helps reduce the size of the 
                JavaScript files that need to be loaded by the browser. This leads to faster load 
                times and improved performance.
        - Improves Load Times: Smaller bundles mean less data to transfer over the network and 
                quicker parsing and execution times in the browser.
        - Optimizes Performance: Removing dead code helps make the application more efficient by 
                reducing the amount of code that needs to be processed and executed.

        How Tree Shaking Works:
        - Static Analysis: Webpack analyzes code to find and remove unused parts.
        - ES6 Modules: Tree shaking relies on ES6 import and export statements to determine used code.
        
        Implementing Tree Shaking in Webpack:
`

// module: {
//         rules: [
//                 {
//                         test: /\.js$/,
//                         // code
//                 }
//         ]
// },
// optimization: {
//         usedExports: true // tree shaking
// }