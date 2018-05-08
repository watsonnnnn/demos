require.config({
    paths: {
        'jquery': 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery',
        'jss': 'js/j2',
        'j1j1': 'js/j1'
    },
    shim: {
        'j1j1':{
            exports: 'j2j1'
        }
    }
})
console.log(document.currentScript)

require(['j1j1', 'js/j2.js', 'jss', 'jquery'], function () {
    console.log(j2j1, arguments[1],arguments[2], arguments[3]('body'))
  });