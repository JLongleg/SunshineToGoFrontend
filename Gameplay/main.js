// Three.js SETUP
// Ref "01"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'; //Ref "03" für Fonts von https://threejs.org/docs/#TextGeometry and https://threejs.org/docs/?q=fontloader#FontLoader
import { FontLoader } from 'three/addons/loaders/FontLoader.js'; //Ref "03" für Fonts

import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

//import A3 from './a3indextest.js'; //Accessibility
import A3 from 'a3model';
//import 'a3model/index.css';
//import 'a3model/src/index.css';

/* =========================================
    REFERENZEN
   ========================================= */

// Externer Code
// Referenz 1: THREE.js Manual: https://threejs.org/manual/#en/installation#manual/introduction/Creating-a-scene
// Referenz 2: Ref "02": Animation setup von https://www.youtube.com/watch?v=GByT8ActvDk (Animation from THREE.js Manual: https://threejs.org/manual/?q=animation#en/animation-system)
// Referenz 3: Ref "03": https://threejs.org/docs/#CSS2DRenderer und https://threejs.org/docs/#CSS2DObject und https://waelyasmina.net/articles/how-to-integrate-html-elements-into-a-three-js-scene/#css2drenderer
// Referenz 4: 
// Referenz B: "Barrierefreiheit"/"Accessibility Test"


/* =========================================
    SCENE SETUP
   ========================================= */


const scene = new THREE.Scene();

const canvas = document.querySelector('canvas#webgl') // Accessibility Test: A3-Objekt(Canvas) wird initalisiert
const sizes = { // Accessibility Test: Sizes

  width: innerWidth, // Accessibility Test: Sizes

  height: innerHeight // Accessibility Test: Sizes

} // Accessibility Test: Sizes

const clock = new THREE.Clock(); //Ref "02"



// ======
// KAMERA


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // Accessiblity Test: Camera 

// Alternative Kamera:
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Duplikat, Teil von Accessibility Test //Attribute: Field of view, aspect ratio, near, far clipping plane. Letzteres zeigt die Grenze der noch gerenderten Objekte

camera.position.set(15, 10, 10);

scene.add(camera) // Accessiblity Test: Camera 


// ========
// Renderer 

const renderer = new THREE.WebGLRenderer({ // Accessibility Test: Renderer // Konstruiert einen neuen WebGL-Renderer. WebGL (Web Graphics Library) ist ein Javascript API, mit dessen Hilfe 3D-Grafiken im Browser angezeigt werden können.

  canvas: canvas
}) // Accessibility Test: Renderer

renderer.setSize(sizes.width, sizes.height) // Accessibility Test: Renderer // Grösse der Fläche der gerenderten App
// Alternativ: 
// renderer.setSize(window.innerWidth, window.innerHeight); 
//document.body.appendChild(renderer.domElement); //Renderer benutzt ein <canvas>-Element, um die Szene darzustellen. Dieses Element wird dem HTML-Dokument hinzugefügt.




// ========
// Controls


const controls = new OrbitControls(camera, renderer.domElement);
//controls.enableDamping = true; // kein zu abruptes Bewegen der controls
controls.update(); // controls.update() must be called after any manual changes to the camera's transform





// ================
// Barrierefreiheit-Basis

const a3canvas = document.querySelector('#a3canvas'); // Accessibility Test: A3 

const mya3 = new A3(canvas, renderer, a3canvas, sizes); // Accessibility Test: A3




// ===================================
// Gate-Überschriften
// Ref "03"

const fontloader = new FontLoader();
//Asynchrones Laden, mögliche Option: const font = await fontloader.loadAsync('VCR OSD Mono_Regular.json');


