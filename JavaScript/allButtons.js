// Js definierte Buttons für alle Menubereiche
// funktion JS(Verschwinden/Auftauchen) <= AddEvent(klicken) <= ID (Button)
// Definierte Buttons:

const buttonStartGame = document.getElementById("startGameButton");
const buttonStartBestenliste = document.getElementById("buttonBestenliste");
const buttonClickOptions = document.getElementById("startOnClickOptions");
const buttonCloseGame = document.getElementById("endGameButton");
const buttonOpenFortschritt = document.getElementById("fortschrittButton");
const buttonClickMitwirkende = document.getElementById("btnMitwirkende");

// Div-Bereiche für die Sichtbarkeit bestimmen:

const menuS = document.getElementById("menuBereichHTML");
const fortschrittS = document.getElementById("fortschrittBereichHTML");
const bestenlisteS = document.getElementById("bestenListeBereichHTML");
const gameplayS = document.getElementById("gameplayBereichHTML");
const mitwirkendeS = document.getElementById("mitwirkendeBereichHTML");

// Button für das Optionsfenster 
const fensterWindowOp = document.getElementById("openWindowOptionID");
const buttonCloseOptionsWindow = document.getElementById("closeWindowOptionsButton");

// Ein Button für alle Bereiche, der nur einmal erstellt werden muss. [x]
// Nimm aktuelle Seite und lass sie verschwinden.
// benötigt eine Klasse, weil es häufiger verwendet wurde. [X]

const alleMenuButtonsGoBack = document.querySelectorAll(".zumMenuButton");

function funcZumMenu() {

    if (menuS) menuS.style.display = "block";
    if (fortschrittS) fortschrittS.style.display = "none";
    if (bestenlisteS) bestenlisteS.style.display = "none";
    if (gameplayS) gameplayS.style.display = "none";
    if (mitwirkendeS) mitwirkendeS.style.display = "none";

    if (menuS) menuS.style.display = "block";
}

alleMenuButtonsGoBack.forEach(einzelnerButton => {
    einzelnerButton.addEventListener("click", funcZumMenu);
});

//--------------------- Spezial-Funktionen------------------------------------

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

//------------------addEventListener für die Buttons--------------------------

// Bereich "Bestenliste wird angezeigt"
buttonStartBestenliste.addEventListener("click", () => {
    zeigBestenliste()
})

// Zeig Fortschritt, wenn man den Knopf gedrückt hat.
buttonOpenFortschritt.addEventListener("click", () => {
    zeigFortschritt()
})

buttonClickMitwirkende.addEventListener("click", () => {
    zeigMitwirkende()
})

//------Funktionen für die Sichtbarkeit von Div-Seiten-----------------------

// Alle Funktionen für Sichtwechsel
// Verschwinden / Auftauchen der Div-Bereiche

function zeigBestenliste() {
    bestenlisteS.style.display = "block";
    menuS.style.display = "none";
}

function zeigMenu() {
    bestenlisteS.style.display = "none";
    menuS = "block";
}

function zeigFortschritt() {
    fortschrittS.style.display = "block";
    menuS.style.display = "none";
}

function zeigMitwirkende() {
    mitwirkendeS.style.display = "block";
    menuS.style.display = "none";
}

