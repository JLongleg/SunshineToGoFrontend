
const MenuButton = document.querySelectorAll(".zumMenuButton");
// Funktion für den Menu Button, soll bei allen Seiten zurück zum Menu gehen.
MenuButton.addEventListener("click", () => {
    funcZumMenu()
});

function funcZumMenu() {
    const menu = document.getElementById("menuBereichHTML");
    const fortschritt = document.getElementById("fortschrittBereichHTML");
    const bestenliste = document.getElementById("bestenListeBereichHTML");
    const gameplay = document.getElementById("gameplayBereichHTML");
    const mitwirkende = document.getElementById("mitwirkendeBereichHTML");

if (menu && fortschritt && bestenliste && gameplay && mitwirkende) {
    menu.style.display = "block";
    fortschritt.style.display = "none";
    bestenliste.style.display = "none";
    gameplay.style.display = "none";
    mitwirkende.style.display = "none";
} else {
        console.error("Eines der HTML-Elemente fehlt!");
}
};


const alleMenuButtonsGoBack = document.querySelectorAll(".zumMenuButton");

function funcZumMenu() {
    const menu = document.getElementById("menuBereichHTML");
    const fortschritt = document.getElementById("fortschrittBereichHTML");
    const bestenliste = document.getElementById("bestenListeBereichHTML");
    const gameplay = document.getElementById("gameplayBereichHTML");
    const mitwirkende = document.getElementById("mitwirkendeBereichHTML");

    //Sicherheits-Check
    if (menu && fortschritt && bestenliste && gameplay && mitwirkende) {
        menu.style.display = "block";
        fortschritt.style.display = "none";
        bestenliste.style.display = "none";
        gameplay.style.display = "none";
        mitwirkende.style.display = "none";
    }
    else {
        console.error("Eines der HTML-Elemente fehlt!");
    };

    alleMenuButtonsGoBack.forEach(button => {
        einzelnerButton.addEventListener("click", funcZumMenu);
    });
     
