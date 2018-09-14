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
        this.observe(data[key]); // 深度递归劫持
      }
    })
  }

  defineReactive(obj, key, value){
    let that = this;
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get(){
        return value;
      },
      set(newValue){
        if(newValue != value){
          that.observe(newValue);
          value = newValue;
        }
      }
    })
  }
}