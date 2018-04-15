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
            self.status = 'FULLFILLED';
            self.successCallbacks.forEach(f => {
                v = f(v);
                // self.successCallbacks.shift();
            });
            self.value = v;
        }, 0);
    }

    this.then = function(fullFunc){
        if(this.status == 'PENDING'){
            this.successCallbacks.push(fullFunc);
        }else if(this.status == 'FULLFILLED'){
            fullFunc(this.value);
        }
        return this;
    }

    fn(resolve);
}

window.PPromise = PPromise;

//https://www.cnblogs.com/huansky/p/6064402.html