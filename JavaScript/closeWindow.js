<script src="../JavaScript/closeWindow.js"></script>

// Schließe die Anwendung
function schliesseDieseAnwendung() {
    window.close();
}


function fensterOeffnen() {
    document.getElementById('startOptionen', () => { // omg, ich benutze hier Arrow Function und verstehe es! :D
        fensterWindowOptionen.showModal();
    }) 
}


// Schließen Option
function optionenSchliessen() {
    document.getElementById('fensterOptionen').close();
    }