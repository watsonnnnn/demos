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
        let self = this;
        return new PPromise(function(resolve){
            function handle(v){
                v = fullFunc(v);
                if(typeof v == 'object'){
                    v.then(function(v1){
                        resolve(v1);
                    });
                }else{
                    resolve(v);
                }
            }
            if(self.status == 'PENDING'){
                self.successCallbacks.push(handle);
            }else if(self.status == 'FULLFILLED'){
                fullFunc(self.value);
            }
        })
    }

    fn(resolve);
}

window.PPromise = PPromise;

//https://www.cnblogs.com/huansky/p/6064402.html