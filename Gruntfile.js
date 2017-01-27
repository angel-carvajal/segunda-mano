module.exports = function(grunt) {
	// Task configuration.
	grunt.initConfig({
		babel: {
			options: {
				sourceMap: true,
				presets: ['babel-preset-es2015']
			},
			dist: {
				files: {
					'src/server.js': 'scripts/devServer.js'
				}
			}
		},
		browserify: {
			vendor: {
				src: [],
				dest: 'src/vendor.js',
				options: {
					alias: { //doing this way is missing the module.exports = library
						jquery: './bower_components/jquery/dist/jquery.js',
						velocity: './bower_components/velocity/velocity.js',
						momentLocales: './bower_components/moment/min/moment-with-locales.js',
						angular: './bower_components/angular/angular.js',
						lumx: './bower_components/lumx/dist/lumx.js'
					}
				}
			},
			client: {
				src: ['app/**/*.js'],
				dest: 'src/app.js',
				options: {
					transform: [
						['babelify', {presets: ['es2015']}]
					],
					external: ['jquery', 'velocity', 'momentLocales', 'angular', 'lumx']
				}
			}
		},
		concat: {
			'src/main.js': ['src/vendor.js', 'src/app.js']
		},
		express: {
			dev: {
				options: {
					script: 'src/server.js'
				}
			}
		},
		jshint: {
			all: {
				src: [],
				options: {
					bitwise: true,
					curly: true,
					eqeqeq: true,
					esversion: 6,
					undef: true,
					unused: true,
					varstmt: true,
					node: true,
					latedef: true,
					globals: {
						jQuery: true,
						angular: true,
						module: true
					},
					reporter: require('jshint-stylish')
				}
			}
		},
		jscs: {
			src: ['Gruntfile.js', 'app/**/*.js'],
			options: {
				config: true,
				validateIndentation: '\t',
				validateParameterSeparator: ', ',
				validateQuoteMarks: {mark: '\'', escape: true, ignoreJSX: true},
				requireCurlyBraces: true,
				requireArrowFunctions: true,
				requireAnonymousFunctions: false,
				requireCamelCaseOrUpperCaseIdentifiers: {strict: false},
				requireBlocksOnNewline: true,
				requireEarlyReturn: true,
				requireKeywordsOnNewLine: ['else', 'let', 'const', 'catch', 'if', 'do', 'for', 'while'],
				requireOperatorBeforeLineBreak: true,
				requireParenthesesAroundArrowParam: true,
				requireSpaceAfterKeywords: ['do', 'for', 'if', 'else', 'switch', 'case', 'try', 'catch', 'void', 'while', 'with', 'return', 'typeof'],
				requireSpaceAfterComma: true,
				requireSpaceAfterBinaryOperators: true,
				requireSemicolons: true,
				requireSpaceBeforeObjectValues: true,
				requireSpaceBeforeBinaryOperators: true,
				requireSpaceBeforeBlockStatements: 1,
				requireSpaceBetweenArguments: true,
				requireSpacesInForStatement: true,
				requireSpacesInConditionalExpression: true,
				requireSpaceBeforeDestructuredValues: true,
				requireSpacesInFunctionDeclaration: {beforeOpeningCurlyBrace: true},
				requireYodaConditions: true,
				disallowMultiLineTernary: true,
				disallowNamedUnassignedFunctions: true,
				disallowNewlineBeforeBlockStatements: true,
				disallowQuotedKeysInObjects: true,
				disallowSpaceBeforePostfixUnaryOperators: true,
				disallowSpacesInCallExpression: true,
				disallowSpacesInsideParentheses: true,
				disallowSpacesInsideBrackets: true,
				disallowSpacesInsideObjectBrackets: true,
				disallowTrailingComma: true,
				disallowSpacesInAnonymousFunctionExpression: {beforeOpeningRoundBrace: true},
				reporter: require('jscs-stylish').path,
				force: true
			}
		},
		watch: {
			all: {
				files: [
					'Gruntfile.js', 
					'app/**/*.js',
					'scripts/**/*.js'
				],
				tasks: ['jscs', 'jshint', 'browserify:client', 'express:dev'],
				options: {
					nospawn: true
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.event.on('watch', (action, filepath) => {
		grunt.config(['jshint', 'all', 'src'], [filepath]);
		grunt.config(['jscs', 'src'], [filepath]);
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'jscs', 'browserify:client', 'babel', 'express:dev', 'watch']);
	grunt.registerTask('server', ['jshint', 'jscs', 'browserify:client', 'babel', 'express:dev', 'watch']);
	//grunt.registerTask('vendor', ['browserify:vendor']); Duo an error on grunt-browserfy I'm not able to properly compile all dependencies.
	//Bug already reported https://github.com/jmreidy/grunt-browserify/issues/390
};