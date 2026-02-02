import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'; // Für Fonts
import { FontLoader } from 'three/addons/loaders/FontLoader.js'; // Für Fonts



import A3 from 'a3model'; //Barrierefreiheit


/* =========================================
    REFERENZEN
   ========================================= */

// Referenzen
// Referenz 1: THREE.js Manual: https://threejs.org/manual/#en/installation#manual/introduction/Creating-a-scene
// Referenz 2: Ref '02' Animation setup von https://www.youtube.com/watch?v=GByT8ActvDk (Animation from THREE.js Manual: https://threejs.org/manual/?q=animation#en/animation-system)
// Referenz 3: Ref '03' für Fonts von https://threejs.org/docs/#TextGeometry and https://threejs.org/docs/?q=fontloader#FontLoader
// Referenz 4: Ref '04' Ergebnis-Pop-Up, von https://www.youtube.com/watch?v=r_PL0K2fGkY
// Referenz 5: Ref '05' Barrierefreiheit: https://www.npmjs.com/package/a3model?activeTab=readme


/* =========================================
    SCENE SETUP
   ========================================= */

const scene = new THREE.Scene();


// Ref '05'
const canvas = document.querySelector('canvas#webgl') // A3-Objekt(Canvas) wird initalisiert für das passende HTML-Element
const sizes = { // Angepasst an die Fenstergröße

  width: innerWidth,

  height: innerHeight

}

const clock = new THREE.Clock(); //Interne Uhr, benötigt für Animationen, Ref '02'



// Kamera
// Ref '02'

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // Field of view und aspect ratio, Ref '02'
camera.position.set(15, 10, 10);
scene.add(camera)



// Renderer 
// Ref '05'

const renderer = new THREE.WebGLRenderer({ // Konstruiert einen neuen WebGL-Renderer. WebGL (Web Graphics Library) ist ein Javascript API, mit dessen Hilfe 3D-Grafiken im Browser angezeigt werden können. 

  canvas: canvas  // Falls nicht gegeben, erstellt der Renderer einen eigenen Canvas. Der Renderer benutzt ein <canvas>-Element, um die Szene darzustellen. Dieses Element wird dem HTML-Dokument hinzugefügt.
})

renderer.setSize(sizes.width, sizes.height) // Ref '05'. Grösse der Fläche der gerenderten App.



// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // gegen abruptes Bewegen der Controls
controls.update(); // controls.update() muss nach jeder manuellen Änderung der Kamera aufgerufen werden
controls.maxDistance = 70;
controls.minDistance = 5;



// Setup Barrierefreiheit-Canvas, welcher über dem Canvas der 3D-Szene liegt und z.B. das Erkenen von Objekten von Screen Readern ermöglicht 
// Ref '05'

const a3canvas = document.querySelector('#a3canvas');  //Passendes HTML-Element...

const mya3 = new A3(canvas, renderer, a3canvas, sizes); ///wird für die Erstellung genutzt.



// Gate-Überschriften
// Ref '03'

const fontloader = new FontLoader(); // Kann Fonts in 3D umwandeln

// Erstellen von Überschriften für jedes der drei Gates, für die Temperaturanzeige. String zu 3D-Objekt:

let meshUeberschriftGate1; // Mesh, also 3D-Objekt der Überschrift für Gate1
let meshUeberschriftGate2;
let meshUeberschriftGate3;
let meshTemperatur;
let textfuermeshUeberschriftGate1 = "Gate1"; //String als Basis für die Überschrift von Gate 1. Muss per Funktion in ein Mesh "transformiert" und angezeigt werden.
let textfuermeshUeberschriftGate2 = "Gate2";
let textfuermeshUeberschriftGate3 = "Gate3";
let textfuermeshTemperatur = "-20";


// Layout-Details für die Gate-Überschriften

