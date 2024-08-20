Tone.start();
const synth = new Tone.Synth().toDestination();
var section = 4;
var recording = [];
var isRecording = false;
var startTime;

document.onkeydown = function(e) {
  e = e || window.event;
  var key = e.which || e.keyCode;
  if (key === 83) { playNote('C', e.shiftKey) }
  if (key === 68) { playNote('D', e.shiftKey) }
  if (key === 70) { playNote('E', e.shiftKey) }
  if (key === 71) { playNote('F', e.shiftKey) }
  if (key === 72) { playNote('G', e.shiftKey) }
  if (key === 74) { playNote('A', e.shiftKey) }
  if (key === 75) { playNote('B', e.shiftKey) }
  if (key === 87) { playNote('C#', e.shiftKey) }
  if (key === 69) { playNote('D#', e.shiftKey) }
  if (key === 84) { playNote('F#', e.shiftKey) }
  if (key === 89) { playNote('G#', e.shiftKey) }
  if (key === 85) { playNote('A#', e.shiftKey) }
  if (key === 37) { if (section > 1) { section -= 1; document.getElementById('sectionNo').innerText = section } else { alert("The lowest keyboard section is 1.") } }
  if (key === 39) { if (section < 8) { section += 1; document.getElementById('sectionNo').innerText = section } else { alert("The highest keyboard section is 8.") } }
}

function playNote(note, shift) {
  let duration = '8n';
  synth.triggerAttackRelease(`${note}${(shift) ? '#' : ''}${section}`, duration);
  const key = document.getElementById(note);
  key.style.background = shift ? '#338eda' : '#33d6a6';
  key.classList.add('active');

  setTimeout(() => {
    key.style.background = note.includes('#') ? 'black' : 'white';
    key.classList.remove('active');
  }, 200);

  if (isRecording) {
    recording.push({ note: note, shift: shift, time: Date.now() - startTime });
  }
}

function startRecording() {
  recording = [];
  isRecording = true;
  startTime = Date.now();
}

function stopRecording() {
  isRecording = false;
}

function playRecording() {
  recording.forEach((note, index) => {
    setTimeout(() => {
      playNote(note.note, note.shift);
    }, note.time);
  });
}

function changeVolume(volume) {
  synth.volume.value = volume;
}
