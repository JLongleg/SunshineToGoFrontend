/*
==========================================================
    Import Speicherung / Basis
==========================================================
*/

import { soundSpeicherung, ladeSound } from "./localStorage.js";

let volSlider = document.getElementById("myRange");
if(volSlider) {

volSlider.value = ladeSound() * 100;

volSlider.addEventListener("input", function() {
  let volume = volSlider.value / 100;
  soundSpeicherung(volume);
aktualisiereAktuellenSound(volume);
});
}

const startVolume = ladeSound();


/*
==========================================================
    Routing-Funktion für die Musik
==========================================================
*/

if (window.location.pathname.includes("sunshine_to_go_menu.html")) {
    console.log("Spiele Menu Sound");
    imMenuSound(startVolume) /* Menubereich */
}

else if (window.location.pathname.includes("spiel_spielen.html")) {
    console.log("Spiele Gameplaymusik");
    imGameplaySound(startVolume) /* Gameplaybereich */
}

else if (window.location.pathname.includes("fortschritt.html")) {
    console.log("Spiele Fortschrittsmusik")
    imFortschrittSound(startVolume) /* Fortschrittbereich */
}

/*
==========================================================
    Gameplay Sound
==========================================================
*/
function imGameplaySound(volume) {

    let bitSound = document.getElementById("bitSound");
  if (bitSound) {
    bitSound.volume = volume;
  } 
} 

/*
==========================================================
    Fortschritt Sound
==========================================================
*/

function imFortschrittSound(volume) {

  let endSound = document.getElementById("endSound");
  if (endSound) {
    endSound.volume = volume;
  } 
} 

/*
==========================================================
    Menu Sound
==========================================================
*/
 
function imMenuSound(volume) {

  let waldSound = document.getElementById("waldSound");
  if (waldSound) {
    waldSound.volume = volume
  } 
}


function aktualisiereAktuellenSound(vol) {
  const audioIDs = ["waldSound", "bitSound", "endSound"];

  audioIDs.forEach(id => {
    const audio = document.getElementById(id);
    if (audio) audio.volume = vol;
  });
}
