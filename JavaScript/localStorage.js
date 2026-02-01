export const soundSpeicherung = (volume) => { // Bereich für die Speicherung von lokalen Daten
  window.localStorage.setItem("soundWert", volume) // SETTER:
};


export const ladeSound = () => { // GETTER:

  const gespeicherterWert = window.localStorage.getItem("soundWert")

  if (gespeicherterWert !== null) {
    return parseFloat(gespeicherterWert);
  } else
    return 0.5;
};

