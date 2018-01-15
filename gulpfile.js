/*global escape */

var gulp = require('gulp');
var concat = require('gulp-concat');

var gmarked = require('gulp-marked');
var marked = require('marked');

var pug = require('pug');

var prism = require('prismjs');


//var fs = require('fs');
//var path = require('path');
//var handlebars = require('handlebars');

//var PAGES_PATH = 'src/pages';
//var TEMPLATES_PATH = 'src/templates';


var codeOptionsDefault = {
    linenum: false,
    renderer: 'code'
};


//---------> Init Otaku
function getCodeOptions(code) {
    'use strict';



    var firstLine = code.slice(0, code.indexOf('\n'));
    var regexpCheck = /^\[.+\]$/g;
    var options;
    var item;

    if (firstLine.match(regexpCheck) !== null) {


        //var item = '';
        var regexpGet = /\[(\w+)=?(\w+)?\]/g;
        options = {};

        while (item = regexpGet.exec(firstLine)) {
            options[item[1]] = item[2] || true;
        }


    }
    return options;
}

/*function readFile(filePath, callback) {
    'use strict';
    const FILE_ENCODE = 'utf8';

    if (callback) {
        return fs.readFile(filePath, FILE_ENCODE, callback);
    } else {
        return fs.readFileSync(filePath, FILE_ENCODE);
    }
}*/

//var templateRenderers = {};

/*function getTemplateRenderer(name) {
    'use strict';
    if (!templateRenderers[name]) {
        var templateContent;
        try {
            templateContent = readFile(path.join(TEMPLATES_PATH, 'renderers', '_' + name + '.hbs'));
            templateRenderers[name] = handlebars.compile(templateContent.toString());
        } catch (error) {
            console.log(error);
            if (!templateRenderers[codeOptionsDefault.renderer]) {
                templateContent = readFile(path.join(TEMPLATES_PATH, 'renderers', '_' + codeOptionsDefault.renderer + '.hbs'));
                templateRenderers[codeOptionsDefault.renderer] = handlebars.compile(templateContent.toString());
            }
            templateRenderers[name] = templateRenderers[codeOptionsDefault.renderer];
        }
    }

    //return templateRenderers[name];
    return name;
}*/

//var markedRenderer = new marked.Renderer();

function templaterenderers(obj) {
    'use strict';

    //console.log(obj);

    var html = pug.renderFile('./app/module.pug', {data: obj});

    console.log(html);

    return html;

}

marked.Renderer.prototype.code = function (code, langData, escaped) {
    'use strict';
    var langArray, lang;

    if (langData) {
        langArray = langData.split(':');
        lang = langArray[0];
    }

    var codeOptions = getCodeOptions(code);

    if (codeOptions) {
        // Remove First Line
        code = code.substr(code.indexOf('\n') + 1);
    }

    codeOptions = Object.assign({}, codeOptionsDefault, codeOptions || {});

    console.log("OPT>>>", codeOptions);

    var codeData = {
        class: null,
        code: null
    };

    if (this.options.highlight) {
        var out = this.options.highlight(code, lang);

        if (out !== null && out !== code) {
            escaped = true;
            code = out;
        }
    }

    codeData.code = (escaped
        ? code
        : escape(code, true));

    if (lang) {
        codeData.class = this.options.langPrefix + escape(lang, true);
    }

    //var template = getTemplateRenderer(codeOptions.renderer);

    //return template(codeData);

    //console.log("Hey--->", codeOptions.renderer);


    return templaterenderers(codeData);
};




gulp.task('hello', function () {
    'use strict';
    console.log('Hello Zell');
});

gulp.task('convert', function () {
    'use strict';
    gulp.src('./app/*.md')
        .pipe(gmarked({
            //renderer: markedRenderer,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            langPrefix: 'language-',
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                var htmlcode;

                if (prism.languages[lang]) {
                    htmlcode = prism.highlight(code, prism.languages[lang]);
                } else {
                    htmlcode = code;
                }

                return htmlcode;
            }
        }))
        .pipe(concat('all.html'))
        .pipe(gulp.dest('./app/'));
});