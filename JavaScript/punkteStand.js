let aktuellePunkteZahl = pZ;
const punkteZahlAnzeige = document.getElementById('punkteZahl');

function mehrPunkte() {
    aktuellePunkteZahl++;
    punkteZahlAnzeige.innerText = aktuellePunkteZahl;
}