let meshUeberschriftGate1; //Zeigt auf das Mesh der Überschrift für Gate1 (andernfalls nur innerhalb Funktion verfügbar)
let meshUeberschriftGate2;
let meshUeberschriftGate3;
let meshTemperatur;
let textfuermeshUeberschriftGate1 = "Gate1";//String, welcher das Mesh für Gate1 darstellt. Muss per Funktion in Mesh "transformiert" und angezeigt werden.
let textfuermeshUeberschriftGate2 = "Gate2";
let textfuermeshUeberschriftGate3 = "Gate3";
let textfuermeshTemperatur = "-20";


//Anonyme Funktion, welche Überschriften zu den Gates hinzufügt

let gateTexthinzufuegen = function (uebergebeneFont) {

  //Gate-Text optische Details
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

  const textmaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  //Platzieren der Texte in der Szene
  meshUeberschriftGate1 = new THREE.Mesh(geometry1, textmaterial);
  meshUeberschriftGate1.position.set(-15, 11, -15.2);
  meshUeberschriftGate1.name = "UeberschriftGate1";
  scene.add(meshUeberschriftGate1);

  meshUeberschriftGate2 = new THREE.Mesh(geometry2, textmaterial);
  meshUeberschriftGate2.position.set(-4, 9, -15.2);
  meshUeberschriftGate2.name = "UeberschriftGate2";
  scene.add(meshUeberschriftGate2);

  meshUeberschriftGate3 = new THREE.Mesh(geometry3, textmaterial);
  meshUeberschriftGate3.position.set(6, 7, -15.2);
  meshUeberschriftGate3.name = "UeberschriftGate3";
  scene.add(meshUeberschriftGate3);

  meshTemperatur = new THREE.Mesh(geometryTemperatur, textmaterial);
  meshTemperatur.position.set(6, 0, 8);
  meshTemperatur.rotation.x = -Math.PI / 2;
  meshTemperatur.rotation.y = 0.52
  meshTemperatur.rotation.z = Math.PI / 2;

  meshTemperatur.name = "Temperaturwunsch";
  scene.add(meshTemperatur);
}

fontloader.load("Schriftart.json", gateTexthinzufuegen); //Erstes Attribut: Lädt Font und übergibt sie an -> Zweites Attribut: onLoad()-callback-Funktion alias anonyme Funktion



// Ueberschriften ueber Gates werden mit Städtenamen der aktuellen Runde ersetzt

function gateUeberschriftErsetzen(NameStadt1, NameStadt2, NameStadt3, tempWunsch) {
  scene.remove(meshUeberschriftGate1);
  scene.remove(meshUeberschriftGate2);
  scene.remove(meshUeberschriftGate3);//Mesh wird nicht mehr in Szene angezeigt, aber wird nicht komplett gelöscht, das bräuchte eine dispose function
  scene.remove(meshTemperatur);

  textfuermeshUeberschriftGate1 = NameStadt1;
  textfuermeshUeberschriftGate2 = NameStadt2;
  textfuermeshUeberschriftGate3 = NameStadt3;
  textfuermeshTemperatur = "\"" + tempWunsch.toString() + "°C\"";

  fontloader.load("Schriftart.json", gateTexthinzufuegen); //Überschriften werden per Funktion neu erstellt (mit dem nun aktualisierten Text)
}




// ===============================
// Hinzufügen und Drehen des Cubes
// (laesst die Szene sofort laden)
// Zurzeit einziges Objekt, das eine Screen-Reader-Box (mya3) hat, also bitte (noch) nicht löschen!

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
let beispielCube = new THREE.Mesh(geometry, material); // Accessibility Test: Von "const" zu "let" geändert, da Variable gleich geändert wird
beispielCube.position.set(0, 10, 0);


beispielCube.name = "beispielCube" //Accessibility Test: Mesh

beispielCube = mya3.createBox(beispielCube, "button") //Accessibility Test: Mesh
scene.add(beispielCube);
// ==============
//Hintergrundbild 
//Setup von threejs.org Manual
//360° Hintergrundbild 'kloofendal_48d_partly_cloudy_puresky.jpg' von "public asset library" https://polyhaven.com/

