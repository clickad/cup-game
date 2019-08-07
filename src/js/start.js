import Result from './result.js';

export default class Start extends Result {

    cupOne_pos; 
    cupTwo_pos; 
    cupHeight;
    cupWidth;
    cupOne; 
    cupTwo;
    count = 0;
  
    constructor(){
      super();
    }
  
    randCup() {
      this.cupTwo = this.cups[Math.floor((Math.random()*3))];
      if(this.cupOne === this.cupTwo){
        this.randCup();
      } else{
        this.cupOne_pos = $(this.cupOne).offset();
        this.cupTwo_pos = $(this.cupTwo).offset();
  
        this.animateCups(this.cupOne, 1, this.cupOne_pos, this.cupTwo_pos);
        this.animateCups(this.cupTwo, 2, this.cupOne_pos, this.cupTwo_pos);
      }
    }
  
    animateCups(cup, num, pos_1, pos_2){
      $(cup).addClass('shadow');
      this.cupHeight = $(cup).height();
      this.cupWidth = $(cup).width();
      let range_1 = num == 1 ? '-=80px' : '+=80px' ;
      let range_2 = num == 1 ? '+=80px' : '-=80px' ;
      let left = num == 1 ? '+=' +(pos_2.left - pos_1.left)+'px' : '+=' +(pos_1.left - pos_2.left)+'px';
      $(cup).animate({
        left: left,
        width: this.cupWidth*1.2,
        height: this.cupHeight*1.2,
        top: range_1
      },this.level[0], 'linear', ()=>{
        $(cup).animate({
          width: this.cupWidth,
          height: this.cupHeight,
          top: range_2
        },this.level[0], 'linear', ()=>{
          $(cup).removeClass('shadow');  
        });  
      });
    }
  
    switchCup() {
      this.cupOne = this.cups[Math.floor((Math.random()*3))];
      this.randCup();
    }
  
    startGame() {
      var startGame = setInterval(()=> {
        this.count ++;
        if(this.count === this.level[2]){
          clearInterval(startGame);
          this.count = 1;
          this.$cup.on('click', (event)=>this.checkResult(event));
          this.$level.on('change', (event)=>this.onLevelChange(event));
          this.$start.on('click', (event, level)=>this.start(level));
        }
        this.switchCup(); 
      },this.level[1]);
    }
  
    start(level=null) {
      this.currentLevel = level == null ? parseInt($(".level").val()) : level;
      this.$start.prop('disabled', true);
      this.$level.prop('disabled', true);
      this.$result.css('visibility','hidden');
      this.$cup.removeAttr("style");
      this.levelChange(this.currentLevel);
      this.addBean();
      this.showBean();
      this.$cup.off('click');
      this.$level.off('change');
      this.$start.off('click');
      setTimeout(()=> {
        this.startGame();
      },3000);
    }
  }