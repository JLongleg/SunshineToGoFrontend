

/*
==========================================================
    Import Speicherung / Basis
==========================================================
*/
console.log("Test, ob die JS Dabei erfasst wird [x]")

import { soundSpeicherung, ladeSound } from "./localStorage.js";

try {

  let volSlider = document.getElementById("myRange");
  if (volSlider) {

    volSlider.value = ladeSound() * 100;

    volSlider.addEventListener("input", function () {
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

  else if (window.location.pathname.includes("tutorial.html")) {
    console.log("Spiele Tutorialmusik")
    imTutorialSound(startVolume) /* Tutorialbereich */
  }

} // try

/*
==========================================================
    Gameplay Sound
==========================================================
*/

catch (error) {
  console.error("KRITISCHER FEHLER im Haupt-Skript:");
  console.error(error);
}
function imGameplaySound(volume) {

  let lenaSound = document.getElementById("lenaSound");
  if (lenaSound) {
    lenaSound.volume = volume;
  }
}

/*
==========================================================
    Tutorial Sound
==========================================================
*/

function imTutorialSound(volume) {
  let endSound = document.getElementById("endSound");
  if (endSound) {
    console.log("Sound endSound gefunden")
    endSound.volume = volume;
    console.log(`Lautstärke umgestellt ${volume}`)
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
  const audioIDs = ["waldSound", "lenaSound", "endSound"];

  audioIDs.forEach(id => {
    const audio = document.getElementById(id);
    if (audio) audio.volume = vol;
  });
}