let gateTexthinzufuegen = function (uebergebeneFont) { //Anonyme Funktionen für Short-Term-Task

  const geometry1 = new TextGeometry(textfuermeshUeberschriftGate1, {
    font: uebergebeneFont,
    size: 2,
    depth: 0.2,
  });

  const geometry2 = new TextGeometry(textfuermeshUeberschriftGate2, {
    font: uebergebeneFont,
    size: 2,
    depth: 0.2,
  });

  const geometry3 = new TextGeometry(textfuermeshUeberschriftGate3, {
    font: uebergebeneFont,
    size: 2,
    depth: 0.2,
  });

  const geometryTemperatur = new TextGeometry(textfuermeshTemperatur, {
    font: uebergebeneFont,
    size: 2,
    depth: 0.2,
  });

  const textmaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff }); //Material für das neu-erstellte Mesh (Aqua)

  // Platzieren der Texte in der Szene (Erstellung, Position, Name und Hinzufügen zur Szene)

  meshUeberschriftGate1 = new THREE.Mesh(geometry1, textmaterial);
  meshUeberschriftGate1.position.set(-15, 12, -15.2);
  meshUeberschriftGate1.name = "UeberschriftGate1";
  scene.add(meshUeberschriftGate1);

  meshUeberschriftGate2 = new THREE.Mesh(geometry2, textmaterial);
  meshUeberschriftGate2.position.set(-4, 9.5, -15.2);
  meshUeberschriftGate2.name = "UeberschriftGate2";
  scene.add(meshUeberschriftGate2);

  meshUeberschriftGate3 = new THREE.Mesh(geometry3, textmaterial);
  meshUeberschriftGate3.position.set(6, 7, -15.2);
  meshUeberschriftGate3.name = "UeberschriftGate3";
  scene.add(meshUeberschriftGate3);

  meshTemperatur = new THREE.Mesh(geometryTemperatur, textmaterial);
  meshTemperatur.position.set(6, 0, 8);
  meshTemperatur.rotation.x = -Math.PI / 2;  // Die Temperaturanzeige ist anders ausgerichtet als die Gate-Überschriften (Radian-Angabe)
  meshTemperatur.rotation.y = 0.52
  meshTemperatur.rotation.z = Math.PI /2
  meshTemperatur.name = "Temperaturwunsch"; // Der Name des Meshes, für eine einfache Referenz auf das Objekt
  scene.add(meshTemperatur);
}

// Erstellen der Schriftarten mit den spezifizierten Details

fontloader.load("Schriftart.json", gateTexthinzufuegen); //Erstes Attribut: Loader lädt Font und übergibt sie an zweites Attribut: anonyme Funktion


// Ersatz der Gate-Überschriften mit Städtenamen der aktuellen Runde

function gateUeberschriftErsetzen(nameStadt1, nameStadt2, nameStadt3, tempWunsch) {
  scene.remove(meshUeberschriftGate1);
  scene.remove(meshUeberschriftGate2); //Mesh wird nicht mehr in Szene angezeigt
  scene.remove(meshUeberschriftGate3);
  scene.remove(meshTemperatur);

  textfuermeshUeberschriftGate1 = nameStadt1;
  textfuermeshUeberschriftGate2 = nameStadt2;
  textfuermeshUeberschriftGate3 = nameStadt3;
  textfuermeshTemperatur = "\"" + tempWunsch.toString() + "°C\""; //z.B. "22°C"

  fontloader.load("Schriftart.json", gateTexthinzufuegen); //Überschriften werden per Funktion neu erstellt (mit dem nun aktualisierten Text)
}

// Hinzufügen und Drehen des Cubes
// Ref '05'

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
let beispielCube = new THREE.Mesh(geometry, material);
beispielCube.position.set(0, 10, 0);

//Da dieses Mesh direkt erstellt wird, hat es noch keinene Namen. Objekte, die von Blender importiert wurden, haben schon Namen.
beispielCube.name = "beispielCube"
beispielCube = mya3.createBox(beispielCube, "button") //Erstellen einer unsichtbaren Box um den Cube, mit der Screenreader interagiere können, Typ "Button".
scene.add(beispielCube);



//Hintergrundbild 
//Setup von threejs.org Manual
//360° Hintergrundbilder 'kloofendal_48d_partly_cloudy_puresky.jpg' und 'rogland_clear_night.jpg' von der public asset library: https://polyhaven.com/

const dunkelModus1 = localStorage.getItem('darkMode') === '1'; //DunkelModus-Status aus LocalStorage

const file = dunkelModus1 ? 'Hintergrundbild_Nighttime.jpg' : 'Hintergrundbild_Daytime.jpg'; //Entsprechend wird das Tag- oder Nachtmodus-Bild verwendet

new THREE.TextureLoader().load(file, (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping; //Spezieller Textureloader für 360°-Bilder
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});



// Lichtquelle

if (dunkelModus1 == true) { //Ambient light for Dark Mode
  const color2 = 0xFFFFFF; //white
  const intensity2 = 1;
  const light2 = new THREE.AmbientLight(color2, intensity2);
  scene.add(light2);
}

else {  //Directional light
  const color = 0xFFFFFF; 
  const intensity = 5;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);
}



/* =========================================
    3D-MODELL UND ANIMATIONEN
   ========================================= */

const loader = new GLTFLoader(); //Importiert gltf-Dateien mit 3D-Objekten

//Animationsvariablen
let mixer; //Ref '02'  //Mixer spielt Animationen für ein Objekt ab, wird in gltfLoader-Funktion erstellt
let mixer2; //zwei unabhängige Mixer für unabhängige Animationen (eine stoppt, andere macht weiter)

