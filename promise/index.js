function PPromise(fn){
    this.successCallbacks = [];
    this.value = null;
    this.status = 'PENDING';
    var self = this;

    function resolve(v){
        setTimeout(function(){
            self.status = 'FULFILLED';
            self.successCallbacks.forEach(f => {
                self.value = f(v);
            });
        }, 0);
    }

    function then(f){
        this.successCallbacks.push(f);
        return this;
    }

    fn(resolve);
}

//https://www.cnblogs.com/huansky/p/6064402.html