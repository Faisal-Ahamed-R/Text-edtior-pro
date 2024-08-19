const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let color = '#000';
let size = 5;
let tool = 'pencil';
let shapes = [];
let undoStack = [];
let redoStack = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStack = [];
}

function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
}

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('undo').addEventListener('click', () => {
    if (undoStack.length > 0) {
        redoStack.push(undoStack.pop());
        const lastState = undoStack[undoStack.length - 1];
        if (lastState) {
            ctx.putImageData(lastState, 0, 0);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});

document.getElementById('redo').addEventListener('click', () => {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push(nextState);
        ctx.putImageData(nextState, 0, 0);
    }
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
});

document.getElementById('sizePicker').addEventListener('input', (e) => {
    size = e.target.value;
});

document.getElementById('eraser').addEventListener('click', () => {
    tool = 'eraser';
    color = '#FFF';
});

document.getElementById('pencil').addEventListener('click', () => {
    tool = 'pencil';
    color = '#000';
});

document.getElementById('fullscreen').addEventListener('click', () => {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    }
});

document.getElementById('saveAsImage').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
});

document.getElementById('imageUpload').addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