let clips; //Array der verfügbaren Animationen (keyframes)
let importsfertig = false; //Erst nach Laden des Modells beginnen die Animationen

// Charaktere und Spielvariablen
let aktuellerCharakter; //Charakter für diese Spielrunde
let Tiffany; 
let Jasun;
let Snovella;
let MrRain;
let Passagierliste = []; //Liste verfügbarer Charaktere, aus denen spaeter einer für die aktuelle Runde ausgewählt wird
let invisibleGuide; //Ein Koordinatenpunkt ohne Geometrie/Volumen. Andere Objekte hängen sich für Animationen-Navigation an ihn.
let curCities //'Current Cities', Daten ausgewählter Städte für die aktuelle Runde
let KorrekteAntwort //Daten der korrekten Stadt in der aktuellen Runde
let gewaehltesGate = 'Gate2' //Mittiges Gate als Default
let tempWunsch //Charakter wünscht sich immer eine Temperatur, die zu einer aktuellen Temperatur der drei Städte passt.



// Einmaliges Laden des der benötigten Daten für das Spiel und des 3D-Modells

//Laden von nahezu 100 Städte von Jans API

async function loadCities() {
  const response = await fetch('/api/cities');
  if (!response.ok) {                         //Fehlermeldung, falls fetchen der wetter-Liste fehlschlägt
    throw new Error('API nicht erreichbar');
  }
  var cities = await response.json();
  return cities;
}

// Auswählen und Rückgabe von drei Städte aus dem Array, die dann aus dem Array entfernt werden

function pickCities(cities) {
  if (cities.length > 2) {
    var curCities = cities.splice(0, 3);
  } else throw new Error('Nicht ausreichend Städte im Array');
  return curCities;
}

// Variable 'cities' wird erstellt und das Array (nahezu 100 Städte) per Funktion darin gespeichert

let cities;

try {
  cities = await loadCities();
}

// Falls das nicht klappen sollte (z.B. Server down) wird eine Backup-Liste der Daten von 18 Städten verwendet
catch (e) {
  cities = [
    { "city": "Tokyo", "country": "Japan", "maxTemperature": 9 },
    { "city": "Delhi", "country": "India", "maxTemperature": 16 },
    { "city": "Shanghai", "country": "China", "maxTemperature": 20 },
    { "city": "São Paulo", "country": "Brazil", "maxTemperature": 29 },
    { "city": "Mexico City", "country": "Mexico", "maxTemperature": 19 },
    { "city": "Cairo", "country": "Egypt", "maxTemperature": 18 },
    { "city": "Beijing", "country": "China", "maxTemperature": 0 },
    { "city": "Mumbai", "country": "India", "maxTemperature": 25 },
    { "city": "Osaka", "country": "Japan", "maxTemperature": 8 },
    { "city": "Karachi", "country": "Pakistan", "maxTemperature": 24 },
    { "city": "Chongqing", "country": "China", "maxTemperature": 13 },
    { "city": "Istanbul", "country": "Turkey", "maxTemperature": 8 },
    { "city": "Buenos Aires", "country": "Argentina", "maxTemperature": 34 },
    { "city": "Kolkata", "country": "India", "maxTemperature": 22 },
    { "city": "Kinshasa", "country": "DR Congo", "maxTemperature": 30 },
    { "city": "Lagos", "country": "Nigeria", "maxTemperature": 34 },
    { "city": "Manila", "country": "Philippines", "maxTemperature": 28 },
    { "city": "Tianjin", "country": "China", "maxTemperature": 2 }];
}

//Anfangswerte
let nummerDerRunde = 0;
let aktuellePunkteZahl = 0;
const punkteZahlAnzeige = document.getElementById('punkteZahl'); //Feld, welches ständig auf Bildschirm die erlangte Punkteanzahl anzeigt

//Erhöhung der erspielten Punkteanzahl um 1 und Anzeige
function mehrPunkte() {
  aktuellePunkteZahl++;
  punkteZahlAnzeige.innerText = aktuellePunkteZahl;
}