const dunkelModus1 = localStorage.getItem('darkMode') === '1';


const file = dunkelModus1 ? 'Hintergrundbild_Nighttime.jpg' : 'Hintergrundbild_Daytime.jpg';

new THREE.TextureLoader().load(file, (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});
if (localStorage.getItem('darkMode') == 1) {

}
// ===========
// Lichtquelle

/*
//Alternative Lichtquelle: ambient light
    const color2 = 0xFFFFFF;
    const intensity2 = 1;
    const light2 = new THREE.AmbientLight(color2, intensity2);
    scene.add(light2);
*/

//Directional light

const color = 0xFFFFFF;
const intensity = 5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);



/* =========================================
    3D-MODELL UND ANIMATIONEN
   ========================================= */

const loader = new GLTFLoader();

let mixer; //Ref "02"  //Mixer spielt Animationen für dieses Objekt ab, wird in gltfLoader-Funktion erstellt
let mixer2;
let lastActionmixerA;
let mixerB;
let lastActionmixerB;


let clips;
let importsfertig = false;
let action;

let aktuellerCharakter;
let Tiffany;
let Jasun;
let Snovella;
let Passagierliste = []; //Liste verfuegbarer Charaktere, aus denen spaeter einer fuer die aktuelle Runde ausgewählt wird
let invisibleGuide;
let curCities //Daten ausgewählter Städte für die aktuelle Runde
let KorrekteAntwort //Daten für die korrekte Stadt in der aktuellen Runde

let gewaehltesGate = 'Gate2' //Mittiges Gate als Default
let tempWunsch
let feldMitWunschtemp

// ====================
// Laden des 3D-Modells
// (einmalig)



// ===============================
// Game-Loop
// aus test.js kopiert und erweitert

