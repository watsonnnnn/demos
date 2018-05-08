console.log('js1');
var  j2j1 = {};      // 很重要，和shim中exports值必须一致
j2j1.add = function(num1, num2) {
    return num1 + num2;
};
j2j1.max = function() {
    return Math.max.apply(Math, [].slice.call(arguments));
}