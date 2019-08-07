import Main from './main.js';

export default class Result extends Main{

    constructor(){
      super();
    }
  
    checkResult(event) {
      this.showBean();
      if ($(event.target).find('.bean').length > 0 || 
          $(event.target)[0] === $('.bean img')[0] || 
          $(event.target).next()[0] === $('.bean')[0]){  
        this.status = 0;
        if(this.currentLevel < 5){ 
          this.showMessage("correct", "Well done! Next level...", this.currentLevel ,true);
          setTimeout(()=>{
            this.$start.trigger('click', [this.currentLevel]);
          },3000);
        } else {
          this.showMessage("finish", "Congratulations!", this.currentLevel, true);
        }
      } else{
        this.showMessage("wrong", "Game over!", this.currentLevel, false);
      }
      this.$start.prop('disabled', false);
      this.$level.prop('disabled', false);
    }
  
    showMessage(cls, text, level, result) {
      this.$result.css('visibility','visible');
      if(result){
        if(level < 5){
          this.currentLevel++;
        } else {
          this.currentLevel = 1;
          this.$start.prop('disabled', false);
        }
      } else {
        this.currentLevel = 1;
        this.$start.prop('disabled', false);
      }
      this.$level.val(this.currentLevel);
      this.$result.empty().append(`<span class = "result-text ${cls}">${text}</span>`);
    }
  }