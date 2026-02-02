/*
==========================================================
    Routing-Funktion zwischen Menu und Gameplay
==========================================================
*/
// Die Paths sind dabei nur Strings / Funktion es soll
// verhindern, dass beim Abspielen von Script, Scripte
// von fremd HTMLs verwendet werden:

if (window.location.pathname.includes("sunshine_to_go_menu.html")) {
    console.log("Willkommen im Menubereich");
    imMenu() /* Menubereich */
}

else if (window.location.pathname.includes("index.html")) {
    console.log("Willkommen im Gameplaybereich");
    imGameplay() /* Gameplaybereich */
}

else if (window.location.pathname.includes("tutorial.html")) {
    console.log("Willkommen bei der Dokumentation")
    imTutorial() /* Tutorialbereich */
}
/*
==========================================================
    Menubereich 
    ===========
==========================================================
*/

function imMenu() {

    // Hinweise
    // Ein Button für alle Bereiche, der nur einmal erstellt werden muss. 
    // benötigt eine Klasse, weil es häufiger verwendet wurde. 

    const alleMenuButtonsGoBack = document.querySelectorAll(".zumMenuButton");



    alleMenuButtonsGoBack.forEach(einzelnerButton => {
        einzelnerButton.addEventListener("click", funcZumMenu);
    });

    /*
    ============================================================
        Optionsfenster
    ============================================================
    */

    const buttonClickOptions = document.getElementById("startOnClickOptions");
    const fensterWindowOp = document.getElementById("openWindowOptionID");

    // Optionensfenster wird angezeigt
    buttonClickOptions.addEventListener("click", () => {
        fensterWindowOp.showModal();
    });

    // Optionsfenster schließen
    const buttonCloseOptionsWindow = document.getElementById("closeWindowOptionsButton");

    // Registriert jeden Klick egal, ob an oder aus
    checkbox.addEventListener("click", () => {
        return window.location.reload();
    })

    // Optionsfenster wird geschlossen
    buttonCloseOptionsWindow.addEventListener("click", () => {
        fensterWindowOp.close();
        
    });

    /*
    ==========================================================
    Darkmode-Barrierearmut = Checkbox
    =================================
    ==========================================================
    */

    // Abspeicherung des Darkmode durch localStorage.js => 0/1
    // Sowie auf den einzelnen HTMLSeiten eine Verlinkung zu der
    // dunkelModusAbfrage, um vorher den Wert für DM Abzurufen.

    const checkKasten = document.getElementById("checkbox");

    checkKasten.addEventListener("change", () => {
        if (checkKasten.checked) {
            console.log("Dunkelmodus wurde aktiviert")
            return darkMode1 = window.localStorage.setItem("darkMode", '1')
        } else {
            console.log("Dunkelmodus wurde deaktiviert")
            return darkMode0 = window.localStorage.setItem("darkMode", '0')
        }
    });

}; // Ende vom Menubereich

    /*
    ==========================================================
    Gameplaybereich
    ===============
    ==========================================================
*/

function imGameplay() {
// Kontrollinstanz mit Console:
console.log("JS nähere Auswahl Gameplay");

    // Button für das PausenMenu
    const buttonPauseMenu = document.getElementById("btnPauseMenuId");

    // Button im Optionsfenster, dass das Optionsfenster wieder schließt
    const optionsfensterSchlie = document.getElementById("opSchiessen")

    // Pausen Menu öffnen
    const pausenMenuOp = document.getElementById("pausenMenu");

    // Optionsfenster
    buttonPauseMenu.addEventListener("click", () => {
        console.log("Pausenmenu wurde geöffnet");
        pausenMenuOp.showModal();
    });

    // Optionsfenster schließen
    optionsfensterSchlie.addEventListener("click", () => {
        console.log("Optionsfenster geschlossen")
        pausenMenuOp.close();
    });

}  // Ende aus dem Gameplaybereich

/*
==========================================================
    Tutorialbereich
    ==================
==========================================================
*/

function imTutorial() {

    const buttonHome = document.querySelectorAll(".btnHome");


    // Eine query, die alle HomeIcons wieder nach Oben von der Seite
    // führt, da mehrere Buttons mit der Gleichen ID nicht funktionieren
    // benötigt man ein Class.

    buttonHome.forEach(btnHomeNav => {
        btnHomeNav.addEventListener("click", () => {
            // Hochscrollfunktion
            window.scrollTo(0, 0);
        })

    });

};




