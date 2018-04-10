;(function (){
    let root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global);
    
    class EventEmitter{

        constructor(){
            this._events = new Map;
        }

        static isValidListener(listener){
            let t = typeof listener;
            if(t === 'function'){
                return true;
            }else if(t === 'object'){
                return EventEmitter.isValidListener(listener.listener)
            }else{
                return false;
            }
        }

        on(e, listener){
            if(!e || !listener) return;
            if(!EventEmitter.isValidListener(listener)){
                throw new TypeError('listener should be typeof function');
            }

            let es = this._events;

            if(es.has(e)){
                es.set(e, [...es.get(e), typeof listener === 'function'?{listener, once: false}: listener])
            }else{
                es.set(e, [typeof listener === 'function'?{listener, once: false}: listener])
            }

            return this;

        }

        once(e, listener){
            this.on(e, {listener, once: true});
        }

        emit(...args){
            let listeners = this._events.get(args[0]) || [];
            listeners.forEach((element) => {
                element.listener.apply(this, args.slice(1));
                if(element.once){
                    this.off(args[0], element.listener)
                }
            });
        }

        offAll(e){
            this._events.has(e) && this._events.delete(e);
        }

        off(e, listener){
            if(!e || !listener) return;
            
            let listeners = this._events.get(e);

            listeners.forEach((ele,i, arr) => {
                if(ele.listener === listener) arr.splice(i,1);
            })

            return this;

        }

    }

    EventEmitter.version = '1.0.0';

    root.EventEmitter = EventEmitter;

}())