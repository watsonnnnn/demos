class Clock {
    constructor(ele, use24Hs = false) {
        this.eles = Array.from(ele.querySelectorAll('.column'))
        this.classList = ['visible', 'close', 'far', 'far1', 'morefar']
    }

    start() {
        let self = this
        setInterval(function () {
            let c = self.getClock()
            self.eles.forEach(function (item, index) {
                let n = c[index]
                $(item).css({
                    transform: 'translateY(calc(50vh - 45px - ' + n * 90 + 'px ))'
                })

                let children = Array.from(item.children)
                children.forEach(function(item, index){
                    let cls = self.getClass(n, index)
                    $(item).attr('class', cls)                  
                })
            })
        }, 200)
    }

    getClock() {
        let date = new Date
        return [date.getHours(), date.getMinutes(), date.getSeconds()].reduce(function (acc, cur) {
            return acc + ('0' + cur).slice(-2)
        }, '')
    }

    getClass(cur, idx){
        return this.classList[Math.abs(cur - idx)] || ''
    }
}

new Clock(document.getElementById('container')).start()