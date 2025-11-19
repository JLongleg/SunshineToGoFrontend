//SETUP
// Städte-Objekte mit Name- und Temperatur-Eigenschaft
let paris = {
    name: "Paris",
    temperature: 14
}

let bangkok = {
    name: "Bangkok",
    temperature: 27
}

let reykjavik = {
    name: "Reykjavik",
    temperature: -3
}

let canberra = {
    name: "Canberra",
    temperature: 10
}

let budapest = {
    name: "Budapest",
    temperature: 0
}

// Charakter-Objekt mit Temperatur-Wunsch
let character1 = {
    name: "Tiffany",
    temperatureWish: 27
}

/*Wenn später ein Button vom Spieler gewählt wird, wird diese Variable mit dem gewählten Städtenamen überschrieben*/
let mychosenCity = "Noch keine Stadt gewählt";

//Hauptteil
// City-Auswahl für diese Runde aus Array der möglichen Cities
// Konsole zeigt die drei ausgewählten Städte für diese Runde
cityArray = [paris, bangkok, reykjavik, canberra, budapest] //Array muss noch randomized werden
city1 = waehleCity()
console.log("City1 ist:", city1);
city2 = waehleCity()
console.log("City2 ist:", city2);
city3 = waehleCity()
console.log("City3 ist:", city3);

// .js hat Städte aus cityArray ausgewählt und die Buttons werden entsprechend benannt*/
document.getElementById("button1").value = city1.name;
document.getElementById("button2").value = city2.name;
document.getElementById("button3").value = city3.name;

//Wert des Temperaturwunsches von Charakter1 wird an .html weitergeleitet
document.getElementById("desiredTemperatureOfCharacter1").innerHTML = character1.temperatureWish




//FUNKTIONEN
/*Speichert erstes Array-Element als "city" und entfernt es dann vom Array der noch verfügbaren Städte*/
function waehleCity() {
    city=cityArray[0];
    cityArray.shift();
    return city
}

//Prüft, ob der Button der korrekten Stadt gewählt wurde, zeigt Ergebnissatz in HTML
function checkAnswer(chosenCity) {

    //Vergleich von Temperatur in gewählter City mit gewünschter Temperatur von Character1
    //Variable "booleanObKorrekteWahl" wird entweder true oder false
    if (chosenCity == "Paris") {
        booleanObKorrekteWahl = paris.temperature == character1.temperatureWish
    }

    else if (chosenCity == "Bangkok") {
        booleanObKorrekteWahl = bangkok.temperature == character1.temperatureWish
    }
        
    else if (chosenCity == "Reykjavik") {
        booleanObKorrekteWahl = reykjavik.temperature == character1.temperatureWish
    }
    
    else if (chosenCity == "Canberra") {
        booleanObKorrekteWahl = canberra.temperature == character1.temperatureWish
    }

    else if (chosenCity == "Budapest") {
        booleanObKorrekteWahl = budapest.temperature == character1.temperatureWish
    }

    //Erstellung und HTML-Anzeige von Ergebnissatz
    if (booleanObKorrekteWahl == true) {
        Ergebnissatz = "Yay, perfekte Temperatur!"
    }

    else {
        Ergebnissatz = "Die Temperatur dort passt nicht. Tiffany will eine Rückerstattung."
    }

    document.getElementById("result").innerHTML = Ergebnissatz;

    //Check: Konsole zeigt, ob gewählter Button korrekt war
    console.log("Gewählt wurde", chosenCity, ". War diese Auswahl korrekt? ", booleanObKorrekteWahl);

    //"value"-Wert des gewählten Buttons, z.B. "Paris", wird als Variable für spätere Möglichkeiten gespeichert
    mychosenCity = chosenCity;
    console.log("Nach Auswahl eines Buttons ist mychosenCity: ", mychosenCity);


}      
