// Relogio Digital:
// Display do Relogio Digital:
function updateClock() {
    const now = new Date();
    document.getElementById('h2-hour-clock').textContent = String(now.getHours()).padStart(2, '0');
    document.getElementById('h2-minute-clock').textContent = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('h2-second-clock').textContent = String(now.getSeconds()).padStart(2, '0');
}

setInterval(updateClock, 1000);
updateClock();

// Cronômetro Digital:
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let lapCount = 1; // Contador de voltas

const playPauseBtn = document.getElementById("play-pause");
const toggleTypeBtn = document.getElementById("toggle-type");
const flagBtn = document.getElementById("flag");
const divLaps = document.getElementById("laps");
const lapsContainer = document.getElementById("laps-time");

function updateStopwatch() {
    stopwatchTime++;
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;

    document.getElementById("h2-hour-stopwatch").textContent = String(hours).padStart(2, '0');
    document.getElementById("h2-minute-stopwatch").textContent = String(minutes).padStart(2, '0');
    document.getElementById("h2-second-stopwatch").textContent = String(seconds).padStart(2, '0');
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        stopwatchInterval = setInterval(updateStopwatch, 1000);
    } else {
        stopwatchRunning = false;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        clearInterval(stopwatchInterval);
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    lapCount = 1;
    document.getElementById("h2-hour-stopwatch").textContent = "00";
    document.getElementById("h2-minute-stopwatch").textContent = "00";
    document.getElementById("h2-second-stopwatch").textContent = "00";
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    lapsContainer.innerHTML = ""; // Limpa as marcações
}

function addLap() {
    if (stopwatchRunning) {
        const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
        const seconds = String(stopwatchTime % 60).padStart(2, '0');

        const lapElement = document.createElement("p");
        lapElement.setAttribute('class', 'textLaps');
        lapElement.textContent = `Volta ${lapCount}: ${hours}:${minutes}:${seconds}`;
        lapsContainer.appendChild(lapElement);
        //divLaps.append(lapsContainer);

        if (lapCount == 1) {
            lapsContainer.style.padding = "20px";
        }

        lapCount++;
    }
}

playPauseBtn.addEventListener("click", startStopwatch);
flagBtn.addEventListener("click", addLap);

// Alterna entre Relogio/Timer:
let toggleType = document.querySelector("#toggle-type");

toggleType.addEventListener('click', () => {
    console.log('Botão "toggle" acionado');

    toggleClockStopwatch();
    resetStopwatch();

});

function toggleClockStopwatch() {
    let sectionClock = document.querySelector("#clock");
    let sectionStopwatch = document.querySelector("#stopwatch");
    let buttonPlay = document.querySelector("#play-pause");
    let buttonFlag = document.querySelector("#flag");

    sectionClock.classList.toggle("hidden");
    sectionStopwatch.classList.toggle("hidden");
    buttonPlay.classList.toggle("hidden");
    buttonFlag.classList.toggle("hidden");

    toggleType.innerHTML = (toggleType.value == "Cronômetro" ? "Relógio" : "Cronômetro");
    toggleType.value = (toggleType.value == "Cronômetro" ? "Relógio" : "Cronômetro");
}
