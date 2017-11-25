$(document).ready(function(){

  // On window resize cancel the game and refresh page 
  $(window).on('resize', function(){
    location.reload();
    location = location;
  })

  var cupOne_pos, cupTwo_pos, cupOne, cupTwo, beginCup, status, cupHeight, cupWidth;
  var count = 0;
  var cups = ['.first-cup','.second-cup','.third-cup'];
  var level = [200,500,10];
  $('.level').prop('selectedIndex',0);

 $('.level').on('change', function(){
   switch($(this).val()){
    case  "1":
     level = [180,480,10];
    break;
    case  "2":
     level = [170,440,12];
    break;
    case  "3":
     level = [140,380,14];
    break;
    case  "4":
     level = [110,320,16];
    break;
    case  "5":
     level = [80,260,18];
    break;
    default:
     level = [200,500,10];
  }
 })
  // Add smiley in one random choosen cup
  function addSmiley(){
    beginCup = cups[Math.floor((Math.random()*3))];
    $('.bean').remove();
    $(beginCup).append('<span class = "bean"><img src = "img/smile.png" alt = "smile"></span>');
  }
  
  //Show smiley in which cup is it
  function showSmiley(){
     $('.bean').animate({opacity:0.5},1000,
    function(){
      $('.bean').animate({opacity:0},1000);
    });
  }
  
  //Switch cups function
  function switchCup(){
    cupOne = cups[Math.floor((Math.random()*3))];
    
    function randCup(){
      cupTwo = cups[Math.floor((Math.random()*3))];
      
      if(cupOne === cupTwo){
        randCup();
      } else{
        cupOne_pos = $(cupOne).offset();
        cupTwo_pos = $(cupTwo).offset();
        $(cupOne).addClass('shadow');
        $(cupTwo).addClass('shadow');
        cupHeight = $(cupOne).height();
        cupWidth = $(cupOne).width();

        $(cupOne).animate({
          left: '+=' +(cupTwo_pos.left-cupOne_pos.left)+'px',
          width: cupWidth*1.2,
          height: cupHeight*1.2,
          top: '-=80px'
        },level[0], 'linear', 
        function(){
          $(this).animate({
            width: cupWidth,
            height: cupHeight,
            top: '+=80px'
          },level[0], 'linear',
          function(){
            $(cupOne).removeClass('shadow');  
          });  
        });
        $(cupTwo).animate({
          left: '+=' +(cupOne_pos.left-cupTwo_pos.left)+'px',
          width: cupWidth*1.2,
          height: cupHeight*1.2,
          top: '+=80px'
        },level[0],  'linear',
        function(){
          $(this).animate({
            width: cupWidth,
            height: cupHeight,
            top: '-=80px'
          },level[0],  'linear',
          function(){
            $(cupTwo).removeClass('shadow');  
          });
        }); 
      }
    }
    randCup();
  }
  // setInterval on switch cups
  function startGame(){
     var startGame = setInterval(function(){
      count ++;
      if(count === level[2]){
        clearInterval(startGame);
        status = 1;
        count = 1;
      }
      switchCup(); 
    },level[1]) //interval speed
  }
  // On click start the game
  $('.start').on('click', function(){
    $(this).prop('disabled', true);
    $('.level').prop('disabled', true);
    $('.result').css("visibility","hidden");
    $('.cup').removeAttr("style");
    status = 0;
    addSmiley();
    showSmiley()
    setTimeout(function(){
      startGame();
    },3000)
  });

  $('.cup').on('click',function(){
       showSmiley();
    if(status === 1){
      if ($(this).find('.bean').length > 0){  
        $('.correct').css("visibility","visible");
        status = 0;
      } else{
        $('.wrong').css("visibility","visible");
        status = 0;
      }
      $('.start').prop('disabled', false);
      $('.level').prop('disabled', false);
    }
  });

})
