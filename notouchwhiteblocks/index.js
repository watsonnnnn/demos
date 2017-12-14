class Index{
    constructor(eleId){
        this.ele = $('#'+eleId)
        this.score = 0
        this.speed = 3
        this.colors = ['red','green','blue','yellow']
        this.timer = null
        this.ismoving = false
    }
    start(){
        let self = this
        $('#header').on('click', function(){
            $('#header').css('display','none')
            console.log('start...')

            self.createRow()

            self.bindEvent()

            self.timer = setInterval(function(){
                self.move()
                if(parseInt(self.ele.css('top'), 10) >=0 ){
                    self.createRow()
                    self.ele.css('top', '-150px')
                }

                if(self.ele.children().length == 6){
                    let last = $(self.ele.children()[5])
                    for(let i = 0, lcs = last.children(); i<4 ; i++){
                        if($(lcs[i]).attr('class') == 'i'){
                            clearInterval(self.timer)
                            self.ismoving = false
                            alert('game over,score is' + self.score)
                            return false;
                        }
                    }
                    last.remove()
                }

            }, 20)

        })
    }
    createRow(){
        let oDiv = $('<div></div>'),
            randomIndex = Math.floor(Math.random()*4)
        oDiv.attr('class', 'row')
        for(let i = 0 ; i < 4 ; i++){
            let rDiv = $('<div></div>')
            oDiv.append(rDiv)
        }
        $(oDiv.children()[randomIndex]).css('background-color',this.colors[randomIndex]).attr('class', 'i')
        if(this.ele.children().length == 0){
            this.ele.append(oDiv)
        }else{
            oDiv.insertBefore($(this.ele.children()[0]))
        }
    }
    move(){
        this.ismoving = true
        this.ele.css('top', parseInt(this.ele.css('top'), 10) + this.speed)
    }
    bindEvent(){
        let self = this
        this.ele.on('click', function(e){
            if(self.ismoving){
                if($(e.target).attr('class') == 'i'){
                    self.score += 1
                    $(e.target).css('background-color', '#ccc')
                    $(e.target).removeClass()
    
                    self.score %10 == 0 && (self.speed += 2)
                }
            }
        })
    }
}

new Index('main').start()
