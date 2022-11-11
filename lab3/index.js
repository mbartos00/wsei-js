const playBtn = document.querySelector('.play');
const keyBtn = document.querySelectorAll('.key');
const recordDot = document.querySelector('.record-dot');
const checkboxes = document.querySelectorAll('.channel');

let channelOneArray = [];
let channelTwoArray = [];
let channelThreeArray = [];
let channelFourArray = [];

let timingArr = [];
let isPlaying = false;
let isRecording = false;

const play = (e) => {
  const errorContainer = document.querySelector('.error');
  const keyCode = e.keyCode;
  playSound(keyCode);
  let checked = [...checkboxes].filter((item) => item.checked);

  if (keyCode === 84 && isRecording === false) {
    if (checked.length === 0) {
      errorContainer.textContent = 'Choose channel';
      return;
    }
    initializeRecord();
    errorContainer.textContent = 'Record started';
  } else if (keyCode === 84 && isRecording === true) {
    stopRecording();

    errorContainer.textContent = 'Record stopped';
  } else if (keyCode !== 84 && isRecording === true) {
    if (checked.length === 0) return;
    startRecording(keyCode);
  } else if (keyCode === 85 && isRecording === false) {
    errorContainer.textContent = 'Playing';
    playRecords();
  }
};

const playSound = (keyCode) => {
  const keyElement = document.querySelector(`div[data-key="${keyCode}"]`);
  const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!keyElement) return;
  if (!audioElement) return;
  audioElement.currentTime = 0;
  audioElement.play();
};

const clearArray = (arr) => {
  arr.splice(0, arr.length);
};

const initializeRecord = () => {
  checkboxes.forEach(() => {
    isRecording = true;
    timingArr.splice(0, timingArr.length);

    if (checkboxes[0].checked) {
      clearArray(channelOneArray);
    } else if (checkboxes[1].checked) {
      clearArray(channelTwoArray);
    } else if (checkboxes[2].checked) {
      clearArray(channelThreeArray);
    } else if (checkboxes[3].checked) {
      clearArray(channelFourArray);
    }
  });
};
const startRecording = (keycode) => {
  checkboxes.forEach(() => {
    if (checkboxes[0].checked) {
      channelOneArray.push(keycode);
    } else if (checkboxes[1].checked) {
      channelTwoArray.push(keycode);
    } else if (checkboxes[2].checked) {
      channelThreeArray.push(keycode);
    } else if (checkboxes[3].checked) {
      channelFourArray.push(keycode);
    }
  });
  timingArr.push(Date.now());
};
const stopRecording = () => {
  isRecording = false;
};

const playRecords = () => {
  if (isPlaying === false) {
    let timingDiff = [];
    isPlaying = true;
    timingArr.forEach((time) => timingDiff.push(time - (timingArr[0] - 1)));
    isPlaying = false;
    checkboxes.forEach((item, index) => {
      setTimeout(() => {
        if (checkboxes[0].checked) {
          for (let i = 0; i < channelOneArray.length; i++) {
            playSound(channelOneArray[i]);
          }
        } else if (checkboxes[1].checked) {
          for (let i = 0; i < channelTwoArray.length; i++) {
            playSound(channelTwoArray[i]);
          }
        } else if (checkboxes[2].checked) {
          for (let i = 0; i < channelThreeArray.length; i++) {
            playSound(channelThreeArray[i]);
          }
        } else if (checkboxes[3].checked) {
          for (let i = 0; i < channelFourArray.length; i++) {
            playSound(channelFourArray[i]);
          }
        }
      }, timingDiff[index]);
    });
  }
};

window.addEventListener('keydown', play);
