var pp;
function PPromise(fn){
    if(!new.target){
        throw new TypeError('error');
    }
    this.successCallbacks = [];
    this.value = null;
    this.status = 'PENDING';
    var self = this;

    function resolve(v){

        if(typeof v == 'object'){
            v.then(y=>{
                resolve(y)
            })
        }else{
            setTimeout(function(){
                self.status = 'FULLFILLED';
                self.value = v;
                self.successCallbacks.forEach(f => {
                    f.apply(self);
                    // self.successCallbacks.shift();
                });
            }, 0);
        }

    }

    this.then = function(fullFunc){

        pp = new PPromise(function(resolve){

            function handle(){
                let v = fullFunc(self.value);
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
        return pp;
    }

    fn(resolve);
}

window.PPromise = PPromise;

//https://www.cnblogs.com/huansky/p/6064402.html