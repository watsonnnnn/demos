class Watcher{ // 给需要变化的那个元素增加一个观察者 用新的值和老的值比对 如果变化 就调用更新方法
  constructor(vm, expr, cb){
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.value = this.get(); // 获取老的值
  }

  getVal(vm, expr) {
    return expr.split('.').reduce((acc, cur, index, arr) => {
      return acc[cur]
    }, vm.$data)
  }

  get(){
    Dep.target = this;
    const v = this.getVal(this.vm, this.expr);
    Dep.target = null;
    return v;
  }

  update(){
    let newValue = this.getVal(this.vm, this.expr);
    let oldValue = this.value;
    if(newValue != oldValue){
      this.cb(newValue);
    }
  }
}