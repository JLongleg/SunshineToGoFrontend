//in main.js übernommen

let aktuellePunkteZahl = 0;
const punkteZahlAnzeige = document.getElementById('punkteZahl');

function mehrPunkte() {
    aktuellePunkteZahl++;
    punkteZahlAnzeige.innerText = aktuellePunkteZahl;
}
