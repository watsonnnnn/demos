class Observer{
  constructor(data){
    this.observe(data);
  }

  observe(data){
    if(!data || typeof data != 'object'){
      return;
    }
    Object.keys(data).forEach((key)=>{
      this.defineReactive(data, key, data[key]);
      if(typeof data[key] == 'object'){
        this.observe(data[key]);
      }
    })
  }

  defineReactive(obj, key, value){
    let that = this;
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get(){
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue){
        if(newValue != value){
          that.observe(newValue);
          value = newValue;
          dep.subs.length != 0 && dep.notify();
        }
      }
    })
  }
}