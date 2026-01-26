// Bereich für die Speicherung von lokalen Daten

// SETTER:
export const soundSpeicherung = (volume) => { 
    window.localStorage.setItem("soundWert", volume)
};

// GETTER:
export const ladeSound = () => {

const gespeicherterWert = window.localStorage.getItem("soundWert")

 if (gespeicherterWert !== null) {
    return parseFloat(gespeicherterWert);
  } else
    return 0.5;
};