// Vorteil der "onLoad"-Funktion des gltfLoaders: Wird erst ausgeführt, sobald Modell geladen ist und alle Objekte der Szene zur Verfügung stehen
//übergeben werden: Datei mit Modell und Funktion die aufgerufen wird, wenn der Ladeprozess beendet ist.
loader.load('./Sunshine3DModel23.glb', function (gltf) {
  
  scene.add(gltf.scene); //eines der "Loader results" war die Szene (3D-Modell) aus dieser glb-Datei, die jetzt der gesamten angezeigten Szene hinzugefügt wird, Ref '02'
  importsfertig = true; //besonders relevant bei mehrehren zu ladenden Modellen
  //Da wir nur in dieser Funktion das gesamte 3D-Modell aus dieser Datei zur Verfügung haben, müssen jetzt die "Mixer" (undefined) mit den Animationen erstellt werden
  Tiffany = scene.getObjectByName('Armature_Tiffany');
  Jasun = scene.getObjectByName('Armature_Jasun');
  Snovella = scene.getObjectByName('Armature_Snovella');
  MrRain = scene.getObjectByName('MrRain_Armature');
  Passagierliste.push(Tiffany, Jasun, Snovella, MrRain); //Später Zufallsziehung aus dieser Liste für den neuen Charakter

  invisibleGuide = scene.getObjectByName('Empty');
  mixer = new THREE.AnimationMixer(invisibleGuide);
  mixer2 = new THREE.AnimationMixer(gltf.scene);
  // AnimationMixer(gltf.scene) ist ein Constructor für einen Player für Animationen. Mixer ist komplexes Objekt, nicht nur Array mit Animationen, ref '02'.
  clips = gltf.animations; //Array aller verfügbaren Animationen (Ref '02')


// Spielrundenübergreifende Vorbereitungen sind abgeschlossen, nun können die Spielrunden begonnen werden
  spielrunde()



  async function spielrunde() {
    // Solange im Array noch mind. 3 Städte übrig sind, kann eine neue Runde mit drei Städte beginnen

    while (cities.length > 2) {

      // WERTE FUER DIESE RUNDE
      curCities = pickCities(cities);// 3 Städte für die aktuelle Runde werden ausgewählt. Attribute: city, country, maxTemperature

      charakterSichtbarkeitaendern("macheunsichtbar"); //Alle Charakter-Objekte folgen dem InvisibleGuide gleichzeitig und sollen erstmal nicht angezeigt werden

      // Beschriftung von Gates in Reihenfolge (Array bereits randomised).
      // Bestimmen der richtiger Antwort (Zufällige Zahl 0-2 entspricht Flughafen Gate 1, 2 oder 3)

      let zufälligeZahl = Math.floor(Math.random() * 3) //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      KorrekteAntwort = curCities[zufälligeZahl];
      let zufälligeZahlNullbisDrei = Math.floor(Math.random() * 4)
      aktuellerCharakter = Passagierliste[zufälligeZahlNullbisDrei];

      charakterSichtbarkeitaendern("machesichtbar", aktuellerCharakter); //Funktion aktiviert u.A. die Sichtbarkeit einzelner Charaktere

      //Temperaturwunsch des Charakters wird passend zur richtigen Antwort gesetzt
      tempWunsch = KorrekteAntwort.maxTemperature

      //Platzhalter-Überschriften über Gates werden durch Städtenamen dieser Runde ersetzt
      gateUeberschriftErsetzen(curCities[0].city, curCities[1].city, curCities[2].city, tempWunsch)


      //In der 5. Runde ist das Spiel zu Ende.
      if (nummerDerRunde === 5) {

        resultscreen(aktuellePunkteZahl) // Funktion zweigt Ergebnis bei Spielende und beendet die While-Schleife
        break;
      }

      //Barrierefreiheit mit Tasten (1-3 oder Tab): Gate-Auswahl

      document.addEventListener('keydown', function (event) {
        if (event.key == "1") {
          gewaehltesGate = 'Gate1';
        }
        else if (event.key == "2") {
          gewaehltesGate = 'Gate2';
        }
        else if (event.key == "3") {
          gewaehltesGate = 'Gate3';
        }
      })

      
      let Gate1 = scene.getObjectByName('Gate1') // Referenz auf das 3D-Objekt mit diesem Namen
      Gate1 = mya3.createBox(Gate1, "button"); //Klickbare unsichtbare Box um Gate1
      mya3.click(Gate1.name, barrierefreiGate1gewaehlt, 'Gate 1 wurde ausgewählt') //Objekt, auszuführende Funktion bei Klick und vom Screenreader vorgelesener Text

      function barrierefreiGate1gewaehlt() {
        gewaehltesGate = 'Gate1'; //für spätere Animation
      }

      let Gate2 = scene.getObjectByName('Gate2')
      Gate2 = mya3.createBox(Gate2, "button"); //Klickbare unsichtbare Box um Gate1
      mya3.click(Gate2.name, barrierefreiGate2gewaehlt, 'Gate 2 wurde ausgewählt')

      function barrierefreiGate2gewaehlt() {
        gewaehltesGate = 'Gate2';
      }

      let Gate3 = scene.getObjectByName('Gate3')
      Gate3 = mya3.createBox(Gate3, "button") //Klickbare unsichtbare Box um Gate 1
     mya3.click(Gate3.name, barrierefreiGate3gewaehlt, 'Gate 3 wurde ausgewählt')

      function barrierefreiGate3gewaehlt() {
        gewaehltesGate = 'Gate3';
      }

      mya3.renderEffects(camera) //Muss nach Accessibilty-Aktionen aufgerufen werden

      // Result Screen bei Spielende, Ref '04'

      function resultscreen(aktuellePunkteZahl) {

        const ErgebnisPopUpWrapper = document.getElementById("ErgebnisPopUpWrapper"); //Textfeld des Resultate-Pop-Ups
        const closeBtn = document.getElementById("closeErgebnisPopUpWrapper"); //Close-Button, um Pop-Up zu schliessen

        ErgebnisPopUpWrapper.classList.add("open"); //Div bekommt neue Klasse, die es in den Vordergrund (Layer 999) rückt

        const ResultatPopUp = document.getElementById('punkteZahlResultat');
        if (aktuellePunkteZahl == 1) {
          ResultatPopUp.innerText = aktuellePunkteZahl + " Pünktchen erreicht! OK!"
        }
        else if (aktuellePunkteZahl == 0) {
          ResultatPopUp.innerText = aktuellePunkteZahl + " Punkte. 0. Oh."
        }
        else {
          ResultatPopUp.innerText = aktuellePunkteZahl + " Punkte, yay!"
        }
        closeBtn.addEventListener("click", () => {
          ErgebnisPopUpWrapper.classList.remove("open"); //Entfernen der Klasse schlie0t das Pop-Up.
        })
      }



      showIdleAnimation(); //Aktueller Charakter wird in Idle-Position gebracht
      goToCenter(); // Animation des Weges zum Entscheidungspunkt

      await new Promise((resolve =>
        mixer.addEventListener('finished', resolve, false))); // Wenn mixer 'finished', dann resolved das Promise. Dadurch wird ein Abwarten der Animation gewährleistet

      scene.getObjectByName("CoverGate1").visible = false; // Unsichtbarmachen der Gate-Cover, die später richtig oder falsch anzeigen
      scene.getObjectByName("CoverGate2").visible = false;
      scene.getObjectByName("CoverGate3").visible = false;
      scene.getObjectByName("CoverGate1X").visible = false;
      scene.getObjectByName("CoverGate2X").visible = false;
      scene.getObjectByName("CoverGate3X").visible = false;


      sendToChosenGate() //Funktion ruft Funktion goToGate1(), goToGate2(), oder goToGate1() auf.
      await new Promise((resolve =>
        mixer.addEventListener('finished', resolve, false))); // Promise gewährleisted Abwarten der Animation.


      nummerDerRunde += 1;
    }
  }
}
  , undefined, function (error) {

    //"onError-Callback"-Funktion des gltfLoaders
    console.error(error);

  });


  //Idle Animation
