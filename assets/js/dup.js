setGraph: function () {
    console.log(this.cv);
    this.getEndTime();
    this.getStartTime();
    this.calcTime();
    this.mouseDown();
    this.checkCloseEnough();
    this.mouseUp();
    this.mouseMove();
    this.draw();
    this.drawCircle();
    this.drawHandles();
    this.init();
},
init: function () {
    this.canvas.addEventListener('mousedown', this.mouseDown, false);
    this.canvas.addEventListener('mouseup', this.mouseUp, false);
    this.canvas.addEventListener('mousemove', this.mouseMove, false);
    
    
    rect = {
        startX: 100,
        startY: 200,
        w: 300,
        h: 200
    }
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
    timeWorked = end - start
    console.log("Time worked: " + this.timeWorked);            
},
mouseDown: function (event) {
    
    this.mouseX = event.pageX - this.offsetLeft;
    this.mouseY = event.pageY - this.offsetTop;
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
    else if (checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2) && checkCloseEnough(this.mouseY, this.rect.startY)) {
        this.dragTL = true;
    }
    // 2. top right
    //else if (checkCloseEnough(mouseX, rect.startX + rect.w) && checkCloseEnough(mouseY, rect.startY)) {
    //    dragTR = true;
    
    //}
    // 3. bottom left
    else if (checkCloseEnough(this.mouseX, this.rect.startX + this.rect.w/2) && checkCloseEnough(this.mouseY, this.rect.startY + this.rect.h)) {
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
checkCloseEnough: function (p1, p2) {
    return Math.abs(p1 - p2) < this.closeEnough;
},
mouseUp: function () {
    this.dragTL = false;
    this.dragTR = false;
    this.dragBL = false; 
    this.dragBR = false;
    this.getStartTime(this.rect.startY);
    this.getEndTime(this.rect.startY + this.rect.h);
    this.calcTime(this.startTime, this.endTime);
    console.log("Top " +  this.startTime);
    console.log("Bottom " +  (this.endTime));
},
mouseMove: function () {
    this.mouseX = this.pageX - this.offsetLeft;
    this.mouseY = this.pageY - this.offsetTop;
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

