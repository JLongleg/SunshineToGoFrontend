/*
==========================================================
    Zwei zentrale Funktionen
    1.) Abruf des Sounds
    2.) Input beim Regler
==========================================================
*/

// Entnehme => localStorage den Script

import { soundSpeicherung, ladeSound } from "./localStorage.js";

try {

  // volSlider, soll den Regler vom Sound ansteuern

  let volSlider = document.getElementById("myRange");
  if (volSlider) {

 // VolSlider nimmt letzten gespeicherten Wert oder 0.5 als Standard

    volSlider.value = ladeSound() * 100;

    //

    volSlider.addEventListener("input", function () {
      
      // Normalisiere auf den Bereich 0.0 bis 1.0

      let volume = volSlider.value / 100; 
      // Speichere diesen Wert
      soundSpeicherung(volume);

      // Anwendung auf SoundFunktion
      aktualisiereAktuellenSound(volume); 
    });
  }

  // Abfrage des Soundswerts
  const startVolume = ladeSound();

  /*
  ==========================================================
      Routing-Funktion für die Musik
  ==========================================================
  */

  // Identifiziere die akutell geführte Seite.

  if (window.location.pathname.includes("sunshine_to_go_menu.html")) {
    console.log("Spiele Menu Sound");
    imMenuSound(startVolume) /* Menubereich */
  }

  else if (window.location.pathname.includes("index.html")) {
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

/** 
* Wie verhält sich die Lautstärke im Gameplay
* @param {number} volume - ist der normalisierte Wert zwischen 0.0 und 1.0
* mit @ und dann param kann man einzelne Parameter ist und eine Zahl
*/

function imGameplaySound(volume) {
  console.log("Sound wurde umgestellt");
  let lenaSound = document.getElementById("lenaSound");

// Lautstärke für das Gameplay

  if (lenaSound) {
    console.log("Sound lenaSound gefunden");
    lenaSound.volume = volume;
    console.log(`Lautstärke umgestellt ${volume}`)
  } else {
    console.warn("Lautstärke kann nicht umgestellt werden.");
  }
}

/*
==========================================================
    Tutorial Sound
==========================================================
*/

// Lautstärke für das Tutorial

function imTutorialSound(volume) {
  let endSound = document.getElementById("endSound");
  
  if (endSound) {
    console.log("Sound endSound gefunden");
    endSound.volume = volume;
    console.log(`Lautstärke umgestellt ${volume}`);
  }
}

/*
==========================================================
    Menu Sound
==========================================================
*/

// Lautstärke für das Menu

function imMenuSound(volume) {

  let waldSound = document.getElementById("waldSound");
  if (waldSound) {
    waldSound.volume = volume
    console.log(`Lautstärke umgestellt ${volume}`);
  }
}

// Erklärung von Aktualisierung
// Array mit drei unterschiedlichen ID's
// Die Schleife forEach gehe jede ID durch und führe Sachen aus
// 1:n Beziehung => Ein Regler für mehrere Sounds

function aktualisiereAktuellenSound(vol) {
  const audioIDs = ["waldSound", "lenaSound", "endSound"];

// Nullwerte verhinderung:

  audioIDs.forEach(id => {
    const audio = document.getElementById(id);
    if (audio) audio.volume = vol;
  });
}