function showIdleAnimation() {
  if (aktuellerCharakter == Tiffany) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'TiffanyIdle'); //Richtige Animation finden
    const Idle_action = mixer.clipAction(Idle_clip); //Den Clip an "clipAction" weitergeben, wir bekommen dann eine fertige Animation
    Idle_action.setLoop(THREE.LoopRepeat); //spezifizieren des Loop-Modus
    Idle_action.play(); // Fertige Aktion muss nun noch vom Charakter abgespielt werden
  }

  if (aktuellerCharakter == Jasun) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'JasunIdle');
    const Idle_action = mixer.clipAction(Idle_clip);
    Idle_action.setLoop(THREE.LoopRepeat);
    Idle_action.play();
  }

  if (aktuellerCharakter == Snovella) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'SnovellaIdle');
    const Idle_action = mixer.clipAction(Idle_clip);
    Idle_action.setLoop(THREE.LoopRepeat);
    Idle_action.play();
  }

  if (aktuellerCharakter == MrRain) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'MrRainIdle');
    const Idle_action = mixer.clipAction(Idle_clip); //clip, root, blend mode
    Idle_action.setLoop(THREE.LoopRepeat);
    Idle_action.play();
  }
}

// Funktion: Weg zum Entscheidungspunkt
async function goToCenter() {

  const rollingin_clip = THREE.AnimationClip.findByName(clips, 'CharacterGoesToDecisionPoint');
  const rollingin_action = mixer.clipAction(rollingin_clip, invisibleGuide); //hier spezifizieren wir auch die "root", also das Objekt, welches die Animation ausführen soll
  rollingin_action.clampWhenFinished = true; //Anweisung, am Ende der Animation an Ort und Stelle stehen zu bleiben
  rollingin_action.setLoop(THREE.LoopOnce);
  rollingin_action.play();


  await new Promise((resolve =>
    mixer.addEventListener('finished', resolve, false))); //Promise, um Animation abzuwarten

  rollingin_action.stop(); //Zur Vermeidung von überlagerten Animationen wird die vorherige beendet
}

