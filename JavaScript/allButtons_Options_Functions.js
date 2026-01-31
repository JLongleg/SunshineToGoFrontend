/*
==========================================================
    Routing-Funktion zwischen Menu und Gameplay
==========================================================
*/

if (window.location.pathname.includes("sunshine_to_go_menu.html")) {
    console.log("Willkommen im Menubereich");
    imMenu() /* Menubereich */
}

else if (window.location.pathname.includes("spiel_spielen.html")) {
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

    // Div-Bereiche für die Sichtbarkeit bestimmen:
    const menuS = document.getElementById("menuBereichHTML");
    const bestenlisteS = document.getElementById("bestenListeBereichHTML");
    const gameplayS = document.getElementById("gameplayBereichHTML");
    const mitwirkendeS = document.getElementById("mitwirkendeBereichHTML");

    /*
    ============================================================
        Universal Button um zurück zum Menu zu kommen
    ============================================================
    */

    // Hinweise
    // Ein Button für alle Bereiche, der nur einmal erstellt werden muss. 
    // benötigt eine Klasse, weil es häufiger verwendet wurde. 

    const alleMenuButtonsGoBack = document.querySelectorAll(".zumMenuButton");

    function funcZumMenu() {

        if (menuS) menuS.style.display = "block";
        if (bestenlisteS) bestenlisteS.style.display = "none";
        if (gameplayS) gameplayS.style.display = "none";
        if (mitwirkendeS) mitwirkendeS.style.display = "none";
    }

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

    // Optionsfenster wird geschlossen
    buttonCloseOptionsWindow.addEventListener("click", () => {
        fensterWindowOp.close();
        return window.location.reload();
    });


    /*
==========================================================
Darkmode-Barrierearmut
======================
==========================================================
*/

    // Abspeicherung des Darkmode durch 0/1

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

    // !Wichtiger Hinweis! Für meine JS Datei, da bei der Abfrage
    // von zwei unterschiedlichen Dialogen in Menu und Gameplay ist
    // es wichtig, dass die Dialoge aus der vorherigen Seite
    // nicht = NULL ist, da sonst eine Fehlermeldung entsteht. 
    // Wurde mit der Routingfunktion behoben S. oben [x]


    // Button für das PausenMenu

    const buttonPauseMenu = document.getElementById("pausenMenuButton");

    // Pausen Menu öffnen !!!!!!!
    const pausenMenuOp = document.getElementById("pausenMenu");

    // Optionsfenster

    buttonPauseMenu.addEventListener("click", () => {
        pausenMenuOp.showModal();
    });

    buttonPauseMenu.addEventListener("click", () => {
        pausenMenuOp.showModal();
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

    buttonHome.forEach(btnHomeNav => {
        btnHomeNav.addEventListener("click", () => {
            window.scrollTo(0, 0);
        })

    });

};




