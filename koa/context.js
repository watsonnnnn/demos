let ctx = {};

function defineGetter(property, key){
    ctx.__defineGetter__(key, function(){
        return this[property][key]
    })
}

defineGetter('request', 'url');

module.exports = ctx;