//Funktion ruft bei Entscheidungspunkt goToGate1(), goToGate2() oder goToGate1() auf.
function sendToChosenGate() {
  if (gewaehltesGate == 'Gate1') {
    goToGate1();
  }

  else if (gewaehltesGate == 'Gate3') {
    goToGate3();
  }

  else {
    goToGate2(); //Gate2 ist Default, falls kein Gate gewählt wurde.
  }
}

// Drei Funktionen, um zu den Gates zu gehen
async function goToGate1() {

  //Charakter fährt zu dem Gate, für das der Spieler sich entschieden hat
  //Event-Listener Referenz: https://www.youtube.com/watch?v=4PAq3aaL8BE&t=63s

  const togate1_clip = THREE.AnimationClip.findByName(clips, 'CharacterGoesToGate1');
  const togate1_action = mixer.clipAction(togate1_clip, invisibleGuide); //clip, root, blend mode
  togate1_action.clampWhenFinished = true;
  togate1_action.setLoop(THREE.LoopOnce);
  togate1_action.play();

  await new Promise((resolve =>
    mixer.addEventListener('finished', resolve, false))); //Wenn mixer 'finished', dann resolve das Promise.
  togate1_action.stop();

//Je nachdem, pb die gewählte Antwort richtig war, wird das "richtig" oder "falsche Antwort"-Cover über dem Gate angezeigt
  if (curCities[0].maxTemperature == tempWunsch) {
    scene.getObjectByName("CoverGate1").visible = true;
    mehrPunkte() //Punkte werden bei richtiger Antwort erhöht
  }
  else {
    scene.getObjectByName("CoverGate1X").visible = true;
  }

  // Animation des wegfliegenden Flugzeugs für das gewählte Gate
  let Flugzeug1 = scene.getObjectByName('Flugzeug1');
  const flugzeughebtab_clip = THREE.AnimationClip.findByName(clips, 'flugzeughebtab');
  const flugzeughebtab_action = mixer2.clipAction(flugzeughebtab_clip, Flugzeug1); 
  flugzeughebtab_action.setLoop(THREE.LoopOnce);
  flugzeughebtab_action.play();



}

async function goToGate3() {
  const togate3_clip = THREE.AnimationClip.findByName(clips, 'CharacterGoesToGate3');
  const togate3_action = mixer.clipAction(togate3_clip, invisibleGuide); //clip, root, blend mode
  togate3_action.clampWhenFinished = true;
  togate3_action.setLoop(THREE.LoopOnce);
  togate3_action.play();

  await new Promise((resolve =>
    mixer.addEventListener('finished', resolve, false))); //Wenn mixer 'finished', dann resolve das Promise.
  togate3_action.stop();

  let Flugzeug3 = scene.getObjectByName('Flugzeug3');
  mixer2 = new THREE.AnimationMixer(Flugzeug3);
  Flugzeug3.name = "Flugzeug1"; //um die Animation von Flugzeug1 nutzen zu können, wird der gleiche Name benötigt
  const flugzeughebtab_clip = THREE.AnimationClip.findByName(clips, 'flugzeughebtab');
  const flugzeughebtab_action = mixer2.clipAction(flugzeughebtab_clip, Flugzeug3); //clip, root, blend mode
  flugzeughebtab_action.setLoop(THREE.LoopOnce);
  flugzeughebtab_action.play();

  Flugzeug3.name = "Flugzeug3"; //Rückgängigmachen der Umbennung

  //Prüfen, ob richtige Antwort gewählt wurde
  if (curCities[2].maxTemperature == tempWunsch) {
    scene.getObjectByName("CoverGate3").visible = true;
    mehrPunkte()
  }
  else {
    scene.getObjectByName("CoverGate3X").visible = true
  }
}


