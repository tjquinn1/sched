Vue.config.devtools = true

Vue.component('date', {
    template: `<div class="b">
               <button class="c" v-on:click="previousDay">&lsaquo;</button>
               <h1>{{ this.ss }}</h1>
               <button class="c" v-on:click="nextDay">&rsaquo;</button>
               <h1>{{ this.nd }}</h1>
               </div>`,
    data: function() {
        return {
        today : new Date,
        tomorrow : new Date(),
        nd: pants,
        ss: ''
        }
    },
    methods: {
        nextDay: function () {
            this.tomorrow.setDate(this.today.getDate()+1);
            this.today.setDate(this.tomorrow.getDate());
            this.ss =  this.tomorrow.toDateString();
        },
        previousDay: function () {
            this.tomorrow.setDate(this.today.getDate()-1);
            this.today.setDate(this.tomorrow.getDate());
            this.ss =  this.tomorrow.toDateString();
        },
        set: function () {
            this.ss = this.today.toDateString();
        }
    },

    computed: {
        set: function () {
            today = new Date()
            this.ss = this.today.toDateString();
        }

    },
    mounted: function () {
        this.set();
      }
  
  
  })

Vue.component('todo-item', {
    props: ['todo'],
    template: `<div class="cv">
                <h1>"{{todo.id}}"</h1>
                <canvas :id="'cv' + todo.id" class="canvas"  width="150" height="700"></canvas>
                
                </div>`,
  
  
  })
  
  var app7 = new Vue({
    el: '#app-7',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' },
        { id: 3, text: 'kjhjhhjkkjhhjkhklj'},
        { id: 4, text: 'same'},
        { id: 5, text: 'carol'}
      ]
    }
  })
  
  
  function setGraph(x) {
  cv = x
  var canvas = document.getElementById(`${cv}`),
  ctx = canvas.getContext('2d'),
  rect = {},
  drag = false,
  mouseX,
  mouseY,
  startTime,
  endTime,
  closeEnough = 10,
  st = canvas.height,
  ic = (st / 24),
  dragTL = dragBL = dragTR = dragBR = false;
  
  function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
  
  
  rect = {
      startX: 25,
      startY: 100,
      w: 100,
      h: 200
  }
  }
  
  function getStartTime(time) {
      if (time > 0 && time < ic) {
          startTime = 0;
          console.log("12AM");
      }
      else if (time >= ic && time < (ic * 2)) {
          startTime = 1;
          console.log('1AM');
      }
      else if (time >= (ic * 2) && time < (ic * 3)) {
          startTime = 2;
          console.log('2AM');
      }
      else if (time >= (ic * 3) && time < (ic * 4)) {
          startTime = 3;
          console.log('3AM');
      }
      else if (time >= (ic * 4) && time < (ic * 5)) {
          startTime = 4;
          console.log('4AM');
      }
      else if (time >= (ic * 5) && time < (ic * 6)) {
          startTime = 5;
          console.log('5AM');
      }
      else if (time >= (ic * 6) && time < (ic * 7)) {
          startTime = 6;
          console.log('6AM');
      }
      else if (time >= (ic * 7) && time < (ic * 8)) {
          startTime = 7;
          console.log('7AM');
      }
      else if (time >= (ic * 8) && time < (ic * 9)) {
          startTime = 8;
          console.log('8AM');
      }
      else if (time >= (ic * 9) && time < (ic * 10)) {
          startTime = 9;
          console.log('9AM');
      }
      else if (time >= (ic * 10) && time < (ic * 11)) {
          startTime = 10;
          console.log('10AM');
      }
      else if (time >= (ic * 11) && time < (ic * 12)) {
          startTime = 11;
          console.log('11AM');
      }
      else if (time >= (ic * 12) && time < (ic * 13)) {
          startTime = 12;
          console.log('12PM');
      }
      else if (time >= (ic * 13) && time < (ic * (ic * 14))) {
          startTime = 13;
          console.log('1PM');
      }
      else if (time >= (ic * 14) && time < (ic * 15)) {
          startTime = 14;
          console.log('2PM');
      }
      else if (time >= (ic * 15) && time < (ic * 16)) {
          startTime = 15;
          console.log('3PM');
      }
      else if (time >= (ic * 16) && time < (ic * 17)) {
          startTime = 16;
          console.log('4PM');
      }
      else if (time >= (ic * 17) && time < (ic * 18)) {
          startTime = 17;
          console.log('5PM');
      }
      else if (time >= (ic * 18) && time < (ic * 19)) {
          startTime = 18;
          console.log('6PM');
      }
      else if (time >= (ic * 19) && time < (ic * 20)) {
          startTime = 19;
          console.log('7PM');
      }
      else if (time >= (ic * 20) && time < (ic * 21)) {
          startTime = 20;
          console.log('8PM');
      }
      else if (time >= (ic * 21) && time < (ic * 22)) {
          startTime = 21;
          console.log('9PM');
      }
      else if (time >= (ic * 22) && time < (ic * 22)) {
          startTime = 22;
          console.log('10PM');
      }
      else if (time >= (ic * 23) && time < (ic * 24)) {
          startTime = 23;
          console.log('11PM');
      }
      else if (time >=  (ic * 24) && time < (ic * 25)) {
          startTime = 24;
          console.log('12AM');
      }
      else {
          console.log('Time has Stopped');
      }
  }
  
  function getEndTime(time) {
      if (time > 0 && time < ic) {
          endTime = 0;
          console.log("12AM");
      }
      else if (time >= ic && time < (ic * 2)) {
          endTime = 1;
          console.log('1AM');
      }
      else if (time >= (ic * 2) && time < (ic * 3)) {
          endTime = 2;
          console.log('2AM');
      }
      else if (time >= (ic * 3) && time < (ic * 4)) {
          endTime = 3;
          console.log('3AM');
      }
      else if (time >= (ic * 4) && time < (ic * 5)) {
          endTime = 4;
          console.log('4AM');
      }
      else if (time >= (ic * 5) && time < (ic * 6)) {
          endTime = 5;
          console.log('5AM');
      }
      else if (time >= (ic * 6) && time < (ic * 7)) {
          endTime = 6;
          console.log('6AM');
      }
      else if (time >= (ic * 7) && time < (ic * 8)) {
          endTime = 7;
          console.log('7AM');
      }
      else if (time >= (ic * 8) && time < (ic * 9)) {
          endTime = 8;
          console.log('8AM');
      }
      else if (time >= (ic * 9) && time < (ic * 10)) {
          endTime = 9;
          console.log('9AM');
      }
      else if (time >= (ic * 10) && time < (ic * 11)) {
          endTime = 10;
          console.log('10AM');
      }
      else if (time >= (ic * 11) && time < (ic * 12)) {
          endTime = 11;
          console.log('11AM');
      }
      else if (time >= (ic * 12) && time < (ic * 13)) {
          endTime = 12;
          console.log('12PM');
      }
      else if (time >= (ic * 13) && time < (ic * 14)) {
          endTime = 13;
          console.log('1PM');
      }
      else if (time >= (ic * 14) && time < (ic * 15)) {
          endTime = 14;
          console.log('2PM');
      }
      else if (time >= (ic * 15) && time < (ic * 16)) {
          endTime = 15;
          console.log('3PM');
      }
      else if (time >= (ic * 16) && time < (ic * 17)) {
          endTime = 16;
          console.log('4PM');
      }
      else if (time >= (ic * 17) && time < (ic * 18)) {
          endTime = 17;
          console.log('5PM');
      }
      else if (time >= (ic * 18) && time < (ic * 19)) {
          endTime = 18;
          console.log('6PM');
      }
      else if (time >= (ic * 19) && time < (ic * 20)) {
          endTime = 19;
          console.log('7PM');
      }
      else if (time >= (ic * 20) && time < (ic * 21)) {
          endTime = 20;
          console.log('8PM');
      }
      else if (time >= (ic * 21) && time < (ic * 22)) {
          endTime = 21;
          console.log('9PM');
      }
      else if (time >= (ic * 22) && time < (ic * 22)) {
          endTime = 22;
          console.log('10PM');
      }
      else if (time >= (ic * 23) && time < (ic * 24)) {
          endTime = 23;
          console.log('11PM');
      }
      else if (time >=  (ic * 24) && time < (ic * 25)) {
          endTime = 24;
          console.log('12AM');
      }
      else {
          console.log('Time has Stopped');
      }
  }
  
  function calcTime(start, end) {
      console.log("Time worked: " + (end - start));
  
  }
  
  
  function mouseDown(e) {
  mouseX = e.pageX - this.offsetLeft;
  mouseY = e.pageY - this.offsetTop;
    // if there isn't a rect yet
  if (rect.w === undefined) {
      rect.startX = mouseY;
      rect.startY = mouseX;
      dragBR = true;
  }
  
  // if there is, check which corner
  //   (if any) was clicked
  //
  // 4 cases:
  // 1. top left
  else if (checkCloseEnough(mouseX, rect.startX + rect.w/2) && checkCloseEnough(mouseY, rect.startY)) {
      dragTL = true;
  }
  // 2. top right
  //else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY)) {
  //    dragTR = true;
  
  //}
  // 3. bottom left
  else if (checkCloseEnough(mouseX, rect.startX + rect.w/2) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
      dragBR = true;
  
  }
  // 4. bottom right
  //else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
  //    dragBR = true;
  
  //}
  // (5.) none of them
  else {
      // handle not resizing
  }
  
  
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  
  }
  
  function checkCloseEnough(p1, p2) {
  return Math.abs(p1 - p2) < closeEnough;
  }
  
  function mouseUp() {
  dragTL = dragTR = dragBL = dragBR = false;
  getStartTime(rect.startY);
  getEndTime(rect.startY + rect.h);
  calcTime(startTime, endTime);
  console.log("Top " +  startTime);
  console.log("Bottom " +  (endTime));
  }
  
  function mouseMove(e) {
  mouseX = e.pageX - this.offsetLeft;
  mouseY = e.pageY - this.offsetTop;
  if (dragTL) {
      //rect.w += rect.startX - mouseX;
      rect.h += rect.startY - mouseY;
      //rect.startX = mouseX;
      rect.startY = mouseY;
  } //else if (dragTR) {
      //rect.w = Math.abs(rect.startX - mouseX);
      //rect.h += rect.startY - mouseY;
      //rect.startY = mouseY;
  //} //else if (dragBL) {
      //rect.w += rect.startX - mouseX;
      //rect.h = Math.abs(rect.startY - mouseY);
      //rect.startX = mouseX;
  //} 
  else if (dragBR) {
      //rect.w = Math.abs(rect.startX - mouseX);
      rect.h = Math.abs(rect.startY - mouseY);
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  }
  st = canvas.height;
  ic = (st / 24);
  function draw() {
  for (let  i = 0; i < st; i+=ic) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(500, i);
      ctx.stroke(); }
  ctx.fillStyle = "#222222";
  ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
  drawHandles();
  }
  
  function drawCircle(x, y, radius) {
  ctx.fillStyle = "#FF0000";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  }
  
  function drawHandles() {
  drawCircle(rect.startX + rect.w/2, rect.startY, closeEnough); //top left corner
  //drawCircle(rect.startX + rect.w, rect.startY, closeEnough);
  //drawCircle(rect.startX + rect.w, rect.startY + rect.h, closeEnough);
  drawCircle(rect.startX + rect.w/2, rect.startY + rect.h, closeEnough);
  }
  
  
  
  init();
      
  }
  
  for(i=0; i<8;i++){
    setGraph("cv" + i)
  }