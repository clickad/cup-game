import _ from 'lodash';
import Main from './js/main.js';
import Start from './js/start.js';

$(window).on("load", ()=>{

  let main = new Main();
  let start = new Start();
  
  main.$window.on('resize', ()=>main.reload());
  main.$level.on('change', (event)=>main.onLevelChange(event));
  main.$start.on('click', (event, level)=>start.start(level));
})