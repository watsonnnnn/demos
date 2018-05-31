### requirejs

依赖前置

主入口使用 script上添加 data-main 代表主入口文件。同时添加该属性后，代表默认配置了baseUrl是该文件的__dirname__。

require(deps, cb){} // deps是依赖的文件，回调会在所有文件加载完成后执行。

https://www.cnblogs.com/yexiaochai/p/3961291.html