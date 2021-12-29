var vid = document.createElement("video"); 
vid.setAttribute('id', 'video');
vid.setAttribute('autoplay', 'muted');
document.body.appendChild(vid);
const video = document.getElementById("video")
video.style.display = "none";



const default1 = document.getElementById("default") 
const neutral = document.getElementById("neutral") 
const happy = document.getElementById("happy") 
const sad = document.getElementById("sad") 
const angry = document.getElementById("angry") 
const fearful = document.getElementById("fearful") 
const disgusted = document.getElementById("disgusted") 
const surprised = document.getElementById("surprised") 
const nofaces = document.getElementById("nofaces") 

const face = document.getElementById('face');
var ctx = face.getContext("2d");
const error = document.getElementById('error');
const toggleVideoButton = document.getElementById('toggleVideoButton');
const toggleAudioButton = document.getElementById('toggleAudioButton');



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

let statusIcons = {
  default: default1,
  neutral: neutral,
  happy: happy,
  sad: sad,
  angry: angry,
  fearful: fearful,
  disgusted: disgusted,
  surprised: surprised,
  nofaces: nofaces
}

let img = statusIcons.default
drawImageScaled(img, ctx)

video.addEventListener('play', () => {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    if (detections.length > 0) {
      error.style.display = 'none'
      detections.forEach(element => {
        let status = "";
        let valueStatus = 0.0;
        for (const [key, value] of Object.entries(element.expressions)) {
          if (value > valueStatus) {
            status = key
            valueStatus = value;
          }
        }
        // highest scored expression (status) = display the right Emoji
        let img = statusIcons[status]
        drawImageScaled(img, ctx)
      });
    } else {
      let img = statusIcons.nofaces;
      drawImageScaled(img, ctx)
      error.style.display = 'block';
    }
  }, 100)
})

function toggleVideo() {
  video.style.display = video.style.display === 'none' ? 'block' : 'none';
}

function toggleAudio() {
  video.muted = video.muted === true ? false : true;
  console.log('video muted = ', video.muted)
  // vid.setAttribute('autoplay', 'muted');
  if (video.muted){
    toggleAudioButton.classList.remove("bi-mic");
    toggleAudioButton.classList.add("bi-mic-mute");
  } else {
    toggleAudioButton.classList.remove("bi-mic-mute");
    toggleAudioButton.classList.add("bi-mic");
  }
}

function drawImageScaled(img, ctx) {
  face.width = img.width;
  face.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
}