async function goToGate2() {
  //Default: Gate2 bei keiner Gate-Wahl des Spielers
  const togate2_clip = THREE.AnimationClip.findByName(clips, 'CharacterGoesToGate2');
  const togate2_action = mixer.clipAction(togate2_clip, invisibleGuide); //clip, root, blend mode
  togate2_action.clampWhenFinished = true;
  togate2_action.setLoop(THREE.LoopOnce);
  togate2_action.play();

  await new Promise((resolve =>
    mixer.addEventListener('finished', resolve, false))); //Wenn mixer 'finished', dann resolve das Promise.
  togate2_action.stop();

  let Flugzeug2 = scene.getObjectByName('Flugzeug2');
  mixer2 = new THREE.AnimationMixer(Flugzeug2);
  Flugzeug2.name = "Flugzeug1"; //um die Animation von Flugzeug1 nutzen zu können
  const flugzeughebtab_clip = THREE.AnimationClip.findByName(clips, 'flugzeughebtab');
  const flugzeughebtab_action = mixer2.clipAction(flugzeughebtab_clip, Flugzeug2); //clip, root, blend mode
  flugzeughebtab_action.setLoop(THREE.LoopOnce);
  flugzeughebtab_action.play();

  Flugzeug2.name = "Flugzeug2"; //Rückgängigmachen der Umbennung

    //Prüfen, ob richtige Antwort gewählt wurde
  if (curCities[1].maxTemperature == tempWunsch) {
    scene.getObjectByName("CoverGate2").visible = true
    mehrPunkte()
  }
  else {
    scene.getObjectByName("CoverGate2X").visible = true
  }

}

//Diese Funktion macht alle Charakter-Objekt unsichtbar oder aktiviert die Sichtbarkeit einzelner Charaktere
function charakterSichtbarkeitaendern(sichtbarkeitswunsch, charakter = "alle") {
  if (sichtbarkeitswunsch == "macheunsichtbar") {
    scene.getObjectByName("Sunglasses_Jasun").visible = false;
    scene.getObjectByName("Hair_Jasun").visible = false;
    scene.getObjectByName("Body_Jasun").visible = false;
    scene.getObjectByName("Body_Tiffany").visible = false;
    scene.getObjectByName("Hair_Tiffany").visible = false;
    scene.getObjectByName("Head_Tiffany").visible = false;
    scene.getObjectByName("Body_Snovella").visible = false;
    scene.getObjectByName("Hat_Snovella").visible = false;
    scene.getObjectByName("Head_Snovella").visible = false;
    scene.getObjectByName("Rollstuhl_Jasun").visible = false;
    scene.getObjectByName("MrRain_Body").visible = false;
    scene.getObjectByName("MrRain_Head").visible = false;
    scene.getObjectByName("MrRain_Fly").visible = false;
    scene.getObjectByName("MrRain_Hair").visible = false;
  }

  else if (sichtbarkeitswunsch == "machesichtbar") {
    if (charakter == Tiffany) {
      scene.getObjectByName("Body_Tiffany").visible = true;
      scene.getObjectByName("Hair_Tiffany").visible = true;
      scene.getObjectByName("Head_Tiffany").visible = true;
    }
    else if (charakter == Jasun) {
      scene.getObjectByName("Sunglasses_Jasun").visible = true;
      scene.getObjectByName("Hair_Jasun").visible = true;
      scene.getObjectByName("Body_Jasun").visible = true;
      scene.getObjectByName("Rollstuhl_Jasun").visible = true;
    }
    else if (charakter == Snovella) {
      scene.getObjectByName("Body_Snovella").visible = true;
      scene.getObjectByName("Hat_Snovella").visible = true;
      scene.getObjectByName("Head_Snovella").visible = true;
    }
    else if (charakter == MrRain) {
      scene.getObjectByName("MrRain_Body").visible = true;
      scene.getObjectByName("MrRain_Hair").visible = true;
      scene.getObjectByName("MrRain_Fly").visible = true;
      scene.getObjectByName("MrRain_Head").visible = true;
    }
  }
}
// ================
// Drehen des Cubes

function animatecube() {
  let cube = beispielCube;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animatecube); //stoppt, wenn andere Animation beginnt


animate();



// Renderer-Update
// (Basis-Funktion für jede Animation, welche regelmäßig die Frames aktualisiert)

function animate() { //Ref '05'


  requestAnimationFrame(animate); // Anzeige eines Bildes mit aktuellem Stand der Animation
  controls.update();

  if (importsfertig) {
    let delta = clock.getDelta();  //clock.getDelta indicates at which point in time we are in the animation loop
    mixer.update(delta); //update method advances the global mixer time and updates the animation/shows model at this point in time.
    mixer2.update(delta); //Separater Mixer, da zwei Animationen gleichzeitig laufen/starten
  }

  renderer.render(scene, camera); //'Ref '05''

  /* 
  Erklärung der .render-Methode:
  .render( scene : Object3D, camera : Camera )
  Renders the scene or 3D object with the given camera. 
    - before rendering: Renderer#init needs to have been called for initialisation, e.g. when using on-demand rendering
    - exception: using render() inside an animation loop but -> animation loop must be defined with Renderer#setAnimationLoop
  */

  mya3.updateBoxes(camera) //Red '05'
  mya3.render(scene, camera) //Ref '05'

  //Aktion, falls Fenstergrösse verändert wird
  window.addEventListener('resize', function () { 
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(); // aktualisiert die Projection Matrix der Kamera, muss nach jeder Änderung der Kamera Properties aufgerufen werden.
    renderer.setSize(window.innerWidth, window.innerHeight); //Verhindert "Stretchen" des 3D-Modell-Canvas' bei Größenänderung des Fensters

  })




};


