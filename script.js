// const video = document.getElementById('video')
var vid = document.createElement("video"); 
vid.setAttribute('id', 'video');
vid.setAttribute('autoplay', 'muted');
document.body.appendChild(vid);
const video = document.getElementById("video")
video.style.display = "none";

const face = document.getElementById('face');
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
  default: '😎',
  neutral: '🙂',
  happy: '😀',
  sad: '😥',
  angry: '😠',
  fearful: '😨',
  disgusted: '🤢',
  surprised: '😳',
  nofaces: '😕'
}

video.addEventListener('play', () => {
  face.innerHTML = statusIcons.default
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
        face.innerHTML = statusIcons[status]
      });
    } else {
      face.innerHTML = statusIcons.nofaces;
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