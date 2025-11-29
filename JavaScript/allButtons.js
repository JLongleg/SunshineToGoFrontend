// Einmal umprogrammiert nach der Schule (check)
// Hier sind alle Buttons hinterlegt und was sie machen, wenn man sie Klickt
// const allButtons.js
// funktion JS = ID

const buttonStartGame = document.getElementById("startGameButton");
const buttonStartBestenliste = document.getElementById("buttonBestenliste");
const buttonClickOptions = document.getElementById("startOnClickOptions");
const fensterWindowOp = document.getElementById("openWindowOptionsButton");
const buttonCloseOptionsWindow = document.getElementById("closeWindowOptionsButton");
const buttonCloseGame = document.getElementById("endGameButton");
const buttonMenuAnzeigen = document.getElementById("buttonMenuZeigen"); 

//--------------------------------------------------------------

//funktionen für die Buttons die gedrückt wurden
// Optionensfenster wird angezeigt
buttonClickOptions.addEventListener("click", () => {
    fensterWindowOp.showModal();
});

// Optionsfenster wird geschlossen
buttonCloseOptionsWindow.addEventListener("click", () => {
    fensterWindowOp.close();
});

// Anwendung beenden
buttonCloseGame.addEventListener("click", () => {
    window.close();
})

// div, also Bereich "Bestenliste wird angezeigt"

buttonStartBestenliste.addEventListener("click", () => {
    zeigBestenliste()
})

buttonMenuAnzeigen.addEventListener("click", () => {
    zeigMenu()
})

//--------------------------------------------------------------

// Alle Seiten die verschwinden oder auftauchen.

function zeigBestenliste() {
    document.getElementById("menuBereichHTML").style.display = "none";
    document.getElementById("bestenListeBereichHTML").style.display = "block";
}

function zeigMenu() {
    document.getElementById("menuBereichHTML").style.display = "block";
    document.getElementById("bestenListeBereichHTML").style.display = "none";
}