class HistoryRoute{
  constructor(){
    this.current = null;
  }
}

class VueRouter{
  constructor(opts){
    this.mode = opts.mode || 'hash';
    this.routes = opts.routes;

    this.routesMap = this.createMap(this.routes);
    this.history = new HistoryRoute();
    this.init();
  }
  createMap(routes){
    return routes.reduce((acc, cur)=>{
      acc[cur.path] = cur.component;
      return acc;
    }, {})
  }
  init(){
    if(this.mode == 'hash'){
      if(!location.hash){
        location.hash = '/';
      }
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1);
      }, false);
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      }, false);
    }else{
      if(!location.pathname){
        location.pathname = '/';
      }
      window.addEventListener('load', () => {
        this.history.current = location.pathname.slice(1);
      }, false);

      window.addEventListener('popstate', () => {
        this.history.current = location.pathname.slice(1);
      }, false);

    }
  }
  go(){

  }
  back(){

  }
  push(){

  }
}

VueRouter.install = function(Vue, opts){
  console.log('---install')
  Vue.mixin({
    beforeCreate() {
      if(this.$options && this.$options.router){
        this._root = this; //当前实例挂载到_root
        this._router = this.$options.router;// router实例挂到_router
        Vue.util.defineReactive(this,'xxx', this._router.history);
      }else{
        // 父-》子-》子子
        this._root = this.$parent._root;
      }

      Object.defineProperty(this, '$router', {
        get(){
          return this._root._router
        }
      })

      Object.defineProperty(this, '$route', {
        get(){
          return {
            current: this._root._router.history.current
          }
        }
      })

    },
  })
  
  Vue.component('router-link', {
    props: {
      to: String
    },
    render(h){
      let mode = this._self._root._router.mode;
      console.log(this.$slots.default[0])
      // return <a href={mode === 'hash'?`#${this.to}`:this.to}>{this.$slots.default}</a>
      return h('a', {attrs: {
        href: mode === 'hash'?`#${this.to}`:this.to,
        target: '_self'
      }},this.$slots.default[0].text)
    }
  })

  Vue.component('router-view', {
    render(h){
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      // return h('a', {}, 'other')
      return h(routeMap[current])
    }
  })
}

// export default VueRouter;