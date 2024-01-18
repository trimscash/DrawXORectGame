let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
export let drawed = false;
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#000";


let flag = 0;
canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    let [x, y] = getMousePosInCanvasFromMouseEvent(e);
    ctx.beginPath();
    ctx.moveTo(x, y)

    flag = 1;
    drawed = true;
});
canvas.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (flag) {
        let [x, y] = getMousePosInCanvasFromMouseEvent(e);
        ctx.lineTo(x, y);
        ctx.stroke();

        // drawDot(x, y)
        drawed = true;
    }
});
canvas.addEventListener("mouseup", () => {
    ctx.closePath();
    flag = 0;
    drawed = true;
});

canvas.addEventListener("mouseleave", () => {
    ctx.closePath();
    flag = 0;
});



canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let [x, y] = getMousePosInCanvasFromTouchEvent(e);
    ctx.beginPath();
    ctx.moveTo(x, y)
    flag = 1;
    drawed = true;
});
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (flag) {
        let [x, y] = getMousePosInCanvasFromTouchEvent(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    drawed = true;
});
canvas.addEventListener("touchend", () => {
    flag = 0;
    drawed = true;
});


function getMousePosInCanvasFromTouchEvent(e) {
    var clientRect = canvas.getBoundingClientRect();
    var positionX = clientRect.left + window.screenX;
    var positionY = clientRect.top + window.screenY;

    var touches = e.changedTouches;
    let x = (touches[0].pageX - positionX) * canvas.width / canvas.clientHeight;
    let y = (touches[0].pageY - positionY) * canvas.height / canvas.clientHeight;
    // let x = e.offsetX * canvas.width / canvas.clientWidth;
    // let y = e.offsetY * canvas.height / canvas.clientHeight;

    // console.log(x);
    // console.log(y);

    return [x, y]
}
function getMousePosInCanvasFromMouseEvent(e) {
    let x = e.offsetX * canvas.width / canvas.clientWidth;
    let y = e.offsetY * canvas.height / canvas.clientHeight;
    return [x, y]
}


function drawDot(x, y) {
    const RAD = 10
    ctx.beginPath();
    ctx.arc(x, y, RAD, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

export function cleanCanvas() {
    drawed = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}