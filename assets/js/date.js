Vue.config.devtools = true



Vue.component('date', {
   
  
  
  })

  

Vue.component('emp-item', {
    props: ['emp', 'lines', 'start', 'end'],
    template: `<div  class="cv">
                <h6>{{emp.user.first_name}} {{ this.timeWorked }}</h6>
                <canvas  v-on:mousedown="mouseDown" v-on:mousemove="mouseMove" v-on:mouseup="mouseUp" v-on:dblclick="dclick" :id="'cv' + emp.emp" class="canvas"  width="150" height="700"></canvas>
                <canvas  class="back" :id="'back' + emp.emp"   width="150" height="700"></canvas>
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
            ln: 0,
            calcStartTime: 0,
            calcEndTime: 0,
            iN: false
            
            
            

            
        }
    },
    watch: {
        lines: function () {
            this. ln = this.lines;
            this.getVal(this.ln);

            this.draw();
            this.getBack(this.lines);
            this.drawBack();
            this.timeStartCalc(this.start, this.end, this.ln, this.ic);
            this.timeEndCalc(this.start, this.end, this.ln, this.ic);
        },
        start: function () {
            this.timeStartCalc(this.start, this.end, this.ln, this.ic);
            this.timeEndCalc(this.start, this.end, this.ln, this.ic);
            this.calcTime(this.calcStartTime, this.calcEndTime);
            
            
        },
    },
    created: function () {

    },
    mounted: function () {
        this. ln = this.lines;
        this.getVal(this.ln);

        this.draw();
        this.getBack(this.lines);
        this.drawBack();
        this.timeStartCalc(this.start, this.end, this.ln, this.ic);
        this.timeEndCalc(this.start, this.end, this.ln, this.ic);
        
        
        
        
        


    },                
    methods: {

        timeStartCalc: function(start, end, lines, inc) {
            var time_start = (start - 100);
            var tot_min = (60 * lines);
            var mins_per_y =  (tot_min / 700);
            var rec_times_y = (mins_per_y * this.rect.startY);
            var rty_div_60 = (rec_times_y / 60);
            var rty_trunc = Math.trunc(rty_div_60);
            var rty_trunc_times_hund = (rty_trunc * 100);
            var time_start_plus_hund = time_start + rty_trunc_times_hund
            
            function getlength(number) {
                var len_time = number.toString().length;
                return len_time
            }
            if ( getlength(time_start_plus_hund) === 3) {
                var num_string = time_start_plus_hund.toString().substr(1,2);
            } else {
                var num_string = time_start_plus_hund.toString().substr(2,2);

            }

            var remain = rty_div_60 - rty_trunc;
            var remain_mins = remain * 60
            var rounded_remain = parseInt(remain_mins.toPrecision(2));
            var string_to_num = parseInt(num_string);
            var mins_add = string_to_num + rounded_remain;
            
            if (mins_add >= 60) {
                var time_hund_round = Math.round(time_start_plus_hund/100) * 100;
                var div_mins = mins_add / 60;
                var div_mins_trunc = Math.trunc(div_mins);
                var div_trunc_times_hund = div_mins_trunc * 100;
                var hrs_add_to_tot = div_trunc_times_hund + time_hund_round
                var remain_mns = div_mins - div_mins_trunc;
                var mns_to_add = remain_mns * 60;
                this.calcStartTime = hrs_add_to_tot + mns_to_add;

            } else {
                this.calcStartTime = rounded_remain+ time_start_plus_hund;
            }

        },
        timeEndCalc: function(start, end, lines, inc) {
            var time_start = (start - 100);
            
            var tot_min = (60 * lines);
            var mins_per_y =  (tot_min / 700);
            var rec_times_y = (mins_per_y * (this.rect.startY + this.rect.h));
            var rty_div_60 = (rec_times_y / 60);
            var rty_trunc = Math.trunc(rty_div_60);
            var rty_trunc_times_hund = (rty_trunc * 100);
            var time_start_plus_hund = time_start + rty_trunc_times_hund
            
            function getlength(number) {
                var len_time = number.toString().length;
                return len_time
            }
            if ( getlength(time_start_plus_hund) === 3) {
                var num_string = time_start_plus_hund.toString().substr(1,2);
            } else {
                var num_string = time_start_plus_hund.toString().substr(2,2);

            }

            var remain = rty_div_60 - rty_trunc;
            var remain_mins = remain * 60
            var rounded_remain = parseInt(remain_mins.toPrecision(2));
            
            var string_to_num = parseInt(num_string);
            var mins_add = string_to_num + rounded_remain;
            
            if (mins_add >= 60) {
                var time_hund_round = Math.round(time_start_plus_hund/100) * 100;
                var div_mins = mins_add / 60;
                var div_mins_trunc = Math.trunc(div_mins);
                var div_trunc_times_hund = div_mins_trunc * 100;
                var hrs_add_to_tot = div_trunc_times_hund + time_hund_round
                var remain_mns = div_mins - div_mins_trunc;
                var mns_to_add = remain_mns * 60;
                this.calcEndTime = hrs_add_to_tot + mns_to_add;

            } else {
                this.calcEndTime = rounded_remain+ time_start_plus_hund;
            }

        },
        calcTime: function (start, end) {
            if (isNaN(end) ) {
                this.timeWorked = 0;
            } else {
                var start_string = start.toString();
                if (start_string.length === 3) {
                    var split_start_hours_string = start.toString().slice(0,1);
                    var split_start_mins_string = start.toString().slice(1,3);
                } else {
                    var split_start_hours_string = start.toString().slice(0,2);
                    var split_start_mins_string = start.toString().slice(2,4);
                }
                // Start hours
                var split_start_hours_number = parseInt(split_start_hours_string);
                // Start Minutes 
                var split_start_mins_number = parseInt(split_start_mins_string);
                var end_string = end.toString();
                if (end_string.length === 3) {
                    var split_end_hours_string = end.toString().slice(0,1);
                    var split_end_mins_string = end.toString().slice(1,3);
                } else {
                    var split_end_hours_string = end.toString().slice(0,2);
                    var split_end_mins_string = end.toString().slice(2,4);
                }
                // End hours
                
                var split_end_hours_number = parseInt(split_end_hours_string);
                //End Minutes
                var split_end_mins_number = parseInt(split_end_mins_string);
                
                
                if (split_end_mins_number < split_start_mins_number) {
                    split_end_mins_number = 60 + split_end_mins_number;
                    split_end_hours_number = split_end_hours_number - 1;
                }
                var hour_diff = split_end_hours_number - split_start_hours_number;
                var mins_diff = split_end_mins_number - split_start_mins_number;
                if ( mins_diff < 10) {
                    var mins_diff_string = mins_diff.toString();
                    var add_zero = "0" + mins_diff_string;
                    var time_string = hour_diff.toString() + add_zero;
                    this.timeWorked = parseInt(time_string);

                } else {
                var time_string = hour_diff.toString() + mins_diff.toString();
                this.timeWorked = parseInt(time_string);
                }
            }
                     
        },
        getVal: function (x) {
            this.cv = 'cv' + this.emp.emp;
            this.canvas = document.getElementById(this.cv);
            this.ctx = this.canvas.getContext('2d');
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.st = this.canvas.height;
            this.ic = (this.st / x);
            
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
            this.back = 'back' + this.emp.emp;
            this.canvas1 = document.getElementById(this.back);
            this.ctx1 = this.canvas1.getContext('2d');
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            this.st = this.canvas1.height;
            this.ic = (this.st / x);
        },
        

        drawBack: function () {
            var qtr = (this.ic/4);

            for (let  i = 0; i < this.st; i+= qtr) {
                this.ctx1.beginPath();
                this.ctx1.moveTo(0, i);
                this.ctx1.lineTo(500, i);
                this.ctx1.stroke(); 
                this.ctx1.strokeStyle = "#42f4dc";
                
            }
        },
        drawHandles: function () {
            this.drawCircle(this.rect.startX + this.rect.w/2, this.rect.startY, this.closeEnough); 
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
            if (this.checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2) && this.checkCloseEnough(this.mouseY, this.rect.startY)) {
                this.dragTL = true;

            }
            // 3. bottom left
            else if (this.checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2) && this.checkCloseEnough(this.mouseY, this.rect.startY + this.rect.h)) {
                this.dragBR = true;
            
            }
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
            }
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
            this.timeStartCalc(this.start, this.end, this.ln, this.ic);
            this.timeEndCalc(this.start, this.end, this.ln, this.ic);

            this.calcTime(this.calcStartTime, this.calcEndTime);
        },

        dclick: function () {
            this.rect = {
                startX: 25,
                startY: 100,
                w: (this.canvas.width - 50),
                h: 300,
            }
            
            
            this.timeStartCalc(this.start, this.end, this.ln, this.ic);
            this.timeEndCalc(this.start, this.end, this.ln, this.ic);
            this.calcTime(this.calcStartTime, this.calcEndTime);

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
                        v-for="item in employ"
                        v-bind:emp="item"
                        v-bind:key="item.id"
                        v-bind:lines="lines"
                        v-bind:start="start"
                        v-bind:end="end">
                    </emps-item>
                    </div>`,
    data: function() {
        return {
            today : new Date,
            tomorrow : new Date(),
            ss: '',
            start: 0,
            end: 0,
            st: 0,
            lines: 0,
            day: 0,
            employ: [],
            loc: []
        }
    },
    beforeCreate: function () {
        axios.get('/locations/')
        .then(response => {
            this.loc = response.data;
            console.log(this.loc[0].thursday_start);
        });
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
                this.start = this.loc[0].sunday_start;
                this.end = this.loc[0].sunday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 100) / 100;
                return this.lines;
                
            } else if (day == 1) {
                this.start = this.loc[0].monday_start;
                this.end = this.loc[0].monday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 100) / 100;
                return this.lines;
                
            } else if (day == 2) {
                this.start = this.loc[0].tuesday_start;
                this.end = this.loc[0].tuesday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 100) / 100;
                return this.lines;
                
            } else if (day == 3) {
                this.start = this.loc[0].wednesday_start;
                this.end = this.loc[0].wednesday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 100) / 100;
                return this.lines;
                
            } else if (day == 4) {
                this.start = this.loc[0].thursday_start;
                this.end = this.loc[0].thursday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 100) / 100;
                return this.lines;
                
            } else if (day == 5) {
                this.start = this.loc[0].friday_start;
                this.end = this.loc[0].friday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100;
                return this.lines;
                
            } else if (day == 6) {
                this.start = this.loc[0].saturday_start;
                this.end = this.loc[0].saturday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 100) / 100;
                return this.line
            } else {
                return this.lines = 24;
            }
            

            }
        
    },
    watch: {
    loc: function () {
        this.getD();
        this.set();
    },
    ss: function() {
            day = this.today.getDay();
            if (day == 0) {
                this.start = this.loc[0].sunday_start;
                this.end = this.loc[0].sunday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100
                return this.lines
                
            } else if (day == 1) {
                this.start = this.loc[0].monday_start;
                this.end = this.loc[0].monday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100
                return this.lines
                
            } else if (day == 2) {
                this.start = this.loc[0].tuesday_start;
                this.end = this.loc[0].tuesday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100
                return this.lines
                
            } else if (day == 3) {
                this.start = this.loc[0].wednesday_start;
                this.end = this.loc[0].wednesday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100
                return this.lines
            } else if (day == 4) {
                this.start = this.loc[0].thursday_start;
                this.end = this.loc[0].thursday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100;
                
                
            } else if (day == 5) {
                this.start = this.loc[0].friday_start;
                this.end = this.loc[0].friday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100;
                return this.lines;
                
            } else if (day == 6) {
                this.start = this.loc[0].saturday_start;
                this.end = this.loc[0].saturday_end;
                this.st = Math.ceil((this.end - this.start) / 100) * 100;
                this.lines = (this.st + 200) / 100;
                return this.lines;
                
            } else {
                return lines = 24;
            }
        }

    },
    

    computed: {
        set: function () {
        today = new Date();
        this.ss = this.today.toDateString();
    },

    },
    mounted: function () {
        
        axios.get('/employees/')
        .then(response => {
            this.employ = response.data;
        });
        if (this.loc[0]) {
        
            this.getD();
        }
    },
    created: function () {
        if(this.loc[0])  {
            this.set();
            }
        }    
})
    
    