//Laden von nahezu 100 Städte von Jan's API
async function loadCities() {
  const response = await fetch('/api/cities');
  if (!response.ok) {
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

// Cities Variable wird erstellt und das Array (nahezu 100 Städte) per Funktion darin gespeichert
var cities;
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
let rundeNummer = 0;
let aktuellePunkteZahl = 0;
const punkteZahlAnzeige = document.getElementById('punkteZahl');

function mehrPunkte() {
  aktuellePunkteZahl++;
  punkteZahlAnzeige.innerText = aktuellePunkteZahl;
}



// Funktion wird in loader.load oben aufgerufen. Vorteil: Wird erst ausgeführt, sobald Modell geladen ist und alle Objekte der Szene stehen zur Verfügung



loader.load('./Sunshine3DModel22.glb', function (gltf) {
  // "onLoad"-Funktion des gltfLoaders
  // (der gltfLoader hat also zu diesem Zeitpunkt fertig geladen)

  scene.add(gltf.scene); //Ref "02" //eines der "Loader results" des gltfLoaders war die Szene (3D-Modell) aus dieser glb-Datei, die jetzt der gesamten angezeigten Szene hinzugefügt wird 
  importsfertig = true;
  //Kontrolle: Listed alle "children"/Objekte in der Szene auf
  /*scene.traverse(function (child) {
    console.log("Liste aller Children/Objekte in Szene: ", child.name);
  });
  */

  //Da wir nur in dieser Funktion das gesamte 3D-Modell aus dieser Datei zur Verfügung haben, müssen jetzt die "Mixer" (undefined) mit den Animationen erstellt werden
  Tiffany = scene.getObjectByName('Armature_Tiffany');
  Jasun = scene.getObjectByName('Armature_Jasun')
  Snovella = scene.getObjectByName('Armature_Snovella')

  Passagierliste.push(Tiffany, Jasun, Snovella);

  mixer2 = new THREE.AnimationMixer(gltf.scene);

  invisibleGuide = scene.getObjectByName('Empty');
  mixer = new THREE.AnimationMixer(invisibleGuide);
  //mixer = new THREE.AnimationMixer(gltf.scene); //Constructor für einen Player für Animationen. Ein Mixer pro animiertes Objekt. Mixer ist komplexes Objekt, nicht nur Array mit Animationen (Ref "02")
  clips = gltf.animations; //Array aller Animationen (Ref "02")


  spielrunde()


  async function spielrunde() {
    // Solange im Array noch mind. 3 Städte übrig sind, kann eine neue Runde mit drei Städte beginnen

    while (cities.length > 2) {




      // wERTE FUER DIESE RUNDE
      curCities = pickCities(cities);// 3 Städte für die aktuelle Runde werden ausgewählt. (curCities ist "current cities") Attribute: city, country, maxTemperature

      charakterSichtbarkeitaendern("macheunsichtbar"); //Alle Charakter-Objekte folgen dem InvisibleGuide und sollen erstmal nicht angezeigt werden

      // Beschriftung von Gates in Reihenfolge (Array bereits randomised).
      // Auswahl richtiger Antwort (Zufällige Zahl 0/1/2 entspricht Gate 1, 2 oder 3)

      const groupJason = new THREE.Group();
      //groupJason.add(scene.getObjectByName("Armature_Jasun"))



      let zufälligeZahl = Math.floor(Math.random() * 3) //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      KorrekteAntwort = curCities[zufälligeZahl];
      aktuellerCharakter = Passagierliste[zufälligeZahl];
      charakterSichtbarkeitaendern("machesichtbar", aktuellerCharakter);

      //Temperaturwunsch des Charakters wird passend zur richtigen Antwort gewählt
      tempWunsch = KorrekteAntwort.maxTemperature
      console.log("Lösung: ", tempWunsch, KorrekteAntwort.city)

      //Platzhalter-Ueberschriften ueber Gates werden mit Städtenamen dieser Runde ersetzt
      gateUeberschriftErsetzen(curCities[0].city, curCities[1].city, curCities[2].city, tempWunsch)


      console.log("Runde:", rundeNummer, "aktuellePunkteZahl: ", aktuellePunkteZahl)


      if (rundeNummer === 5) {

        resultscreen(aktuellePunkteZahl)
        break;
      }

      //Barrierefreiheit mit Tab-Taste: Gate-Auswahl

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
      let Gate1 = scene.getObjectByName('Gate1')
      let Gate1x = mya3.createBox(Gate1, "button"); //Klickbare unsichtbare Box um Gate1
      mya3.click(Gate1x, barrierefreiGate1gewaehlt, 'Gate1 wurde ausgewählt')

      function barrierefreiGate1gewaehlt() {
        gewaehltesGate = Gate1;
        console.log("gewGatenoww", gewaehltesGate)
      }

      let Gate2 = scene.getObjectByName('Gate2')
      Gate2 = mya3.createBox(Gate2, "button"); //Klickbare unsichtbare Box um Gate1
      mya3.click(Gate2.name, barrierefreiGate2gewaehlt, 'Gate2 wurde ausgewählt')

      function barrierefreiGate2gewaehlt() {
        gewaehltesGate = Gate2;
        console.log("gewGatenoww", gewaehltesGate);
      }

      let Gate3 = scene.getObjectByName('Gate3')
      Gate3 = mya3.createBox(Gate3, "button") //Klickbare unsichtbare Box um Gate1
      mya3.click(Gate3, barrierefreiGate3gewaehlt, 'Gate3 wurde ausgewählt')

      function barrierefreiGate3gewaehlt() {
        gewaehltesGate = Gate3;
        console.log("gewGatenoww", gewaehltesGate.name)
      }



      mya3.renderEffects(camera)
      // Result Screen bei Spielende
      // Reference 04: https://www.youtube.com/watch?v=r_PL0K2fGkY

      function resultscreen(aktuellePunkteZahl) {

        const modal = document.getElementById("modal"); //Textfeld des Resultate-Pop-Ups
        const closeBtn = document.getElementById("closeModal"); //Close-Button, um Pop-Up zu schliessen

        modal.classList.add("open"); //Div bekommt neue Klasse, die es in den Vordergrund (Layer 999) rückt

        const ResultatPopUp = document.getElementById('punkteZahlResultat');
        if (aktuellePunkteZahl == 1) {
          ResultatPopUp.innerText = aktuellePunkteZahl + " Pünktchen erreicht! OK!"
        }
        else if (aktuellePunkteZahl == 0) {
          ResultatPopUp.innerText = aktuellePunkteZahl + " Punkte. Ausgewogen!"
        }
        else {
          ResultatPopUp.innerText = aktuellePunkteZahl + " Punkte, yay!"
        }
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("open");
        })
      }

      showIdleAnimation();
      goToCenter();

      await new Promise((resolve =>
        mixer.addEventListener('finished', resolve, false))); //Wenn mixer 'finished', dann resolve das Promise.

      scene.getObjectByName("CoverGate1").visible = false;
      scene.getObjectByName("CoverGate2").visible = false;
      scene.getObjectByName("CoverGate3").visible = false;
      scene.getObjectByName("CoverGate1X").visible = false;
      scene.getObjectByName("CoverGate2X").visible = false;
      scene.getObjectByName("CoverGate3X").visible = false;


      sendToChosenGate() //Funktion ruft Funktion goToGate1(), goToGate2(), oder goToGate1() auf.
      await new Promise((resolve =>
        mixer.addEventListener('finished', resolve, false))); //Wenn mixer 'finished', dann resolve das Promise.


      rundeNummer += 1;
    }

  }


}






  , undefined, function (error) {

    //"onError-Callback"-Funktion des gltfLoaders
    console.error(error);

  });


