(function(){
  var app = {
    init: function(){
      this.cupOne_pos; 
      this.cupTwo_pos; 
      this.cupOne; 
      this.cupTwo; 
      this.beginCu; 
      this.status; 
      this.cupHeight;
      this.cupWidth;
      this.count = 0;
      this.cups = ['.first-cup','.second-cup','.third-cup'];
      this.currentLevel = 1;
      this.level = [200,500,10];

      this.$window =  $(window);
      this.$window.on('resize', this.reload);
      this.$level = $('.level');
      this.$level.prop('selectedIndex',0);

      this.$level.on('change', this.onLevelChange.bind(this));
      this.$start = $('.start');
      this.$start.on('click', this.start.bind(this));
      this.$cup = $('.cup');
      this.$cup.on('click',this.checkResult.bind(this));
      
      this.$result = $('.result');
      this.$correct = $('.correct');
      this.$finish = $('.finish');
      this.$wrong = $('.wrong');
    },
    levelChange:  function (lev){
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
    },
    onLevelChange: function(event){
      this.currentLevel = parseInt($(event.target).val());
      this.levelChange(this.currentLevel);
    },
    addBean:  function (){
      this.beginCup = this.cups[Math.floor((Math.random()*3))];
      $('.bean').remove();
      $(this.beginCup).append('<span class = "bean"><img src = "img/smile.png" alt = "smile"></span>');
    },
    showBean: function (){
      $('.bean').animate({opacity:0.5},1000,function(){
        $('.bean').animate({opacity:0},1000);
      });
    },
    randCup: function (){
      var self = this;
      this.cupTwo = this.cups[Math.floor((Math.random()*3))];
      if(this.cupOne === this.cupTwo){
        this.randCup();
      } else{
        this.cupOne_pos = $(this.cupOne).offset();
        this.cupTwo_pos = $(this.cupTwo).offset();
        $(this.cupOne).addClass('shadow');
        $(this.cupTwo).addClass('shadow');
        this.cupHeight = $(this.cupOne).height();
        this.cupWidth = $(this.cupOne).width();

        $(this.cupOne).animate({
          left: '+=' +(this.cupTwo_pos.left - this.cupOne_pos.left)+'px',
          width: this.cupWidth*1.2,
          height: this.cupHeight*1.2,
          top: '-=80px'
        },this.level[0], 'linear', function(){
          $(this).animate({
            width: self.cupWidth,
            height: self.cupHeight,
            top: '+=80px'
          },self.level[0], 'linear', function(){
            $(self.cupOne).removeClass('shadow');  
          });  
        });
        $(this.cupTwo).animate({
          left: '+=' +(this.cupOne_pos.left - this.cupTwo_pos.left)+'px',
          width: this.cupWidth*1.2,
          height: this.cupHeight*1.2,
          top: '+=80px'
        },this.level[0], 'linear', function(){
          $(this).animate({
            width: self.cupWidth,
            height: self.cupHeight,
            top: '-=80px'
          },self.level[0], 'linear', function(){
            $(self.cupTwo).removeClass('shadow');  
          });
        }); 
      }
    },
    switchCup: function (){
      this.cupOne = this.cups[Math.floor((Math.random()*3))];
      this.randCup();
    },
    startGame: function (){
      var self = this;
      var startGame = setInterval(function(){
        self.count ++;
        if(self.count === self.level[2]){
          clearInterval(startGame);
          self.status = 1;
          self.count = 1;
        }
        self.switchCup(); 
      },this.level[1]); //interval speed
    },
    start: function(){
      var self = this;
      this.$start.prop('disabled', true);
      this.$level.prop('disabled', true);
      this.$result.css('visibility','hidden');
      this.$cup.removeAttr("style");
      this.status = 0;
      this.levelChange(this.currentLevel);
      this.addBean();
      this.showBean();
      setTimeout(function(){
        self.startGame();
      },3000);
    },
    checkResult: function(event){
      var self = this;
      this.showBean();
      if(this.status === 1){
        if ($(event.target).find('.bean').length > 0 || 
            $(event.target)[0] === $('.bean img')[0] || 
            $(event.target).next()[0] === $('.bean')[0]){  
          this.status = 0;
          if(this.currentLevel < 5){ 
            this.$result.css('visibility','visible');
            this.$result.empty().append('<span class = "result-text correct">Well done! Next level...</span>');
            this.currentLevel++;
            this.$level.val(this.currentLevel);
            setTimeout(function(){
              self.$start.trigger('click');
            },3000);
          } else {
            this.$result.empty().append('<span class = "result-text finish">Congratulations!</span>');
            this.$start.prop('disabled', false);
            this.currentLevel = 1;
            this.$level.val(this.currentLevel);
          }
        } else{
          this.$result.css('visibility','visible');
          this.$result.empty().append('<span class = "result-text wrong">Game over!</span>'); 
          this.status = 0;
          this.$start.prop('disabled', false);
          this.currentLevel = 1;
          this.$level.val(this.currentLevel);
        }
      }
      this.$start.prop('disabled', false);
      this.$level.prop('disabled', false);
    },
    reload: function(){
      location.reload();
      location = location;
    }
  }
  $(window).on('load', function(){
    app.init();
  })
})();