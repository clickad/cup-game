export default class Main{

    beginCup;
    currentLevel = 1;
    level = [200,500,10];
    cups = ['.first-cup','.second-cup','.third-cup'];
  
    constructor(){
      this.$window = $(window);
      this.$level = $('.level');
      this.$level.prop('selectedIndex',0);
      this.$start = $('.start');
      this.$cup = $('.cup');
      this.$result = $('.result');
      this.$correct = $('.correct');
      this.$finish = $('.finish');
      this.$wrong = $('.wrong');
    }
  
    levelChange(lev) {
      switch(lev){
        case  1:
          this.level = [180,480,10];
          break;
        case  2:
          this.level = [170,440,12];
          break;
        case  3:
          this.level = [140,380,14];
          break;
        case  4:
          this.level = [110,320,16];
          break;
        case  5:
          this.level = [80,260,18];
          break;
        default:
          this.level = [200,500,10];
      }
    }
  
    onLevelChange(event) {
      this.currentLevel = parseInt($(event.target).val());
      this.levelChange(this.currentLevel);
    }
  
    addBean() {
      this.beginCup = this.cups[Math.floor((Math.random()*3))];
      $('.bean').remove();
      $(this.beginCup).append(`<span class = "bean"><img src = "img/smile.png" alt = "smile"></span>`);
    }
  
    showBean() {
      $('.bean').animate({opacity:0.5},1000,()=>{
        $('.bean').animate({opacity:0},1000);
      });
    }
  
    reload() {
      location.reload();
      location = location;
    }
  }