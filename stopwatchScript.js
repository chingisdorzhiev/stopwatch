const minutes = document.getElementById("mins");
const seconds = document.getElementById("secs");
const milliseconds = document.getElementById("msecs");
const lapBtn = document.querySelector(".lap-btn");
const rstBtn = document.querySelector(".rst-btn");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const lapContainer = document.querySelector(".laps-container");

let startPoint;
let timeDif;
let intervalId;
let mins = 0;
let secs = 0;
let msecs = 0;
let savedTime = 0;

let lap = 0;
let lapsArr = [];

function clearStopwatch() {
  clearInterval(intervalId);
  intervalId = null;
  savedTime = 0;
  timeDif = 0;
  mins = 0;
  secs = 0;
  msecs = 0;
  lap = 0;
  lapsArr = [];
  lapContainer.innerHTML = "";
}

function showTime() {
  mins = Math.floor((savedTime + timeDif) / 1000 / 60);
  secs = Math.floor(((savedTime + timeDif) / 1000) % 60);
  msecs = Math.floor(((savedTime + timeDif) % 1000) / 10);

  minutes.innerHTML = mins.toLocaleString("en-us", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  seconds.innerText = secs.toLocaleString("en-us", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  milliseconds.innerHTML = msecs.toLocaleString("en-us", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function countTime() {
  timeDif = Date.now() - startPoint;
  showTime();
}

startBtn.onclick = (e) => {
  startPoint = Date.now();
  intervalId = setInterval(countTime);
  startBtn.classList.add("hide");
  stopBtn.classList.remove("hide");
  rstBtn.classList.add("hide");
  lapBtn.classList.remove("hide");
};

stopBtn.onclick = (e) => {
  savedTime += timeDif;
  clearInterval(intervalId);
  intervalId = null;
  lapBtn.classList.add("hide");
  rstBtn.classList.remove("hide");
  stopBtn.classList.add("hide");
  startBtn.classList.remove("hide");
};

lapBtn.onclick = (e) => {
  lap++;
  //   lapContainer.innerHTML += `
  //   <div><span>Lap ${lap}</span><span>${minutes.innerHTML} : ${seconds.innerText} : ${milliseconds.innerHTML}<span/></div>
  //   `;
  let lapElement = document.createElement("div");
  lapElement.innerHTML = `<span>Lap ${lap}</span><span>${minutes.innerHTML} : ${seconds.innerText} : ${milliseconds.innerHTML}<span/>`;
  lapContainer.prepend(lapElement);
  lapsArr.push({
    lap: lap,
    time: [minutes.innerHTML, seconds.innerText, milliseconds.innerHTML],
  });
};

rstBtn.onclick = (e) => {
  clearStopwatch();
  showTime();
};
