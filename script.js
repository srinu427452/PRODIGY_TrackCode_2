let stopwatch;
let laps = [];
let isRunning = false;

function startStopwatch() {
    if (!isRunning) {
        stopwatch = setInterval(updateDisplay, 1000);
        isRunning = true;
        document.getElementById('startBtn').disabled = true;
    }
}

function pauseStopwatch() {
    clearInterval(stopwatch);
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
}

function resetStopwatch() {
    clearInterval(stopwatch);
    isRunning = false;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startBtn').disabled = false;
    laps = [];
    updateLapTimes();
}

function recordLapTime() {
    if (isRunning) {
        laps.push(document.getElementById('display').textContent);
        updateLapTimes();
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    let currentTime = display.textContent.split(':').map(Number);
    currentTime[2]++;
    if (currentTime[2] === 60) {
        currentTime[2] = 0;
        currentTime[1]++;
        if (currentTime[1] === 60) {
            currentTime[1] = 0;
            currentTime[0]++;
            if (currentTime[0] === 24) {
                currentTime[0] = 0;
            }
        }
    }
    display.textContent = currentTime.map(num => num.toString().padStart(2, '0')).join(':');
}

function updateLapTimes() {
    const lapTimesList = document.getElementById('lapTimes');
    lapTimesList.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapTimesList.appendChild(lapItem);
    });
}
