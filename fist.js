var fis = module.exports = require('fis');

fis.cli.name = "fist";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.config.merge({
    roadmap : {
        path : [
            {
                //一级同名组件，可以引用短路径，比如sea-modules/jquery/juqery.js
                //直接引用为var $ = require('jquery');
                reg : /^\/sea-modules\/([^\/]+)\/\1\.(js|coffee|less|css)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //less和css文件会做csssprite处理
                useSprite : true,
                //id为文件夹名
                id : '$1',
                release: '/static/$&'
            },
            {
                //sea-modules目录下的其他文件
                reg : /^\/sea-modules\/(.*)\.(js|coffee|less|css)$/i,
                //是组件化的，会被jswrapper包装
                isMod : true,
                //less和css文件会做csssprite处理
                useSprite : true,
                //id是去掉sea-modules和.js后缀中间的部分
                id : '$1',
                release: '/static/$&'
            },
            {
                //.mixin.less后缀的文件
                reg : /\.mixin\.less$/,
                //仅当做函数调用，不发布
                release : false
            },
            {
                //配置文件不发布
                reg : 'fis-conf.js',
                release : false
            },
            {
                //sea配置文件
                reg : 'sea-config.js',
                release : '/static/js/$&'
            },
            {
                //其他js、css、coffee、less文件
                reg : /\.(js|coffee|css|less)$/,
                //less和css文件会做csssprite处理
                useSprite : true,
                //不要放到js资源表里
                useMap : false
            },
            {
                //html文件
                reg : /^\/templates\/(.*)\.(html)$/i,
                release : '/thinkphp.project/$1.html'
            },
            {
                //readme文件，不要发布
                reg : /\/readme\.md$/i,
                release : false
            },
            {
                //map.json没什么用，就不要发布了
                reg : 'map.json',
                release : false
            }
        ],
        ext : {
            //less输出为css文件
            less : 'css',
            //coffee输出为js文件
            coffee : 'js'
        }
    },
    modules : {//fis插件配置
        parser : {
            //.coffee后缀的文件使用fis-parser-coffee-script插件编译
            coffee : 'coffee-script',
            //.less后缀的文件使用fis-parser-less插件编译
            less : 'less'
        },
        lint : {
            js : 'jshint'
        },
        postpackager : 'seajs'
    },
    settings : {
        parser : {
            'coffee-script' : {
                //不用coffee-script包装作用域
                bare : true
            }
        },
        lint : {
            jshint : {
                //排除对lib和jquery、backbone、underscore的检查
                ignored : [ 'lib/**', /jquery|backbone|underscore/i ],
                //使用中文报错
                i18n : 'zh-CN'
            }
        },
        postprocessor : {
            jswrapper : {
                //用fis的js包装器，更方便书写
                type : 'amd'
            }
        },
        optimizer : {
            'uglify-js' : {
                mangle : {
                    //不要压缩require关键字，否则seajs会识别不了require
                    except : [ 'require' ]
                }
            }
        }
    }
});
