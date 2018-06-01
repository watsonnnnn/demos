;(function(win){

    function isArray(p){
        return Object.prototype.toString.call(p).slice(8, -1) === 'Array'
    }

    appendScript('MAIN', document.currentScript.getAttribute('data-main'));


    var moduleCache = {};
    
    var require = function (deps, callback) {

        if(!isArray(deps)) throw new TypeError('must be typeof array');

        var moduleName = document.currentScript && document.currentScript.id || 'MAIN';

        var loadCount = 0;

        if(deps.length){
            for(var i=0; i< deps.length; i++){
                loadCount ++;
    
                var params = [];
    
                (function(i){
    
                    loadModule(deps[i], function(param){
                        params[i] = param;
                        loadCount -- ;
    
                        if(!loadCount){
                            saveModule(moduleName, params, callback);
                        }
    
                    });
    
                })(i)
            }
        }else{
            saveModule(moduleName, null, callback);
        }

    }

    function getJsUrl(moduleName){
        if(/\w+\.js$/.test(moduleName)) throw new Error('url must be string , not with suffix');
        return moduleName + '.js';
    }

    function saveModule(moduleName, params, callback){
        var mod = moduleCache[moduleName];

        if(mod) {
            mod.loadStatus = 'loaded';
            mod.value = callback?callback(params):null 
            var f;
            while(f = mod.onload.shift()){
                f(mod.value);
            }
        }
        else callback(params);
    }

    function loadModule(moduleName, cb){

        var url = getJsUrl(moduleName);

        var mod = moduleCache[moduleName];

        if(mod){
            if(mod.loadStatus === 'loading'){
                mod.onload.push(cb);
            }else{
                // setTimeout(cb.bind(null, mod.value), 0);
            }

        }else{

            moduleCache[moduleName] = {
                loadStatus: 'loading',
                moduleName: moduleName,
                onload: [cb],
                value: null
            };

            appendScript(moduleName, url);

        }
    }

    function appendScript(moduleName, src){
        var script = document.createElement('script');
        script.id = moduleName;
        script.src = src;
        script.async = true;
        script.type = 'text/javascript';
        script.charset = 'utf-8';

        var ls = document.getElementsByTagName('script')[0];
        
        if(ls) ls.parentNode.appendChild(script, ls);
    }




    win.require = win.define = require;

}(window))