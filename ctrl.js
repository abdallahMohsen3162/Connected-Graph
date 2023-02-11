class MOUSE {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

}


let ctx = document.querySelector("canvas");
let c = ctx.getContext("2d");

ctx.width = innerWidth
ctx.height = innerHeight


let h = ctx.height,
    w = ctx.width;

let MAX_OBJECTS = 1e8 + 5;

let m = new MOUSE();

class sqr {
    constructor(x, y, w, h, dx = 0, dy = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "green"
            //
        this.dx = dx;
        this.dy = dy;
    }
    drow() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }


    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.w >= w || this.x <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.h >= h || this.y <= 0) {
            this.dy = -this.dy;
        }
        this.drow();

    }
}

class Edge {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
    drow() {
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();
    }
}


class Circle {
    constructor(x, y, radius, dx, dy, color = "black") {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    drow() {
        c.beginPath();
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.lineWidth = 1;
        c.fill()
        c.stroke();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius >= w || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= h || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.drow();
    }
}

let arr = [];
let lines = [];



function animation() {
    c.clearRect(0, 0, w, h);
    for (let i = 0; i < lines.length; i++) {
        lines[i].drow();
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i].update();
    }
    lines = [];
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr.length; ++j) {
            if (i == j) continue;
            let x1 = arr[i].x;
            let y1 = arr[i].y;
            let x2 = arr[j].x;
            let y2 = arr[j].y;
            lines.push(new Edge(x1, y1, x2, y2));
        }
    }
    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);



document.addEventListener("click", (event) => {
    let dx = (Math.random() * 10) - 5;
    let dy = (Math.random() * 15) - 5;


    arr.push(new Circle(event.x, event.y, 10, dx, dy));

});
/*
document.addEventListener('keypress', (event) => {
    if (event.ctrlKey) {
        console.log("sdas")
    }
    console.log(event.code)
});
*/


/*
if (event.ctrlKey) {
  alert("The CTRL key was pressed!");
} else {
  alert("The CTRL key was NOT pressed!");
}...

*/