/* =========================================
    Erklärung der Schritte für Animationen
   ========================================= */
/*
Vorbereitung:
- clips: Array aller Animationen
- mixerA oder mixerB: Kann Clip/Video abspielen, sobald dieser Clip fertig ist
 
Ablauf:
1. "AnimationClip"-Klasse erstellt den clip bzw. das "Video". Animation hat Name, Dauer, "Tracks" (Positionen), BlendMode (wenn zwei Animationen gleichzeitig abgespielt werden).
-> Die Methode der AnimationClip-Klasse findet aus dem Array (clips) die Daten der benannten Animation und erstellt einen clip von dieser einzelnen Animation.
 
2. Die Methode der Mixer-Klasse, "".clipAction", sammelt alle zum Abspielen benötigten Informationen (Mixer, fertiger Clip, Root-Objekt, blendMode) und speichert sie in einer "action"-Variable.
 
3. Die "action"-Variable beinhaltet jetzt alle benötigten Details.
-> action.play() spielt dann endlich den Clip in der richtigen Kombination ab.
*/




/* =========================================
    Raycasting picker / Maus-Auswahlwerkzeug
   ========================================= */

// von Youtube Tutorial: https://www.youtube.com/watch?v=QATefHrO4kg
// Adaptiert, um Farbe der Gates zu ändern

const raycaster = new THREE.Raycaster(); // Benötigt, um Intersections zwischen dem Ray und dem 3DObjekt zu bestimmen

document.addEventListener("mousedown", onMouseDown);

function onMouseDown(event) {
  const coords = new THREE.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
  );

  raycaster.setFromCamera(coords, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);
  if (intersections.length > 0) {   //Aktionen, wenn der Klick tatsächlich ein Element "getroffen" hat
    const selectedObject = intersections[0].object;

     let Gate2 = scene.getObjectByName("Gate2")
    let Gate3 = scene.getObjectByName("Gate3")
// Gates und verbundene Objekte
    if (selectedObject.name == "Gate1" || selectedObject.name == "CoverGate1" || selectedObject.name == "UeberschriftGate1" || selectedObject.name == "TextSchildGate1") {
      gewaehltesGate = 'Gate1';
      scene.getObjectByName("Gate2").material.color.set(0.004776953478513362, 0, 0.8713671191959567); //Andere Gate-Farben werden wieder zur Original-Farbe
      scene.getObjectByName("Gate3").material.color.set(0.004776953478513362, 0, 0.8713671191959567);
      scene.getObjectByName("Gate1").material.color.set(0xffffff) //Nur ausgewähltes Gate wird zu Weiss
    }

    else if (selectedObject.name == "Gate2" | selectedObject.name == "CoverGate2" || selectedObject.name == "UeberschriftGate2" || selectedObject.name == "TextSchildGate2") {
      gewaehltesGate = 'Gate2';
      scene.getObjectByName("Gate1").material.color.set(0.004776953478513362, 0, 0.8713671191959567);
      scene.getObjectByName("Gate3").material.color.set(0.004776953478513362, 0, 0.8713671191959567);
      scene.getObjectByName("Gate2").material.color.set(0xffffff)
    }

    else if (selectedObject.name == "Gate3" || selectedObject.name == "CoverGate3" || selectedObject.name == "UeberschriftGate3" || selectedObject.name == "TextSchildGate3") {
      gewaehltesGate = 'Gate3';
      scene.getObjectByName("Gate1").material.color.set(0.004776953478513362, 0, 0.8713671191959567);
      scene.getObjectByName("Gate2").material.color.set(0.004776953478513362, 0, 0.8713671191959567);
      scene.getObjectByName("Gate3").material.color.set(0xffffff)
    }



  };
}

/* =========================================
    Rest Barrierefreiheit
   ========================================= */

let funct = mya3.functWrapper(changeColor, beispielCube) // Ref '05', `functWrapper` function to wrap the function and its arguments: function = mya3.functWrapper(funct, ...args)

mya3.click(beispielCube.name, funct, `mesh color changed on click ${textfuermeshTemperatur}`, camera) // Ref '05'.

//Farbänderung des Meshes
function changeColor(child) { // Ref '05',

  child.material.color.setHex(Math.random() * 0xffffff); // Ref '05'.

}







