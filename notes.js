// function drawImageScaled(img, ctx) {
//   var canvas = ctx.canvas ;
//   var hRatio = canvas.width  / img.width    ;
//   var vRatio =  canvas.height / img.height  ;
//   var ratio  = Math.min ( hRatio, vRatio );
//   var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
//   var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
//   ctx.imageSmoothingEnabled = false;
//   ctx.clearRect(0,0,canvas.width, canvas.height);
//   ctx.imageSmoothingEnabled = false;
//   ctx.drawImage(img, 0,0, img.width, img.height,centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
// }

function drawImageScaled(img, ctx) {
	// Make sure the canvas accommodates your monitor density!
  // face.width = img.width * window.devicePixelRatio;
  // face.height = img.height * window.devicePixelRatio;
  // face.style.width = `${img.width}px`;
  // face.style.height = `${img.height}px`;
  // let ctx2 = face.getContext('2d', {antialias: false});
  // ctx2.mozImageSmoothingEnabled = false;
  // ctx2.webkitImageSmoothingEnabled = false;
  // ctx2.msImageSmoothingEnabled = false;
  // ctx2.imageSmoothingEnabled = false;
  // ctx2.drawImage(
  // 	img, 0, 0, 
  //   img.width * window.devicePixelRatio, 
  //   img.height * window.devicePixelRatio
  // );
  face.width = img.width;
  face.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);