Vue.config.devtools = true

var bus = new Vue()

Vue.component('date', {
   
  
  
  })

  

Vue.component('emp-item', {
    props: ['emp', 'lines', 'start', 'end'],
    template: `<div class="cv">
                <h6>{{emp.first_name}} {{ lines }}</h6>
                <canvas  v-on:mousedown="mouseDown" v-on:mousemove="mouseMove" v-on:mouseup="mouseUp" :id="'cv' + emp.id" class="canvas"  width="150" height="700"></canvas>
                <canvas  class="back" :id="'back' + emp.id"   width="150" height="700"></canvas>
                </div>`,
    data: function() {
        return {

            rect : {},
            drag : false,
            startTime : 0,
            endTime : 0,
            closeEnough : 10,
            st : 0,
            ic : 0,
            mouseX : 0,
            mouseY : 0,
            dragTL : false,
            dragBL : false,
            dragTR : false,
            dragBR : false,
            timeWorked: 0,
            cv: '',
            ln: 0
            
            

            
        }
    },
    watch: {
        lines: function () {
            this. ln = this.lines;
            this.getVal(this.ln);

            this.draw();
            this.getBack(this.lines);
            this.drawBack();
            this.timeCalc(this.start, this.end, this.ln, this.ic);
        }
    },
    created: function () {


    },
    mounted: function () {
        this.getVal(this.lines);
        this.draw();
        this.getBack(this.lines);
        this.drawBack();
        
        
        


    },                
    methods: {
        timeCalc: function(start, end, lines, inc) {
            console.log("******************************************");
            console.log("Actual Start: " + start);
            var time_start = (start - 100);
            console.log("Start: " + time_start);
            console.log("End: " + (end + 100));
            console.log("Lines: " + lines);
            console.log("Inc: " + inc);
            console.log("Start Y: " + this.rect.startY);
            console.log("End Y: " + (this.rect.startY + this.rect.h));
            console.log("Canvas Height: " + this.canvas.height);
            
            var tot_min = (60 * lines);
            console.log("Total mins: " + tot_min);
            var mins_per_y =  (tot_min / 700);
            console.log("Mins / Y: " + mins_per_y);
            var rec_times_y = (mins_per_y * this.rect.startY);
            console.log("Rect x Y: " + rec_times_y);
            var rty_div_60 = (rec_times_y / 60);
            console.log("RTY/60: " + rty_div_60);
            var rty_trunc = Math.trunc(rty_div_60);
            console.log("TRUNC RTY: " + rty_trunc);
            var rty_trunc_times_hund = (rty_trunc * 100);
            console.log("TRUNC RTY X 100: " + rty_trunc_times_hund);
            var time_start_plus_hund = time_start + rty_trunc_times_hund
            console.log("Time Start + Hund: " + time_start_plus_hund);
            var remain = rty_div_60 - rty_trunc;
            console.log("REMAINDER: " + remain);
            var remain_mins = remain * 60
            console.log("REMAINDER MINS: " + remain_mins);
            var rounded_remain = parseInt(remain_mins.toPrecision(2));
            console.log("Rounded Remainder: " + rounded_remain);
            var num_string = time_start_plus_hund.toString().substr(2,2);
            console.log("SPLIT STRING: " + num_string);
            var string_to_num = parseInt(num_string);
            var mins_add = string_to_num + rounded_remain;
            console.log("Added mins: " + mins_add);
            if (mins_add >= 60) {
                var time_hund_round = Math.round(time_start_plus_hund/100) * 100;
                console.log("TIMES HUND ROUND: " + time_hund_round);
                var div_mins = mins_add / 60;
                console.log("Divided Mins: " + div_mins);
                var div_mins_trunc = Math.trunc(div_mins);
                console.log("TRUNC DIV MINS: " + div_mins_trunc);
                var div_trunc_times_hund = div_mins_trunc * 100;
                var hrs_add_to_tot = div_trunc_times_hund + time_hund_round
                console.log("NEW Hours: " + hrs_add_to_tot);
                var remain_mns = div_mins - div_mins_trunc;
                var mns_to_add = remain_mns * 60;
                var mns_new = hrs_add_to_tot + mns_to_add;
                console.log("New Time: " + mns_new);

            }

            /*var m = ((x / 60) * 100);
            
            var u = (x / 60);
            console.log("U: " + u);
            var r = Math.trunc(u);
            console.log("R: " + r);
            var pres = (u - r);
            console.log("PRES: " + pres);
            var rd = (r * 100);
            console.log("RD: " + rd);
            var p = parseInt(rd.toPrecision(2));
            console.log("P: " + p);
            var hund = pres * 60;
            console.log("HUND: " + hund);
            var ed = (s + p);
            var ed1 = r  * 100;
            time = ed + ed1 + hund;
            

            
            
            
            console.log("Rect Start: " + this.rect.startY);
            console.log("X: " + x);
            //console.log("Calc time: " + x);
            if (x > inc) {
            console.log("Mod: " + (rd.toPrecision(2)));
            console.log("Calc Start Time 1: " + time);
            } else {
            console.log("Calc Start Time: " + time);
            }*/

        },
        getVal: function (x) {
            this.cv = 'cv' + this.emp.id;
            this.canvas = document.getElementById(this.cv);
            this.ctx = this.canvas.getContext('2d');
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.st = this.canvas.height;
            console.log("GET VAL : " + x);
            this.ic = (this.st / x);
            console.log("IC: " + this.ic);
            this.rect = {
                startX: 25,
                startY: 100,
                w: (this.canvas.width - 50),
                h: 300,
            }
        },
        draw: function () {
            for (let  i = 0; i < this.st; i+=this.ic) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(500, i);
                this.ctx.stroke(); }
                this.ctx.fillStyle = "#222222";
                this.ctx.fillRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
                this.drawHandles();
        },
        getBack: function (x) {
            this.back = 'back' + this.emp.id;
            this.canvas1 = document.getElementById(this.back);
            this.ctx1 = this.canvas1.getContext('2d');
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            this.st = this.canvas1.height;
            console.log("GET VAL : " + x);
            this.ic = (this.st / x);
            console.log("IC: " + this.ic);
        },
        

        drawBack: function () {
        var qtr = (this.ic/4);
        console.log("QTR: " + qtr);

            for (let  i = 0; i < this.st; i+= qtr) {
                this.ctx1.beginPath();
                this.ctx1.moveTo(0, i);
                this.ctx1.lineTo(500, i);
                this.ctx1.stroke(); }
                this.ctx1.strokeStyle = "#42f4dc";
                
                
        },
        drawHandles: function () {
            this.drawCircle(this.rect.startX + this.rect.w/2, this.rect.startY, this.closeEnough); //top left corner
            //drawCircle(rect.startX + rect.w, rect.startY, closeEnough);
            //drawCircle(rect.startX + rect.w, rect.startY + rect.h, closeEnough);
            this.drawCircle(this.rect.startX + this.rect.w/2, this.rect.startY + this.rect.h, this.closeEnough);
        },
        drawCircle: function (x, y, radius) {
            this.ctx.fillStyle = "#FF0000";
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
        },
        checkCloseEnough: function (p1, p2) {
            return Math.abs(p1 - p2) < this.closeEnough;
        },
        mouseDown: function (event) {
            
            this.mouseX = event.pageX - this.canvas.offsetLeft;
            this.mouseY = event.pageY - this.canvas.offsetTop;
              // if there isn't a rect yet
            if (this.rect.w === undefined) {
                this.rect.startX = this.mouseY;
                this.rect.startY = this.mouseX;
                this.dragBR = true;
            }
            // if there is, check which corner
            //   (if any) was clicked
            //
            // 4 cases:
            // 1. top left
            //console.log(this.checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2));
            //console.log(this.checkCloseEnough(this.mouseY, this.rect.startY));
            if (this.checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2) && this.checkCloseEnough(this.mouseY, this.rect.startY)) {
                this.dragTL = true;

            }
            // 2. top right
            //else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY)) {
            //    dragTR = true;
            
            //}
            // 3. bottom left
            else if (this.checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2) && this.checkCloseEnough(this.mouseY, this.rect.startY + this.rect.h)) {
                this.dragBR = true;
            
            }
            // 4. bottom right
            //else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY + rect.h)) {
            //    dragBR = true;
            
            //}
            // (5.) none of them
            else {
                // handle not resizing
            }
            
            
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
            
        },
        mouseMove: function (event) {
            this.mouseX = event.pageX - this.canvas.offsetLeft;
            this.mouseY = event.pageY - this.canvas.offsetTop;
            if (this.dragTL) {
                //rect.w += rect.startX - mouseX;
                this.rect.h += this.rect.startY - this.mouseY;
                //rect.startX = mouseX;
                this.rect.startY = this.mouseY;
            } //else if (dragTR) {
                //rect.w = Math.abs(rect.startX - mouseX);
                //rect.h += rect.startY - mouseY;
                //rect.startY = mouseY;
            //} //else if (dragBL) {
                //rect.w += rect.startX - mouseX;
                //rect.h = Math.abs(rect.startY - mouseY);
                //rect.startX = mouseX;
            //} 
            else if (this.dragBR) {
                //rect.w = Math.abs(rect.startX - mouseX);
                this.rect.h = Math.abs(this.rect.startY - this.mouseY);
            }
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
        },
        mouseUp: function () {
            this.dragTL = false;
            this.dragTR = false;
            this.dragBL = false; 
            this.dragBR = false;
            this.timeCalc(this.start, this.end, this.ln, this.ic);
            this.getStartTime(this.rect.startY);
            this.getEndTime(this.rect.startY + this.rect.h);
            this.calcTime(this.startTime, this.endTime);
            console.log("Top " +  this.startTime);
            console.log("Bottom " +  (this.endTime));
        },
        getEndTime: function (time) {
            if (time > 0 && time < this.ic) {
                this.endTime = 0;
                console.log("12AM");
            }
            else if (time >= this.ic && time < (this.ic * 2)) {
                this.endTime = 1;
                console.log('1AM');
            }
            else if (time >= (this.ic * 2) && time < (this.ic * 3)) {
                this.endTime = 2;
                console.log('2AM');
            }
            else if (time >= (this.ic * 3) && time < (this.ic * 4)) {
                this.endTime = 3;
                console.log('3AM');
            }
            else if (time >= (this.ic * 4) && time < (this.ic * 5)) {
                this.endTime = 4;
                console.log('4AM');
            }
            else if (time >= (this.ic * 5) && time < (this.ic * 6)) {
                this.endTime = 5;
                console.log('5AM');
            }
            else if (time >= (this.ic * 6) && time < (this.ic * 7)) {
                this.endTime = 6;
                console.log('6AM');
            }
            else if (time >= (this.ic * 7) && time < (this.ic * 8)) {
                this.endTime = 7;
                console.log('7AM');
            }
            else if (time >= (this.ic * 8) && time < (this.ic * 9)) {
                this.endTime = 8;
                console.log('8AM');
            }
            else if (time >= (this.ic * 9) && time < (this.ic * 10)) {
                this.endTime = 9;
                console.log('9AM');
            }
            else if (time >= (this.ic * 10) && time < (this.ic * 11)) {
                this.endTime = 10;
                console.log('10AM');
            }
            else if (time >= (this.ic * 11) && time < (this.ic * 12)) {
                this.endTime = 11;
                console.log('11AM');
            }
            else if (time >= (this.ic * 12) && time < (this.ic * 13)) {
                this.endTime = 12;
                console.log('12PM');
            }
            else if (time >= (this.ic * 13) && time < (this.ic * 14)) {
                this.endTime = 13;
                console.log('1PM');
            }
            else if (time >= (this.ic * 14) && time < (this.ic * 15)) {
                this.endTime = 14;
                console.log('2PM');
            }
            else if (time >= (this.ic * 15) && time < (this.ic * 16)) {
                this.endTime = 15;
                console.log('3PM');
            }
            else if (time >= (this.ic * 16) && time < (this.ic * 17)) {
                this.endTime = 16;
                console.log('4PM');
            }
            else if (time >= (this.ic * 17) && time < (this.ic * 18)) {
                this.endTime = 17;
                console.log('5PM');
            }
            else if (time >= (this.ic * 18) && time < (this.ic * 19)) {
                this.endTime = 18;
                console.log('6PM');
            }
            else if (time >= (this.ic * 19) && time < (this.ic * 20)) {
                this.endTime = 19;
                console.log('7PM');
            }
            else if (time >= (this.ic * 20) && time < (this.ic * 21)) {
                this.endTime = 20;
                console.log('8PM');
            }
            else if (time >= (this.ic * 21) && time < (this.ic * 22)) {
                this.endTime = 21;
                console.log('9PM');
            }
            else if (time >= (this.ic * 22) && time < (this.ic * 22)) {
                this.endTime = 22;
                console.log('10PM');
            }
            else if (time >= (this.ic * 23) && time < (this.ic * 24)) {
                this.endTime = 23;
                console.log('11PM');
            }
            else if (time >=  (this.ic * 24) && time < (this.ic * 25)) {
                this.endTime = 24;
                console.log('12AM');
            }
            else {
                console.log('Time has Stopped');
            }
        },
        calcTime: function (start, end) {
            this.timeWorked = end - start
            console.log("Time worked: " + this.timeWorked);            
        },
        getStartTime: function (time) {
            if (time > 0 && time < this.ic) {
                this.startTime = 0;
                console.log("12AM");
            }
            else if (time >= this.ic && time < (this.ic * 2)) {
                this.startTime = 1;
                console.log('1AM');
            }
            else if (time >= (this.ic * 2) && time < (this.ic * 3)) {
                this.startTime = 2;
                console.log('2AM');
            }
            else if (time >= (this.ic * 3) && time < (this.ic * 4)) {
                this.startTime = 3;
                console.log('3AM');
            }
            else if (time >= (this.ic * 4) && time < (this.ic * 5)) {
                this.startTime = 4;
                console.log('4AM');
            }
            else if (time >= (this.ic * 5) && time < (this.ic * 6)) {
                this.startTime = 5;
                console.log('5AM');
            }
            else if (time >= (this.ic * 6) && time < (this.ic * 7)) {
                this.startTime = 6;
                console.log('6AM');
            }
            else if (time >= (this.ic * 7) && time < (this.ic * 8)) {
                this.startTime = 7;
                console.log('7AM');
            }
            else if (time >= (this.ic * 8) && time < (this.ic * 9)) {
                this.startTime = 8;
                console.log('8AM');
            }
            else if (time >= (this.ic * 9) && time < (this.ic * 10)) {
                this.startTime = 9;
                console.log('9AM');
            }
            else if (time >= (this.ic * 10) && time < (this.ic * 11)) {
                this.startTime = 10;
                console.log('10AM');
            }
            else if (time >= (this.ic * 11) && time < (this.ic * 12)) {
                this.startTime = 11;
                console.log('11AM');
            }
            else if (time >= (this.ic * 12) && time < (this.ic * 13)) {
                this.startTime = 12;
                console.log('12PM');
            }
            else if (time >= (this.ic * 13) && time < (this.ic * (this.ic * 14))) {
                this.startTime = 13;
                console.log('1PM');
            }
            else if (time >= (this.ic * 14) && time < (this.ic * 15)) {
                this.startTime = 14;
                console.log('2PM');
            }
            else if (time >= (this.ic * 15) && time < (this.ic * 16)) {
                this.startTime = 15;
                console.log('3PM');
            }
            else if (time >= (this.ic * 16) && time < (this.ic * 17)) {
                this.startTime = 16;
                console.log('4PM');
            }
            else if (time >= (this.ic * 17) && time < (this.ic * 18)) {
                this.startTime = 17;
                console.log('5PM');
            }
            else if (time >= (this.ic * 18) && time < (this.ic * 19)) {
                this.startTime = 18;
                console.log('6PM');
            }
            else if (time >= (this.ic * 19) && time < (this.ic * 20)) {
                this.startTime = 19;
                console.log('7PM');
            }
            else if (time >= (this.ic * 20) && time < (this.ic * 21)) {
                this.startTime = 20;
                console.log('8PM');
            }
            else if (time >= (this.ic * 21) && time < (this.ic * 22)) {
                this.startTime = 21;
                console.log('9PM');
            }
            else if (time >= (this.ic * 22) && time < (this.ic * 22)) {
                this.startTime = 22;
                console.log('10PM');
            }
            else if (time >= (this.ic * 23) && time < (this.ic * 24)) {
                this.startTime = 23;
                console.log('11PM');
            }
            else if (time >=  (this.ic * 24) && time < (this.ic * 25)) {
                this.startTime = 24;
                console.log('12AM');
            }
            else {
                console.log('Time has Stopped');
            }
        }



  }
  
  })
  
  var app7 = new Vue({
    el: '#app-7',
    template: `<div class="b">
                    <div>
                        <button class="c" v-on:click="previousDay">&lsaquo;</button>
                        <h1 >{{ this.ss }}</h1>
                        <button class="c" v-on:click="nextDay">&rsaquo;</button>
                    <div>
                    <emp-item
                    v-for="item in empList"
                    v-bind:emp="item"
                    v-bind:key="item.id"
                    v-bind:lines="lines"
                    v-bind:start="start"
                    v-bind:end="end">
                    </emps-item>
                    </div>`,
    data: function() {
    return {
    empList : l,
    today : new Date,
    tomorrow : new Date(),
    ss: '',
    start: 0,
    end: 0,
    st: 0,
    lines: 0,
    day: 0
    }
    },
    methods: {
    nextDay: function () {
    this.tomorrow.setDate(this.today.getDate()+1);
    this.today.setDate(this.tomorrow.getDate());
    this.ss =  this.today.toDateString();
    },
    previousDay: function () {
    this.tomorrow.setDate(this.today.getDate()-1);
    this.today.setDate(this.tomorrow.getDate());
    this.ss =  this.today.toDateString();
    },
    set: function () {
    this.ss = this.today.toDateString();
    },
    getD: function () {
    day = this.today.getDay();
    if (day == 0) {
        this.start = d.sunday_start;
        this.end = d.sunday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 100) / 100;
        return this.lines;
        
    } else if (day == 1) {
        this.start = d.monday_start;
        this.end = d.monday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 100) / 100;
        return this.lines;
        
    } else if (day == 2) {
        this.start = d.tuesday_start;
        this.end = d.tuesday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 100) / 100;
        return this.lines;
        
    } else if (day == 3) {
        this.start = d.wednesday_start;
        this.end = d.wednesday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 100) / 100;
        return this.lines;
        
    } else if (day == 4) {
        this.start = d.thursday_start;
        this.end = d.thursday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 100) / 100;
        return this.lines;
        
    } else if (day == 5) {
        this.start = d.friday_start;
        this.end = d.friday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100;
        return this.lines;
        
    } else if (day == 6) {
        this.start = d.saturday_start;
        this.end = d.saturday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 100) / 100;
        return this.line
    } else {
        return this.lines = 24;
    }
    

    }
    },
    watch: {
    lines: function () {

    },
    ss: function() {

    day = this.today.getDay();
    if (day == 0) {
        this.start = d.sunday_start;
        this.end = d.sunday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100
        console.log("ss " + this.lines);
        return this.lines
        
    } else if (day == 1) {
        this.start = d.monday_start;
        this.end = d.monday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100
        console.log("ss " + this.lines);
        return this.lines
        
    } else if (day == 2) {
        this.start = d.tuesday_start;
        this.end = d.tuesday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100
        console.log("ss " + this.lines);
        return this.lines
        
    } else if (day == 3) {
        this.start = d.wednesday_start;
        this.end = d.wednesday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100
        console.log("ss " + this.lines);
        return this.lines
    } else if (day == 4) {
        this.start = d.thursday_start;
        this.end = d.thursday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100;
        console.log("ss " + this.lines);
        
        
    } else if (day == 5) {
        this.start = d.friday_start;
        this.end = d.friday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100;
        console.log("ss " + this.lines);
        return this.lines;
        
    } else if (day == 6) {
        this.start = d.saturday_start;
        this.end = d.saturday_end;
        this.st = Math.ceil((this.end - this.start) / 100) * 100;
        this.lines = (this.st + 200) / 100;
        console.log("ss " + this.lines);
        return this.lines;
        
    } else {
        return lines = 24;
    }
    }

    },

    computed: {
    set: function () {
    today = new Date()
    this.ss = this.today.toDateString();
    },

    },
    mounted: function () {
    this.getD();
    },
    created: function () {
    this.set();
    }
    })
    
    