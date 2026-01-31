/*Funktion soll zuerst ausgeführt werden. => Stare Scriptablauf*/ 
addEventListener('DOMContentLoaded', function() {

const dunkelModus1 = localStorage.getItem('darkMode') === '1';
const checkKasten = document.getElementById("checkbox");

/*
Aufpassen, JS mag keine NULLWerte, 
er weiß nicht, wo die Checkbox
ist, wenn er nicht im Menu ist
*/

if (dunkelModus1) {
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