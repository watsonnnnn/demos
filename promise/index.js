function PPromise(fn){
    if(!new.target){
        throw new TypeError('error');
    }
    this.successCallbacks = [];
    this.value = null;
    this.status = 'PENDING';
    var self = this;

    function resolve(v){
        setTimeout(function(){
            self.status = 'FULFILLED';
            self.successCallbacks.forEach(f => {
                v = f(v);
            });
            self.value = v;
        }, 0);
    }

    function then(f){
        this.successCallbacks.push(f);
        return this;
    }

    fn(resolve);
}

window.PPromise = PPromise;

//https://www.cnblogs.com/huansky/p/6064402.html