require.config({
    paths: {
        'jquery': 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery',
        'jdd': 'j2',
        'j1.j1': 'j1'
    },
    shim: {
        'j1.j1':{
            exports: 'j2j1',
            init: function(){
                return {
                    j2j1: j2j1,
                    j2j2: j2j2
                }
            }
        }
    }
})
// console.log(document.currentScript)

require(['jdd', 'j1.j1'], function () {
    console.log(arguments) //arguments[1],arguments[2], arguments[3]('body')
  });