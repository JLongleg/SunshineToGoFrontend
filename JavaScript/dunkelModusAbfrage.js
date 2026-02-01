/*Funktion soll zuerst ausgeführt werden. => Stare Scriptablauf*/ 
addEventListener('DOMContentLoaded', function() {

const dunkelModus1 = localStorage.getItem('darkMode') === '1';
const checkKasten = document.getElementById("checkbox");

// Jedesmal, wenn die Seite gestartet wird, wird einmal abgefragt
// Liebe HTMLSeite, kannst du bitte gucken, was im LocalStorage ist.

if (dunkelModus1) {
    
    // ZwischenBereich => Da die Checkbox sich nach dem Anklicken und ver-
    // lassen der HTMLSeite immer wieder unchecked, hier eine Sicherung.

    if(window.location.pathname.includes("sunshine_to_go_menu.html"))  {
    /*relevant, damit die Checkbox checked bleibt*/ 
    checkKasten.checked = true;}
    else 
    console.log("DARKMODE ON");
    document.documentElement.classList.add('dark-mode');
} else
    console.log("DARKMODE OFF");
document.documentElement.classList.add('white-mode');

});