function showIdleAnimation() {
  if (aktuellerCharakter == Tiffany) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'TiffanyIdle');
    const Idle_action = mixer.clipAction(Idle_clip); //clip, root, blend mode
    Idle_action.setLoop(THREE.LoopRepeat);
    Idle_action.play();
  }

  if (aktuellerCharakter == Jasun) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'JasunIdle');
    const Idle_action = mixer.clipAction(Idle_clip); //clip, root, blend mode
    Idle_action.setLoop(THREE.LoopRepeat);
    Idle_action.play();
  }

  if (aktuellerCharakter == Snovella) {
    const Idle_clip = THREE.AnimationClip.findByName(clips, 'SnovellaIdle');
    const Idle_action = mixer.clipAction(Idle_clip); //clip, root, blend mode
    Idle_action.setLoop(THREE.LoopRepeat);
    Idle_action.play();
  }

}

async function goToCenter() {


  const rollingin_clip = THREE.AnimationClip.findByName(clips, 'CharacterGoesToDecisionPoint');
  const rollingin_action = mixer.clipAction(rollingin_clip, invisibleGuide); //clip, root, blend mode
  rollingin_action.clampWhenFinished = true;
  rollingin_action.setLoop(THREE.LoopOnce);
  rollingin_action.play();


  await new Promise((resolve =>
    mixer.addEventListener('finished', resolve, false))); //Wenn mixer 'finished', dann resolve das Promise.

  rollingin_action.stop();
}

