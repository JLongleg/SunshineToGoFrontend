import { soundSpeicherung } from "./localStorage.js";

//Zugriff auf den Reglner
let volSlider = document.getElementById("myRange");
//Zugriff auf den Sound
let waldSound = document.getElementById("waldSound");

//Input -> wartet auf den Befehl zum Ausführen der Funktion.
volSlider.addEventListener("input", function() {

// HTML erkennt nur Werte für Sound zwischen 0.0 und 1.0
// value ist der entscheidende Soundbereich.
  let volume = volSlider.value / 100;
  waldSound.volume = volume;
//localer Speicher für den Sound => Weiterarbeiten mit Volume^
// bedient sich dabei vom Importdatei, wo alle Funktionen
// für Local gespeicherte Daten sind.
soundSpeicherung(volume)
});

