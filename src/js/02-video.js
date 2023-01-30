import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_KEY = 'videoplayer-current-time';

setVideoTime();

const setTime = throttle(function (iframe) {
  localStorage.setItem(VIDEO_KEY, `${iframe.seconds}`);
}, 1000);

player.on('timeupdate', setTime);

function setVideoTime() {
  const savedData = localStorage.getItem(VIDEO_KEY);
  if (savedData) {
    player.setCurrentTime(localStorage.getItem(VIDEO_KEY));
  }
}
