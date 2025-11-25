let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img = new Image();
let originalPixels = null;


upload.onchange = function (e) {
let file = e.target.files[0];
let reader = new FileReader();
reader.onload = function (event) {
img.onload = function () {
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);
originalPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
img.src = event.target.result;
};
reader.readAsDataURL(file);
};


function applyFilter(type) {
if (!originalPixels) return;
let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
let data = pixels.data;


for (let i = 0; i < data.length; i += 4) {
if (type === 'grayscale') {
let avg = (data[i] + data[i+1] + data[i+2]) / 3;
data[i] = avg;
data[i+1] = avg;
data[i+2] = avg;
}
if (type === 'invert') {
data[i] = 255 - data[i];
data[i+1] = 255 - data[i+1];
data[i+2] = 255 - data[i+2];
}
if (type === 'brightness') {
data[i] += 20;
data[i+1] += 20;
data[i+2] += 20;
}
}


ctx.putImageData(pixels, 0, 0);
}


function resetImage() {
if (originalPixels) {
ctx.putImageData(originalPixels, 0, 0);
}
}
