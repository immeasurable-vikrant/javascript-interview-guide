`
What is Build?
        
        What Does It Mean to Build Code?
        - Building code is the process of converting your source code into a form
                that can be executed or deployed. It typically involves transforming, 
                optimizing, and packaging the code for production use.


        In the Context of Web Apps:

        - Build Process: For web apps, the build process includes compiling source files 
                (like JavaScript, TypeScript, SCSS) into optimized files that the browser 
                can understand. This may also involve bundling multiple files into a single 
                file, minifying code, and generating source maps.

        - Build Time: This is the phase when the code is transformed and prepared for deployment. 
                It occurs after development and before deployment.
        
        
        Build vs. Other Times:

        - Development Time: During development, code is often run in its raw form, with tools 
                like Webpack using a development configuration that provides features like 
                live reloading and detailed error messages.
        - Build Time: This is when the code is processed and optimized for production. 
                It includes tasks like minification, bundling, and tree shaking.
        - Runtime: This is when the built code is executed by the browser or server 
                in a production environment.
        
        
        What Happens in the Build Stage?

        - Compilation: Code is converted from languages like TypeScript or SCSS into JavaScript and CSS.
        - Bundling: Multiple files are combined into fewer files (bundles) to reduce the number of HTTP requests.
        - Minification: Code is compressed to reduce file size, removing whitespace and shortening variable names.
        - Optimization: Additional optimizations like tree shaking (removing unused code) and code splitting 
                (loading code on demand) are applied.
        - Generation: Source maps and other assets are generated.
        
        
        What Happens After the Code is Built?

        - Deployment: The built code is prepared for deployment to a production server or cloud service.
        - Distribution: The optimized files are served to users via a web server or content delivery network (CDN).
        
        
        What Do We Do with the Built Code?

        - Deploy: The built code is uploaded to a server, cloud service, or hosting platform.
        - Serve: Users access the built code through a web server or CDN, which delivers 
                the optimized files to their browsers.
        
        
        How to Deploy the Built Code?

        - Upload: Transfer the built files to your web server or hosting platform.
        - Serve: Configure your server or CDN to serve the built files to users.
        
        
        Is npm run build Different Locally and on GitLab CI/CD?

        - Locally: Running npm run build on your local machine creates a build for development or 
                testing purposes. The build process might be configured to include source maps, 
                detailed error messages, and other development features.
        - GitLab CI/CD: In a CI/CD pipeline, npm run build typically creates a production-ready 
                build. This build is optimized for performance and does not include development 
                features. CI/CD pipelines usually run the build command in a clean, isolated 
                environment to ensure consistent results.
        

        Before Webpack
        
        Building Multiple Files Without Webpack
        Before tools like Webpack became popular, developers used a variety of methods to manage and build multiple files:

        Manual Linking:
        Developers manually included multiple <script> and <link> tags in HTML files to load JavaScript and CSS files.
        
        Example:
        
                <script src="file1.js"></script>
                <script src="file2.js"></script>
                <link rel="stylesheet" href="styles1.css">
                <link rel="stylesheet" href="styles2.css">


        Concatenation:

        Tools like Gulp, Grunt, or custom scripts were used to concatenate multiple JavaScript and CSS files into single files.
        
        Example Gulp task for concatenation:
        
                const gulp = require('gulp');
                const concat = require('gulp-concat');

                gulp.task('scripts', function() {
                return gulp.src(['src/file1.js', 'src/file2.js'])
                .pipe(concat('bundle.js'))
                .pipe(gulp.dest('dist/'));
                });

        Minification:

        Tools like UglifyJS for JavaScript and CSSNano for CSS were used to minify and compress files after concatenation.
        
        Example UglifyJS command:

                uglifyjs dist/bundle.js -o dist/bundle.min.js
        
        Manual Build Processes:

        Developers would manually handle tasks like code optimization, versioning, and file management without a unified tool.
        
        
        In summary:

        - Build: The process of converting and optimizing code for production.
        - Build Time: When the code is transformed and prepared for deployment.
        - Development Time: When you write and test code before building.
        - Runtime: When the built code is executed by the browser or server.
        - Deployment: The step where the built code is uploaded to a server or hosting platform for distribution.`