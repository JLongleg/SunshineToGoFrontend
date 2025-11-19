let volSlider = document.getElementById("myRange");
let waldSound = document.getElementById("waldSound");

volSlider.addEventListener("input", function() {

  let volume = volSlider.value / 100;

  waldSound.volume = volume;
});