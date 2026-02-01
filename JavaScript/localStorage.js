// Bereich für die Speicherung von lokalen Daten
// Es wird ein Wert in LocalStorage zwischen 0 und 1

export const soundSpeicherung = (volume) => { 
  window.localStorage.setItem("soundWert", volume) // SETTER:
};

// Eine Funktion zum Laden des gespeichertem Werts

export const ladeSound = () => { // GETTER:

  const gespeicherterWert = window.localStorage.getItem("soundWert")

  // Wenn man die Anwendung das erste Mal, öffnet
  // Soll er ein Standartwert annehmen. Null mag er nicht =c

  if (gespeicherterWert !== null) {
    return parseFloat(gespeicherterWert);
  } else
    return 0.5;
};