//Funktion ruft bei Entscheidungspunkt goToGate1(), goToGate2(), oder goToGate1() auf.
function sendToChosenGate() {
  if (gewaehltesGate == 'Gate1') {
    goToGate1();
  }

  else if (gewaehltesGate == 'Gate3') {
    goToGate3();
  }

  else {
    goToGate2(); //Gate2 ist Default, falls kein Gate gewaehlt wurde.
  }
}

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


  if (curCities[0].maxTemperature == tempWunsch) {
    scene.getObjectByName("CoverGate1").visible = true;
    mehrPunkte()
  }
  else {
    scene.getObjectByName("CoverGate1X").visible = true;
  }

  let Flugzeug1 = scene.getObjectByName('Flugzeug1');
  const flugzeughebtab_clip = THREE.AnimationClip.findByName(clips, 'flugzeughebtab');
  const flugzeughebtab_action = mixer2.clipAction(flugzeughebtab_clip, Flugzeug1); //clip, root, blend mode
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

  aktuellerCharakter.remove(feldMitWunschtemp);

  let Flugzeug3 = scene.getObjectByName('Flugzeug3');
  mixer2 = new THREE.AnimationMixer(Flugzeug3); 
  Flugzeug3.name = "Flugzeug1"; //um die Animation von Flugzeug1 nutzen zu können
  const flugzeughebtab_clip = THREE.AnimationClip.findByName(clips, 'flugzeughebtab');
  const flugzeughebtab_action = mixer2.clipAction(flugzeughebtab_clip, Flugzeug3); //clip, root, blend mode
  flugzeughebtab_action.setLoop(THREE.LoopOnce);
  flugzeughebtab_action.play();

  Flugzeug3.name = "Flugzeug3"; //Rückgängigmachen der Umbennung

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

  aktuellerCharakter.remove(feldMitWunschtemp);

  let Flugzeug2 = scene.getObjectByName('Flugzeug2');
  mixer2 = new THREE.AnimationMixer(Flugzeug2);
  Flugzeug2.name = "Flugzeug1"; //um die Animation von Flugzeug1 nutzen zu können
  const flugzeughebtab_clip = THREE.AnimationClip.findByName(clips, 'flugzeughebtab');
  const flugzeughebtab_action = mixer2.clipAction(flugzeughebtab_clip, Flugzeug2); //clip, root, blend mode
  flugzeughebtab_action.setLoop(THREE.LoopOnce);
  flugzeughebtab_action.play();

  Flugzeug2.name = "Flugzeug2"; //Rückgängigmachen der Umbennung

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
    scene.getObjectByName("Rollstuhl_Jason").visible = false;
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
      scene.getObjectByName("Rollstuhl_Jason").visible = true;
    }
    else if (charakter == Snovella) {
      scene.getObjectByName("Body_Snovella").visible = true;
      scene.getObjectByName("Hat_Snovella").visible = true;
      scene.getObjectByName("Head_Snovella").visible = true;
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






// ================
// Renderer-Update
// (Basis-Funktion für jede Animation, welche regelmäßig die Frames aktualisiert)

function animate() { //Accessibility Test: A3 Click


  requestAnimationFrame(animate); // Anzeige eines Bildes mit aktuellem Stand der Animation
  controls.update();

  if (importsfertig) {
    let delta = clock.getDelta();  //clock.getDelta indicates at which point in time we are in the animation loop
    mixer.update(delta); //update method advances the global mixer time and updates the animation/shows model at this point in time.
    mixer2.update(delta); //Separater Mixer, da zwei Animationen gleichzeitig laufen/starten
  }

  renderer.render(scene, camera); //Accessibility Test: A3 Click

  /* 
  Erklärung der .render-Methode:
  .render( scene : Object3D, camera : Camera )
  Renders the scene or 3D object with the given camera. 
    - before rendering: Renderer#init needs to have been called for initialisation, e.g. when using on-demand rendering
    - exception: using render() inside an animation loop but -> animation loop must be defined with Renderer#setAnimationLoop
  */

  mya3.updateBoxes(camera) //Accessibility Test: A3 Click

  mya3.render(scene, camera) //Accessibility Test: A3 Click

  //Aktion, falls Fenstergroesse veraendert wird
  window.addEventListener('resize', function () { //Ref "03"
    camera.aspect = window.innerWidth / window.innerHeight; //Ref "03"
    camera.updateProjectionMatrix(); //Ref "03",aktualisiert die Projection Matrix der Kamera, muss nach jeder Änderung der Kamera Properties aufgerufen werden.
    renderer.setSize(window.innerWidth, window.innerHeight); //Verhindert "Stretchen" des 3D-Modell-Canvas' bei Größenänderung des Fensters

  })




};



/* =========================================
    Aktionen (nach Wartezeit), nachdem die Szene vollständig geladen ist
   ========================================= */

//Nicht mehr wirklich gebraucht, aber könnte nützlich sein

setTimeout(() => {
  //renderer.setAnimationLoop(animate); //Ref "02"



}, 10000) //Wartezeit in Millisekunden



/* =========================================
    Erklärung der Schritte für Animationen
   ========================================= */
/*
Vorbereitung:
- clips: Array aller Animationen
- mixerA oder mixerB: Kann Clip/Video abspielen, sobald dieser Clip fertig ist
 
Ablauf:
1. "AnimationClip"-Klasse erstellt den clip bzw. das "Video". Animation hat Name, Dauer, "Tracks" (Positionen), BlendMode (wenn zwei Animationen gleichzeitig abgespielt werden).
-> Die Methode der AnimationClip-Klasse findet aus dem Array (clips) die Daten der benannten Animation und erstellt ein "Video" (clip) von dieser einzelnen Animation.
 
2. Die Methode der Mixer-Klasse, "".clipAction", sammelt alle zum Abspielen benötigten Informationen (Mixer bzw. "Abspieler", fertiger Clip, Root-Objekt, blendMode) und speichert sie in einer "action"-Variabble.
 
3. Die "action"-Variable beinhaltet jetzt alle benötigten Details.
-> action.play() spielt dann endlich den Clip in der richtigen Kombination ab.
*/




/* =========================================
    Raycasting picker / Maus-Auswahlwerkzeug
   ========================================= */

// von Youtube Tutorial: https://www.youtube.com/watch?v=QATefHrO4kg
// Zeigt auch Namen von Objekt an und wechselt Farbe von Objekt

const raycaster = new THREE.Raycaster();

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

    console.log(`${selectedObject.name} was clicked!`);

    let Gate2 = scene.getObjectByName("Gate2")
    let Gate3 = scene.getObjectByName("Gate3")

    if (selectedObject.name == "Gate1" || selectedObject.name == "CoverGate1" || selectedObject.name == "UeberschriftGate1" || selectedObject.name == "TextSchildGate1") {
      gewaehltesGate = 'Gate1';
      scene.getObjectByName("Gate2").material.color.set(0.004776953478513362, 0, 0.8713671191959567); //Andere Gate-Farben zu Original-Farbe
      scene.getObjectByName("Gate3").material.color.set(0.004776953478513362, 0, 0.8713671191959567);
      scene.getObjectByName("Gate1").material.color.set(0xffffff) //Ausgewähltes Gate zu Weiss
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

let funct = mya3.functWrapper(changeColor, beispielCube) // Accessibility Test: A3 Click, `functWrapper` function to wrap the function and its arguments: function = mya3.functWrapper(funct, ...args)

mya3.click(beispielCube.name, funct, 'mesh color changed on click', camera) // Accessibility Test: A3 Click, original "mesh" wurde in "cube" umbenannt

function changeColor(child) { // Accessibility Test: A3 Click 

  child.material.color.setHex(Math.random() * 0xffffff); // Accessibility Test: A3 Click 

}

let funct2 = mya3.functWrapper(funct_for_flugzeug, "Flugzeug1") // Wrapper wird benötigt, da funct_for_flugzeug ein Übergabeargument braucht.
mya3.click("Flugzeug1", funct2, 'Console Log wird jetzt etwas anzeigen') //Bei Klick auf das on-screen-Objekt mit Namen "Flugzeug", wird funct2 ausgeführt. Screenreader reads 'Console Log wird jetzt etwas anzeigen'

function funct_for_flugzeug(child) { // Accessibility Test: A3 Click 


}






