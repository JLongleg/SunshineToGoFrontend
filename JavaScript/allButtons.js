// Einmal umprogrammiert nach der Schule
// const allButtons.js

const buttonOptions = document.getElementById("startOptions");
const fensterWindowOp = document.getElementById("fensterWindowOptionen");
const buttonCloseOptions = document.getElementById("closeOptionsButton");

// Optionen Button Click Event

buttonOptions.addEventListener("click", () => {
    fensterWindowOp.showModal();
});

// Schließen Button Click Event
buttonCloseOptions.addEventListener("click", () => {
    fensterWindowOp.close();
});
